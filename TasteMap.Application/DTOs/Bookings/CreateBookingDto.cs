namespace TasteMap.Application.DTOs.Bookings;

public class CreateBookingDto
{
    public int RestaurantId { get; set; }
    public DateTime BookingTime { get; set; }
    public int NumberOfGuests { get; set; }
    public string? SpecialRequests { get; set; }
}