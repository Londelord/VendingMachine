using Microsoft.EntityFrameworkCore;
using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Repositories;

public class ProductsRepository
{
    private readonly VendingMachineDbContext _context;

    public ProductsRepository(VendingMachineDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllProducts() => await _context.Products
        .Include(p => p.Brand)
        .ToListAsync();

    public async Task<Product> AddProduct(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product[]> ImportProducts(Product[] newProducts)
    {
        var products = await _context.Products.ToListAsync();
        _context.Products.RemoveRange(products);
        
        _context.Products.AddRange(newProducts);
        await _context.SaveChangesAsync();
        
        return await _context.Products.ToArrayAsync();
    }
    
    public async Task<Product?> GetProduct(int id) => await _context.Products.FindAsync(id);

    public async Task UpdateProducts(Product[] products)
    {
        foreach (var product in products)
        {
            await _context.Products
                .Where(p => p.Id == product.Id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(p => p.Name, product.Name)
                    .SetProperty(p => p.Price, product.Price)
                    .SetProperty(p => p.Quantity, product.Quantity)
                );
            
            await _context.SaveChangesAsync();
        }
    }  
}