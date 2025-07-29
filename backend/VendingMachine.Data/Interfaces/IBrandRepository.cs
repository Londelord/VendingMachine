using VendingMachine.Data.Models;

namespace VendingMachine.Data.Interfaces;

public interface IBrandsRepository
{
    Task<List<Brand>> GetBrands();
}