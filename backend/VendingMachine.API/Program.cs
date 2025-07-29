using VendingMachine.Application.Interfaces;
using VendingMachine.Application.Services;
using VendingMachine.Data.DataAccess;
using VendingMachine.Data.Initializers;
using VendingMachine.Data.Interfaces;
using VendingMachine.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<VendingMachineDbContext>();
builder.Services.AddScoped<IPayService, PayService>();
builder.Services.AddSingleton<IMachineLockService, MachineLockService>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<IBrandsRepository, BrandsRepository>();
builder.Services.AddScoped<ICoinsRepository, CoinsRepository>();
builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();

var app = builder.Build();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

using (var scope = app.Services.CreateScope())
{ 
    var dbContext = scope.ServiceProvider.GetRequiredService<VendingMachineDbContext>(); 
    dbContext.Database.EnsureCreated();
    VendingMachineDbInitializer.SeedBrands(dbContext);
    VendingMachineDbInitializer.SeedCoins(dbContext);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();