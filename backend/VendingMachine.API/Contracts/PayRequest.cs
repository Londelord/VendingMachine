using VendingMachine.Application.DTOs;
using VendingMachine.Data.Models;

namespace VendingMachine.API.Contracts;

public record PayRequest(PayProductDto[] Products, Coin[] Coins);