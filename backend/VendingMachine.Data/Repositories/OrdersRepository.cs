using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Interfaces;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.Repositories;

public class OrdersRepository : IOrdersRepository
{
    private readonly VendingMachineDbContext _context;

    public OrdersRepository(VendingMachineDbContext context)
    {
        _context = context;
    }

    public async Task SaveOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
    }
}