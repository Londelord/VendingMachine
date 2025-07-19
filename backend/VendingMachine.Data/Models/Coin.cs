using System.ComponentModel.DataAnnotations;

namespace VendingMachine.Data.Models;

public class Coin
{
    [Key]
    public int Denomination { get; set; }
    public int Quantity { get; set; }
}