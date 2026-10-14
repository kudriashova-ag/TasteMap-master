using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TasteMap.Infrastructure.Data;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        // Эта строка подключения используется ТОЛЬКО для создания миграций из консоли.
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=TasteMapDb;Username=postgres;Password=SuperSecretPassword123!");

        return new AppDbContext(optionsBuilder.Options);
    }
}