using TasteMap.Application.DTOs.Restaurants;

namespace TasteMap.Application.Interfaces;

public interface IRestaurantService
{
    Task<int> CreateRestaurantAsync(int ownerId, CreateRestaurantDto dto);

    // new
    Task<IEnumerable<RestaurantDto>> GetAllAsync(string? city = null, string? type = null, bool? hasKidsZone = null);
    Task<RestaurantDto?> GetByIdAsync(int id);
    Task<RestaurantDto?> GetByOwnerIdAsync(int ownerId);
}