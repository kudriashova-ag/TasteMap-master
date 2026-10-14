using System;

namespace TasteMap.Domain.Entities;

public class Review
{
    public int Id { get; set; }
    public int Rating { get; set; } // От 1 до 5
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Кто оставил отзыв
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    // К какому ресторану относится
    public int RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; } = null!;
}