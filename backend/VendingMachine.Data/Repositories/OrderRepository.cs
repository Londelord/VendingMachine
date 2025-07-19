using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Repositories;

public class OrderRepository
{
    private readonly VendingMachineDbContext _context;

    public OrderRepository(VendingMachineDbContext context)
    {
        _context = context;
    }

    public async Task SaveOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
    }
}