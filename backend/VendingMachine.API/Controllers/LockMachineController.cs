using Microsoft.AspNetCore.Mvc;
using VendingMachine.Application.Services;

namespace VendingMachine.API.Controllers;

[ApiController]
[Route("api/vendingmachine")]
public class LockMachineController : ControllerBase
{
    private readonly MachineLockService _lockService;

    public LockMachineController(MachineLockService lockService)
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

    [HttpGet("status")]
    public IActionResult Status()
    {
        return Ok(new
        {
            locked = _lockService.CurrentToken != null
        });
    }
}