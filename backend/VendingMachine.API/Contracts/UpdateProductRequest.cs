namespace VendingMachine.API.Contracts;

public record UpdateProductRequest(int Id, string Name, int Price, int Quantity);