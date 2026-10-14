namespace TasteMap.Application.DTOs.Restaurants;

public class CreateRestaurantDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string RestaurantType { get; set; } = string.Empty;
    public int TotalTables { get; set; }
    public int MaxGuestsCapacity { get; set; }

    // Чекбоксы удобств
    public bool HasKidsZone { get; set; }
    public bool IsPetFriendly { get; set; }
    public bool HasWifi { get; set; }
    public bool HasParking { get; set; }
    public bool HasSummerTerrace { get; set; }
}