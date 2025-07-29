using VendingMachine.Data.Models;

namespace VendingMachine.Data.Interfaces;

public interface ICoinsRepository
{
    Task UpdateCoins(Coin[] coins);
    Task<Coin[]> GetAllCoins();
}