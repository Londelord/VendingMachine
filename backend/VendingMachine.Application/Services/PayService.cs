using CSharpFunctionalExtensions;
using VendingMachine.Application.DTOs;
using VendingMachine.Data.Models;
using VendingMachine.Data.Repositories;

namespace VendingMachine.Application.Services;

public class PayService
{
    private readonly CoinRepository _coinRepository;
    private readonly ProductsRepository _productRepository;
    private readonly OrderRepository _orderRepository;

    public PayService(CoinRepository coinRepository,
        ProductsRepository productRepository,
        OrderRepository orderRepository)
    {
        _coinRepository = coinRepository;
        _productRepository = productRepository;
        _orderRepository = orderRepository;
    }

    public async Task<Result<Dictionary<int, int>>> Pay(PayProductDto[] products, Coin[] insertedCoins)
    {
        try
        {
            var currentCoins = await _coinRepository.GetAllCoins();

            foreach (var coin in currentCoins)
            {
                coin.Quantity = insertedCoins.First(c =>
                    c.Denomination == coin.Denomination).Quantity + coin.Quantity;
            }

            var productList = await _productRepository.GetAllProducts();
            var selectedProducts = products
                .Select(p => new
                {
                    Product = productList.FirstOrDefault(pr => pr.Id == p.Id),
                    Quantity = p.Quantity
                })
                .ToList();

            var totalPrice = selectedProducts.Sum(p => p.Product!.Price * p.Quantity);
            var insertedTotal = insertedCoins.Sum(c => c.Denomination * c.Quantity);

            if (insertedTotal < totalPrice)
                return Result.Failure<Dictionary<int, int>>("Not enough money inserted");

            if (selectedProducts.Any(p => p.Product == null))
                return Result.Failure<Dictionary<int, int>>("Product not found");

            if (selectedProducts.Any(p => p.Product!.Quantity < p.Quantity))
                return Result.Failure<Dictionary<int, int>>("The product is out of stock");

            var changeAmount = insertedTotal - totalPrice;
            var change = CalculateChange(changeAmount, currentCoins.ToList());

            foreach (var sp in selectedProducts)
                sp.Product!.Quantity -= sp.Quantity;

            await _productRepository.UpdateProducts(productList.ToArray());

            var order = new Order
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                Total = totalPrice
            };

            var archivedProducts = selectedProducts.Select(sp => new ArchivedProduct
            {
                ProductName = sp.Product!.Name,
                BrandName = sp.Product!.Brand!.Name,
                Quantity = sp.Quantity,
            }).ToList();

            order.ArchivedProducts = archivedProducts;

            await _orderRepository.SaveOrder(order);

            foreach (var (denomination, count) in change)
            {
                var coin = currentCoins.First(c => c.Denomination == denomination);
                coin.Quantity -= count;
            }

            await _coinRepository.UpdateCoins(currentCoins);

            return Result.Success(change);
        }
        catch (Exception ex)
        {
            return Result.Failure<Dictionary<int, int>>(ex.Message);
        }
    }

    private Dictionary<int, int> CalculateChange(int changeAmount, List<Coin> availableCoins)
    {
        var sortedCoins = availableCoins
            .Where(c => c.Quantity > 0)
            .OrderByDescending(c => c.Denomination)
            .ToList();

        var change = new Dictionary<int, int>();

        foreach (var coin in sortedCoins)
        {
            var count = Math.Min(changeAmount / coin.Denomination, coin.Quantity);
            if (count <= 0) continue;
            change[coin.Denomination] = count;
            changeAmount -= coin.Denomination * count;
        }

        if (changeAmount > 0)
            throw new Exception(
                "Извините, в данный момент мы не можем продать вам товар по причине того, что автомат не может выдать вам нужную сдачу");

        return change;
    }
}