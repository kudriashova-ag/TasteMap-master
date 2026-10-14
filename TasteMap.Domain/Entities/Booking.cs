using System;

namespace TasteMap.Domain.Entities;

public class Booking
{
    public int Id { get; set; }
    public DateTime BookingDate { get; set; }
    public int NumberOfGuests { get; set; }
    public string Status { get; set; } = "Pending"; // "Pending", "Confirmed", "Cancelled"
    public string? Comments { get; set; } // Пожелания клиента (например, столик у окна)
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Кто забронировал
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    // Где забронировали
    public int RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; } = null!;

    // Опционально: Какое мероприятие забронировали 
    // (знак вопроса означает, что бронь может быть просто столика на вечер, без ивента)
    public int? EventId { get; set; }
    public Event? Event { get; set; }
}