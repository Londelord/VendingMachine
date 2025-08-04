using VendingMachine.Data.Models;

namespace VendingMachine.Data.Interfaces;

public interface IProductsRepository
{
    Task<List<Product>> GetAllProducts(string? brandName = null, int? startPrice = null, int? endPrice = null);
    Task AddProduct(Product product);
    Task<Product[]> ImportProducts(Product[] newProducts);
    Task UpdateProducts(Product[] products);
}