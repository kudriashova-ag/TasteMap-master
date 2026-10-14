using Microsoft.EntityFrameworkCore;
using TasteMap.Application.DTOs.Restaurants;
using TasteMap.Application.Interfaces;
using TasteMap.Domain.Entities;

namespace TasteMap.Application.Services;

public class RestaurantService : IRestaurantService
{
    private readonly IAppDbContext _context;

    public RestaurantService(IAppDbContext context)
    {
        _context = context;
    }

    public async Task<int> CreateRestaurantAsync(int ownerId, CreateRestaurantDto dto)
    {
        var restaurant = new Restaurant
        {
            OwnerId = ownerId,
            Name = dto.Name,
            Description = dto.Description,
            Address = dto.Address,
            City = dto.City,
            RestaurantType = dto.RestaurantType,
            //ImageUrl = dto.ImageUrl, // <-- Не забудь добавить сохранение фото!
            TotalTables = dto.TotalTables,
            MaxGuestsCapacity = dto.MaxGuestsCapacity,
            HasKidsZone = dto.HasKidsZone,
            IsPetFriendly = dto.IsPetFriendly,
            HasWifi = dto.HasWifi,
            HasParking = dto.HasParking,
            HasSummerTerrace = dto.HasSummerTerrace
        };

        _context.Restaurants.Add(restaurant);
        await _context.SaveChangesAsync();

        return restaurant.Id;
    }

    public async Task<IEnumerable<RestaurantDto>> GetAllAsync(string? city = null, string? type = null, bool? hasKidsZone = null)
    {
        var query = _context.Restaurants.Include(r => r.Owner).AsQueryable();

        // 1. Фильтр по городу
        if (!string.IsNullOrWhiteSpace(city) && !city.Equals("все", StringComparison.OrdinalIgnoreCase) && !city.Equals("all", StringComparison.OrdinalIgnoreCase))
        {
            query = query.Where(r => r.City.ToLower().Contains(city.Trim().ToLower()));
        }

        // 2. Фильтр по типу кухни (гибкий поиск через Contains вместо strict ==)
        if (!string.IsNullOrWhiteSpace(type)
            && !type.Equals("все", StringComparison.OrdinalIgnoreCase)
            && !type.Equals("всі", StringComparison.OrdinalIgnoreCase)
            && !type.Equals("all", StringComparison.OrdinalIgnoreCase))
        {
            var cleanType = type.Trim().ToLower();
            query = query.Where(r => r.RestaurantType.ToLower().Contains(cleanType));
        }

        // 3. Фильтр по детской зоне
        if (hasKidsZone.HasValue && hasKidsZone.Value)
        {
            query = query.Where(r => r.HasKidsZone);
        }

        return await query.Select(r => new RestaurantDto
        {
            Id = r.Id,
            Name = r.Name,
            Description = r.Description,
            Address = r.Address,
            City = r.City,
            RestaurantType = r.RestaurantType,
            ImageUrl = r.ImageUrl, // <-- Привязываем фото к выгрузке
            TotalTables = r.TotalTables,
            MaxGuestsCapacity = r.MaxGuestsCapacity,
            HasKidsZone = r.HasKidsZone,
            IsPetFriendly = r.IsPetFriendly,
            HasWifi = r.HasWifi,
            HasParking = r.HasParking,
            HasSummerTerrace = r.HasSummerTerrace,
            OwnerName = r.Owner != null ? $"{r.Owner.FirstName} {r.Owner.LastName}" : string.Empty
        }).ToListAsync();
    }

    public async Task<RestaurantDto?> GetByIdAsync(int id)
    {
        var r = await _context.Restaurants
            .Include(res => res.Owner)
            .FirstOrDefaultAsync(res => res.Id == id);

        if (r == null) return null;

        return new RestaurantDto
        {
            Id = r.Id,
            Name = r.Name,
            Description = r.Description,
            Address = r.Address,
            City = r.City,
            RestaurantType = r.RestaurantType,
            ImageUrl = r.ImageUrl,
            TotalTables = r.TotalTables,
            MaxGuestsCapacity = r.MaxGuestsCapacity,
            HasKidsZone = r.HasKidsZone,
            IsPetFriendly = r.IsPetFriendly,
            HasWifi = r.HasWifi,
            HasParking = r.HasParking,
            HasSummerTerrace = r.HasSummerTerrace,
            OwnerName = r.Owner != null ? $"{r.Owner.FirstName} {r.Owner.LastName}" : string.Empty
        };
    }

    public async Task<RestaurantDto?> GetByOwnerIdAsync(int ownerId)
    {
        var restaurant = await _context.Restaurants
            .FirstOrDefaultAsync(r => r.OwnerId == ownerId);

        if (restaurant == null) return null;

        return new RestaurantDto
        {
            Id = restaurant.Id,
            Name = restaurant.Name,
            Description = restaurant.Description,
            Address = restaurant.Address,
            City = restaurant.City,
            RestaurantType = restaurant.RestaurantType,
            ImageUrl = restaurant.ImageUrl,
            TotalTables = restaurant.TotalTables,
            MaxGuestsCapacity = restaurant.MaxGuestsCapacity,
            HasKidsZone = restaurant.HasKidsZone,
            IsPetFriendly = restaurant.IsPetFriendly,
            HasWifi = restaurant.HasWifi,
            HasParking = restaurant.HasParking,
            HasSummerTerrace = restaurant.HasSummerTerrace
        };
    }
}