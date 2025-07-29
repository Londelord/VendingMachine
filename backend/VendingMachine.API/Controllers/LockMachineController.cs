using Microsoft.AspNetCore.Mvc;
using VendingMachine.Application.Interfaces;
using VendingMachine.Application.Services;

namespace VendingMachine.API.Controllers;

[ApiController]
[Route("api/vendingmachine")]
public class LockMachineController : ControllerBase
{
    private readonly IMachineLockService _lockService;

    public LockMachineController(IMachineLockService lockService)
    {
        _lockService = lockService;
    }

    [HttpPost("try-lock")]
    public IActionResult TryLock([FromQuery] string token)
    {
        return Ok(_lockService.TryLock(token));
    }

    [HttpPost("unlock")]
    public IActionResult Unlock([FromQuery] string token)
    {
        _lockService.Unlock(token);
        return Ok();
    }
}