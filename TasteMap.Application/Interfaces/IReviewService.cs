using TasteMap.Application.DTOs.Reviews;

namespace TasteMap.Application.Interfaces;

public interface IReviewService
{
    Task<int> AddReviewAsync(int userId, CreateReviewDto dto);
    Task<IEnumerable<ReviewDto>> GetRestaurantReviewsAsync(int restaurantId);
    Task<IEnumerable<ReviewDto>> GetUserReviewsAsync(int userId);
}