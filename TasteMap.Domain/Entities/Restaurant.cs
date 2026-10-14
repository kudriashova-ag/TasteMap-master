namespace TasteMap.Domain.Entities;

public class Restaurant
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string RestaurantType { get; set; } = string.Empty;

    //  свойство ImageUrl:
    public string ImageUrl { get; set; } = string.Empty;

    public int OwnerId { get; set; }
    public User Owner { get; set; } = null!;

    public int TotalTables { get; set; }
    public int MaxGuestsCapacity { get; set; }
    public bool HasKidsZone { get; set; }
    public bool IsPetFriendly { get; set; }
    public bool HasWifi { get; set; }
    public bool HasParking { get; set; }
    public bool HasSummerTerrace { get; set; }

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}