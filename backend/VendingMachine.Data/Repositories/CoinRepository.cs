using Microsoft.EntityFrameworkCore;
using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Repositories;

public class CoinRepository
{
    private readonly VendingMachineDbContext _context;

    private static readonly int[] CoinDenominations = [1, 2, 5, 10];

    public CoinRepository(VendingMachineDbContext context)
    {
        _context = context;
    }

    public async Task AddCoins(Coin[] coins)
    {
        if (coins.Any(c => !CoinDenominations.Contains(c.Denomination)))
            throw new Exception("Invalid coin denomination");

        var dbCoins = await _context.Coins.ToListAsync();
        var dbCoinDict = dbCoins.ToDictionary(c => c.Denomination);

        foreach (var coin in coins)
        {
            if (dbCoinDict.TryGetValue(coin.Denomination, out var existingCoin))
            {
                existingCoin.Quantity += coin.Quantity;
                _context.Coins.Update(existingCoin);
            }
            else
            {
                _context.Coins.Add(new Coin
                {
                    Denomination = coin.Denomination,
                    Quantity = coin.Quantity
                });
            }
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task UpdateCoins(Coin[] coins)
    {
        if (coins.Any(c => !CoinDenominations.Contains(c.Denomination)))
            throw new Exception("Invalid coin denomination");

        var dbCoins = await _context.Coins.ToListAsync();
        var dbCoinDict = dbCoins.ToDictionary(c => c.Denomination);

        foreach (var coin in coins)
        {
            if (dbCoinDict.TryGetValue(coin.Denomination, out var existingCoin))
            {
                existingCoin.Quantity = coin.Quantity;
                _context.Coins.Update(existingCoin);
            }
            else
            {
                _context.Coins.Add(new Coin
                {
                    Denomination = coin.Denomination,
                    Quantity = coin.Quantity
                });
            }
        }

        await _context.SaveChangesAsync();
    }
    
    public async Task<Coin[]> GetAllCoins() => await _context.Coins.ToArrayAsync();
}