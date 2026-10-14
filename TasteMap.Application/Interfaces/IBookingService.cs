using TasteMap.Application.DTOs.Bookings;

namespace TasteMap.Application.Interfaces;

public interface IBookingService
{
    Task<int> CreateBookingAsync(int userId, CreateBookingDto dto);
    Task<IEnumerable<BookingDto>> GetUserBookingsAsync(int userId);
    Task<IEnumerable<BookingDto>> GetRestaurantBookingsAsync(int ownerId, int restaurantId);
    Task<bool> CancelBookingAsync(int userId, int bookingId);
}