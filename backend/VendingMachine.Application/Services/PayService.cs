using CSharpFunctionalExtensions;
using VendingMachine.Application.DTOs;
using VendingMachine.Application.Interfaces;
using VendingMachine.Data.Interfaces;
using VendingMachine.Data.Models;
using VendingMachine.Data.Repositories;

namespace VendingMachine.Application.Services;

public class PayService : IPayService
{
    private readonly ICoinsRepository _coinsRepository;
    private readonly IProductsRepository _productRepository;
    private readonly IOrdersRepository _orderRepository;

    public PayService(ICoinsRepository coinsRepository,
        IProductsRepository productRepository,
        IOrdersRepository orderRepository)
    {
        _coinsRepository = coinsRepository;
        _productRepository = productRepository;
        _orderRepository = orderRepository;
    }

    public async Task<Result<Dictionary<int, int>>> Pay(PayProductDto[] products, Coin[] insertedCoins)
    {
        try
        {
            var result = await Validation(products, insertedCoins);

            var allCoins = result.CoinsInMachine.Select(ac =>
            {
                var inserted = insertedCoins.First(ic => ic.Denomination == ac.Denomination);
                return new Coin { Denomination = ac.Denomination, Quantity = ac.Quantity + inserted.Quantity };
            }).ToArray();

            var insertedSum = insertedCoins.Sum(ic => ic.Denomination * ic.Quantity);
            var changeSum = insertedSum - result.OrderSum;
            var change = CalculateChange(allCoins, changeSum);

            await _productRepository.UpdateProducts(result.SelectedProducts.ToArray());
            await SaveOrder(result.OrderSum, result.SelectedProducts);
            await UpdateCoins(allCoins, change);

            return Result.Success(change);
        }
        catch (Exception ex)
        {
            return Result.Failure<Dictionary<int, int>>(ex.Message);
        }
    }

    private async Task<PayValidationResult> Validation(PayProductDto[] products, Coin[] insertedCoins)
    {
        var selectedProducts = new List<Product>();
        var availableProducts = await _productRepository.GetAllProducts();

        foreach (var product in products)
        {
            var selected = availableProducts.FirstOrDefault(p => p.Id == product.Id);

            if (selected == null)
                throw new Exception($"Product {product.Id} not found");

            if (selected.Quantity < product.Quantity)
                throw new Exception("The product is out of stock");

            selected.Quantity -= product.Quantity;

            selectedProducts.Add(selected);
        }

        var coinsInMachine = await _coinsRepository.GetAllCoins();

        var orderSum = products.Sum(p => p.Quantity *
                                         selectedProducts.First(sp => sp.Id == p.Id).Price);
        
        var insertedTotal = insertedCoins.Sum(c => c.Denomination * c.Quantity);

        if (insertedTotal < orderSum)
            throw new Exception("Not enough money inserted");

        return new PayValidationResult(coinsInMachine, selectedProducts, orderSum);
    }


    private async Task SaveOrder(int totalPrice, List<Product> products)
    {
        var archivedProducts = products.Select(sp => new ArchivedProduct
        {
            ProductName = sp.Name,
            BrandName = sp.Brand.Name,
            Quantity = sp.Quantity,
        }).ToList();

        var order = new Order
        {
            Id = Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow,
            Total = totalPrice,
            ArchivedProducts = archivedProducts
        };

        await _orderRepository.SaveOrder(order);
    }

    private Dictionary<int, int> CalculateChange(Coin[] allCoins, int changeSum)
    {
        var change = new Dictionary<int, int>();

        if (changeSum == 0) return change;

        var sortedCoins = allCoins
            .Where(c => c.Quantity > 0)
            .OrderByDescending(c => c.Denomination)
            .ToList();
        
        foreach (var coin in sortedCoins)
        {
            var count = Math.Min(changeSum / coin.Denomination, coin.Quantity);
            if (count <= 0) continue;
            change[coin.Denomination] = count;
            changeSum -= coin.Denomination * count;
        }

        if (changeSum > 0)
            throw new Exception(
                "Извините, в данный момент мы не можем продать вам товар по причине того, что автомат не может выдать вам нужную сдачу");

        return change;
    }

    private async Task UpdateCoins(Coin[] allCoins, Dictionary<int, int> change)
    {
        var updatedCoins = allCoins.Select(c =>
            !change.TryGetValue(c.Denomination, out var changeCoinQuantity)
                ? c
                : new Coin { Denomination = c.Denomination, Quantity = c.Quantity - changeCoinQuantity }).ToArray();

        await _coinsRepository.UpdateCoins(updatedCoins);
    }
}

internal record PayValidationResult(Coin[] CoinsInMachine, List<Product> SelectedProducts, int OrderSum);