namespace VendingMachine.API.Contracts;

public record GetProductResponse(int Id, string Name, decimal Price, int Quantity, GetBrandResponse Brand, string Image);