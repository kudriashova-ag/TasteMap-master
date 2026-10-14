using Microsoft.EntityFrameworkCore;
using TasteMap.Application.DTOs.Bookings;
using TasteMap.Application.Interfaces;
using TasteMap.Domain.Entities;

namespace TasteMap.Application.Services;

public class BookingService : IBookingService
{
    private readonly IAppDbContext _context;

    public BookingService(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateBookingAsync(int userId, CreateBookingDto dto)
    {
        var restaurant = await _context.Restaurants.FindAsync(dto.RestaurantId);
        if (restaurant == null)
            throw new Exception("Ресторан не найден.");

        var booking = new Booking
        {
            UserId = userId,
            RestaurantId = dto.RestaurantId,
            BookingDate = dto.BookingTime.ToUniversalTime(),             NumberOfGuests = dto.NumberOfGuests,
            Comments = dto.SpecialRequests,
            Status = "Pending"
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return booking.Id;
    }

    public async Task<IEnumerable<BookingDto>> GetUserBookingsAsync(int userId)
    {
        return await _context.Bookings
            .Include(b => b.Restaurant)
            .Where(b => b.UserId == userId)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                RestaurantId = b.RestaurantId,
                RestaurantName = b.Restaurant.Name,
                BookingTime = b.BookingDate,
                NumberOfGuests = b.NumberOfGuests,
                Status = b.Status,
                SpecialRequests = b.Comments
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<BookingDto>> GetRestaurantBookingsAsync(int ownerId, int restaurantId)
    {
        var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == restaurantId && r.OwnerId == ownerId);
        if (restaurant == null)
            throw new Exception("Ресторан не найден или вы не являетесь его владельцем.");

        return await _context.Bookings
            .Where(b => b.RestaurantId == restaurantId)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                RestaurantId = b.RestaurantId,
                RestaurantName = restaurant.Name,
                BookingTime = b.BookingDate,
                NumberOfGuests = b.NumberOfGuests,
                Status = b.Status,
                SpecialRequests = b.Comments
            })
            .ToListAsync();
    }

    public async Task<bool> CancelBookingAsync(int userId, int bookingId)
    {
        var booking = await _context.Bookings.FirstOrDefaultAsync(b => b.Id == bookingId && b.UserId == userId);
        if (booking == null) return false;

        booking.Status = "Cancelled";
        await _context.SaveChangesAsync();
        return true;
    }
}