using VendingMachine.Data.Models;

namespace VendingMachine.Data.Interfaces;

public interface IProductsRepository
{
    Task<List<Product>> GetAllProducts();
    Task AddProduct(Product product);
    Task<Product[]> ImportProducts(Product[] newProducts);
    Task UpdateProducts(Product[] products);
}