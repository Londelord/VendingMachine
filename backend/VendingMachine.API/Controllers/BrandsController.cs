using Microsoft.AspNetCore.Mvc;
using VendingMachine.API.Contracts;
using VendingMachine.Data.Repositories;

namespace VendingMachine.API.Controllers;

[ApiController]
[Route("api/vendingmachine/brands")]
public class BrandsController : ControllerBase
{
    private readonly BrandsRepository _brandsRepository;
    private readonly ILogger<BrandsController> _logger;

    public BrandsController(BrandsRepository brandsRepository, ILogger<BrandsController> logger)
    {
        _brandsRepository = brandsRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetBrands()
    {
        try
        {
            var brands = await _brandsRepository.GetBrands();
            var responseBrands = brands.Select(brand =>
                    new GetBrandResponse(brand.Id, brand.Name))
                .ToList();

            return Ok(responseBrands);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
        
    }
}