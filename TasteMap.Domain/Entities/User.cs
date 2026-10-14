using System;
using System.Collections.Generic;

namespace TasteMap.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public string Role { get; set; } = "User";
    public string? RefreshToken { get; set; }
    public string? VerificationCode { get; set; }
    public bool IsEmailVerified { get; set; } = false;

    public DateTime? RefreshTokenExpiryTime { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Навигационные свойства:
    // Если пользователь - владелец, у него может быть несколько ресторанов
    public ICollection<Restaurant> Restaurants { get; set; } = new List<Restaurant>();

    // Бронирования клиента
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    // Отзывы, оставленные клиентом
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}