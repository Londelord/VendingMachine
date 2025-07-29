using Microsoft.EntityFrameworkCore;
using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Interfaces;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Repositories;

public class BrandsRepository : IBrandsRepository
{
    private readonly VendingMachineDbContext _context;

    public BrandsRepository(VendingMachineDbContext context)
    {
        _context = context;
    }
    
    public async Task<List<Brand>> GetBrands() => await _context.Brands.ToListAsync();
}