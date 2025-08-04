using Microsoft.AspNetCore.Mvc;
using VendingMachine.API.Contracts;
using VendingMachine.Application.Services;
using VendingMachine.Data.Interfaces;
using VendingMachine.Data.Models;
using VendingMachine.Data.Repositories;

namespace VendingMachine.API.Controllers;

[ApiController]
[Route("api/vendingmachine/products")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductsRepository _productsRepository;

    public ProductController(ILogger<ProductController> logger,
        IProductsRepository productsRepository)
    {
        _logger = logger;
        _productsRepository = productsRepository;
    }

    [HttpPost]
    public async Task<IActionResult> AddProduct(AddProductRequest request)
    {
        var product = new Product
        {
            Name = request.Name,
            BrandId = request.BrandId,
            Price = request.Price,
            Quantity = request.Quantity,
            ImageUrl = request.ImageUrl
        };

        await _productsRepository.AddProduct(product);
        return Ok(product);
    }

    [HttpPost("import")]
    public async Task<IActionResult> ImportProducts(AddProductRequest[] request)
    {
        var products = request.Select(requestProduct => new Product
        {
            Name = requestProduct.Name,
            BrandId = requestProduct.BrandId,
            Price = requestProduct.Price,
            Quantity = requestProduct.Quantity,
            ImageUrl = requestProduct.ImageUrl
        }).ToArray();

        try
        {
            var newProducts = await _productsRepository.ImportProducts(products);
            return Ok(newProducts);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return Problem(e.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts([FromQuery] GetAllProductsRequest request)
    {
        try
        {
            var products =
                await _productsRepository.GetAllProducts(request.BrandName, request.StartPrice, request.EndPrice);
            var responseProducts = products.Select(product =>
                    new GetProductResponse(product.Id, product.Name, product.Price, product.Quantity,
                        new GetBrandResponse(product.Brand.Id, product.Brand.Name), product.ImageUrl))
                .ToArray();

            return Ok(responseProducts);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return Problem(e.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProducts(UpdateProductRequest[] products)
    {
        try
        {
            var newProducts = products.Select(p => new Product
            {
                Name = p.Name,
                Price = p.Price,
                Quantity = p.Quantity,
                Id = p.Id
            }).ToArray();

            await _productsRepository.UpdateProducts(newProducts);
            return Ok("Успешно обновлено");
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return Problem(e.Message);
        }
    }
}