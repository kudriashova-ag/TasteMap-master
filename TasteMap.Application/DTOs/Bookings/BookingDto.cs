namespace TasteMap.Application.DTOs.Bookings;

public class BookingDto
{
    public int Id { get; set; }
    public int RestaurantId { get; set; }
    public string RestaurantName { get; set; } = string.Empty;
    public DateTime BookingTime { get; set; }
    public int NumberOfGuests { get; set; }
    public string Status { get; set; } = "Pending";
    public string? SpecialRequests { get; set; }
}