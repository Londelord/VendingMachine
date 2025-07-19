namespace VendingMachine.Data.Models;

public class ArchivedProduct
{
    public string ProductName { get; set; } = null!;
    public string BrandName { get; set; } = null!;
    public int Quantity { get; set; }
}