using Microsoft.EntityFrameworkCore;
using TasteMap.Application.Interfaces;
using TasteMap.Domain.Entities;

namespace TasteMap.Infrastructure.Data;

public class AppDbContext : DbContext, IAppDbContext
{
    //public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    //{
    //}

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Таблицы в базе данных
    public DbSet<User> Users { get; set; }
    public DbSet<Restaurant> Restaurants { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Review> Reviews { get; set; }

    // Настройка связей (Fluent API)
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Чтобы избежать ошибки "каскадного удаления" (когда удаление ресторана потянет 
        // за собой удаление юзеров или наоборот), мы явно указываем поведение Restrict
        // для некоторых связей.

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany(u => u.Bookings)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Не удалять юзера при удалении брони и наоборот

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Restaurant)
            .WithMany(r => r.Bookings)
            .HasForeignKey(b => b.RestaurantId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}