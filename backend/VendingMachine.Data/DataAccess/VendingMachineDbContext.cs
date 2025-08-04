using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using VendingMachine.Data.Models;

namespace VendingMachine.Data.DataAccess;

public class VendingMachineDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    public VendingMachineDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<Brand> Brands => Set<Brand>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<Coin> Coins => Set<Coin>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Postgres"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasOne(p => p.Brand)
            .WithMany(b => b.Products)
            .HasForeignKey(p => p.BrandId);
        
        modelBuilder.Entity<Order>()
            .Property(e => e.ArchivedProducts)
            .HasConversion(
                v => JsonSerializer.Serialize(v, new JsonSerializerOptions()),
                v => JsonSerializer.Deserialize<List<ArchivedProduct>>(v, new JsonSerializerOptions())!);
        
        modelBuilder.Entity<Brand>()
            .HasIndex(b => b.Name);

        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Price); 
    }
}