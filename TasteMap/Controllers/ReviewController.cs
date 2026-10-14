using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TasteMap.Application.DTOs.Reviews;
using TasteMap.Application.Interfaces;

namespace TasteMap.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController : ControllerBase
{
    private readonly IReviewService _reviewService;

    public ReviewController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddReview([FromBody] CreateReviewDto dto)
    {
        try
        {
            int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var reviewId = await _reviewService.AddReviewAsync(userId, dto);
            return Ok(new { message = "Отзыв успешно добавлен!", reviewId });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("restaurant/{restaurantId}")]
    public async Task<IActionResult> GetRestaurantReviews(int restaurantId)
    {
        var reviews = await _reviewService.GetRestaurantReviewsAsync(restaurantId);
        return Ok(reviews);
    }

    [HttpGet("my-reviews")]
    [Authorize]
    public async Task<IActionResult> GetMyReviews()
    {
        // Получаем Id авторизованного пользователя из JWT токена
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Unauthorized();
        }

        var reviews = await _reviewService.GetUserReviewsAsync(userId);
        return Ok(reviews);
    }
}