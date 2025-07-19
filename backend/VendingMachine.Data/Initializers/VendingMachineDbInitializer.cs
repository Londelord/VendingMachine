using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Initializers;

public static class VendingMachineDbInitializer
{
    public static void SeedBrands(VendingMachineDbContext context)
    {
        if (context.Brands.Any()) return;

        var brands = new[]
        {
            new Brand { Name = "Coca-Cola" },
            new Brand { Name = "Fanta" },
            new Brand { Name = "Sprite" },
            new Brand { Name = "Pepsi" },
            new Brand { Name = "Dr Pepper" },
            new Brand { Name = "Red Bull" },
            new Brand { Name = "Schweppes" }
        };

        context.Brands.AddRange(brands);
        context.SaveChanges();
    }

    public static void SeedCoins(VendingMachineDbContext context)
    {
        if (context.Coins.Any()) return;

        var coins = new[]
        {
            new Coin { Denomination = 1, Quantity = 20 },
            new Coin { Denomination = 2, Quantity = 20 },
            new Coin { Denomination = 5, Quantity = 20 },
            new Coin { Denomination = 10, Quantity = 20 }
        };
        
        context.Coins.AddRange(coins);
        context.SaveChanges();
    }
}