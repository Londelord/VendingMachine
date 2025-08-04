using Microsoft.EntityFrameworkCore;
using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Interfaces;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Repositories;

public class ProductsRepository : IProductsRepository
{
    private readonly VendingMachineDbContext _context;

    public ProductsRepository(VendingMachineDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetAllProducts(string? brandName = null, int? startPrice = null, int? endPrice = null)
    {
        var query = _context.Products.Include(p => p.Brand).AsQueryable();
        if (!string.IsNullOrWhiteSpace(brandName))
        {
            query = query.Where(p => p.Brand.Name.ToLower() == brandName.ToLower());
        }

        if (startPrice.HasValue)
        {
            query = query.Where(p => p.Price >= startPrice.Value);
        }

        if (endPrice.HasValue)
        {
            query = query.Where(p => p.Price <= endPrice.Value);
        }

        return await query.ToListAsync();
    }

    public async Task AddProduct(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
    }

    public async Task<Product[]> ImportProducts(Product[] newProducts)
    {
        var products = await _context.Products.ToListAsync();
        _context.Products.RemoveRange(products);

        _context.Products.AddRange(newProducts);
        await _context.SaveChangesAsync();

        return await _context.Products.ToArrayAsync();
    }

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