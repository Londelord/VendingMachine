namespace VendingMachine.API.Contracts;

public record GetAllProductsRequest(string? BrandName, int? StartPrice, int? EndPrice);