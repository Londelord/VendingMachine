using VendingMachine.Data.Models;

namespace VendingMachine.Data.Interfaces;

public interface IOrdersRepository
{
    Task SaveOrder(Order order);
}