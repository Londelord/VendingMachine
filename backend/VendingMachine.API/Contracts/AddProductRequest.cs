namespace VendingMachine.API.Contracts;

public record AddProductRequest(string Name, int BrandId, int Price, int Quantity, string ImageUrl);