using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendingMachine.Data.Models;

public class Order
{
    [Key] 
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Total { get; set; }
    
    [Column(TypeName = "jsonb")]
    public List<ArchivedProduct> ArchivedProducts { get; set; } = new();
}