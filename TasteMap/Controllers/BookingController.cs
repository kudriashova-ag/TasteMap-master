using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TasteMap.Application.DTOs.Bookings;
using TasteMap.Application.Interfaces;

namespace TasteMap.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
    {
        try
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var bookingId = await _bookingService.CreateBookingAsync(userId, dto);
            return Ok(new { message = "Бронирование успешно создано!", bookingId });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var bookings = await _bookingService.GetUserBookingsAsync(userId);
        return Ok(bookings);
    }

    [Authorize(Roles = "RestaurantOwner")]
    [HttpGet("restaurant/{restaurantId}")]
    public async Task<IActionResult> GetRestaurantBookings(int restaurantId)
    {
        try
        {
            int ownerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var bookings = await _bookingService.GetRestaurantBookingsAsync(ownerId, restaurantId);
            return Ok(bookings);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("cancel/{id}")]
    public async Task<IActionResult> Cancel(int id)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _bookingService.CancelBookingAsync(userId, id);
        if (!result) return NotFound(new { message = "Бронирование не найдено." });

        return Ok(new { message = "Бронирование отменено." });
    }
}