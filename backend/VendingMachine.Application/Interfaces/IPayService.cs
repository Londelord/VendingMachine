using CSharpFunctionalExtensions;
using VendingMachine.Application.DTOs;
using VendingMachine.Data.Models;

namespace VendingMachine.Application.Interfaces;

public interface IPayService
{
    Task<Result<Dictionary<int, int>>> Pay(PayProductDto[] products, Coin[] insertedCoins);
}