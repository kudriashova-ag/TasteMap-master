using System;
using System.Collections.Generic;

namespace TasteMap.Domain.Entities;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal Price { get; set; } // Стоимость входа, если мероприятие платное

    // Мероприятие всегда привязано к конкретному ресторану
    public int RestaurantId { get; set; }
    public Restaurant Restaurant { get; set; } = null!;

    // Одно мероприятие могут забронировать несколько пользователей
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}