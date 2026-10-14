using Microsoft.EntityFrameworkCore;
using TasteMap.Application.DTOs.Restaurants;
using TasteMap.Application.DTOs.Reviews;
using TasteMap.Application.Interfaces;
using TasteMap.Domain.Entities;

namespace TasteMap.Application.Services;

public class ReviewService : IReviewService
{
    private readonly IAppDbContext _context;

    public ReviewService(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<int> AddReviewAsync(int userId, CreateReviewDto dto)
    {
        if (dto.Rating < 1 || dto.Rating > 5)
            throw new Exception("Рейтинг должен быть от 1 до 5.");

        var restaurant = await _context.Restaurants.FindAsync(dto.RestaurantId);
        if (restaurant == null)
            throw new Exception("Ресторан не найден.");

        var review = new Review
        {
            UserId = userId,
            RestaurantId = dto.RestaurantId,
            Rating = dto.Rating,
            Comment = dto.Comment,
            CreatedAt = DateTime.UtcNow
        };

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        return review.Id;
    }

    public async Task<IEnumerable<ReviewDto>> GetRestaurantReviewsAsync(int restaurantId)
    {
        return await _context.Reviews
            .Include(r => r.User)
            .Where(r => r.RestaurantId == restaurantId)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new ReviewDto
            {
                Id = r.Id,
                UserName = $"{r.User.FirstName} {r.User.LastName}",
                Rating = r.Rating,
                Comment = r.Comment,
                CreatedAt = r.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<ReviewDto>> GetUserReviewsAsync(int userId)
    {
        var reviews = await _context.Reviews
            .Include(r => r.Restaurant)
            .Where(r => r.UserId == userId)
            .Select(r => new ReviewDto
            {
                Id = r.Id,
                RestaurantId = r.RestaurantId,
                RestaurantName = r.Restaurant.Name,
                Rating = r.Rating,
                Comment = r.Comment,
                CreatedAt = r.CreatedAt
            })
            .ToListAsync();

        return reviews;
    }
}