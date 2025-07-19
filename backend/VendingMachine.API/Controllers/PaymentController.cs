using Microsoft.AspNetCore.Mvc;
using VendingMachine.API.Contracts;
using VendingMachine.Application.Services;
using VendingMachine.Data.Models;

namespace VendingMachine.API.Controllers;

[ApiController]
[Route("api/vendingmachine/payment")]
public class PaymentController : ControllerBase
{
    private readonly PayService _payService;
    private readonly ILogger<PaymentController> _logger;

    public PaymentController(PayService payService, ILogger<PaymentController> logger)
    {
        _payService = payService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Pay(PayRequest request)
    {
        var result = await _payService.Pay(request.Products, request.Coins);

        if (result.IsFailure)
        {
            _logger.LogError(result.Error);
            return BadRequest(result.Error);
        }

        var coins = result.Value.Select(kvp => new Coin
        {
            Denomination = kvp.Key, Quantity = kvp.Value
        }).ToList();

        return Ok(coins);
    }
}