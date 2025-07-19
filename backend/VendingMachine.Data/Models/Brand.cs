using System.ComponentModel.DataAnnotations;

namespace VendingMachine.Data.Models;

public class Brand
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public ICollection<Product> Products { get; set; } = null!;
}