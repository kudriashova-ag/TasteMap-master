namespace TasteMap.Application.DTOs.Reviews;

public class ReviewDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;

    // 
    public int RestaurantId { get; set; }
    public string RestaurantName { get; set; } = string.Empty;

    public int Rating { get; set; }
    public string Comment { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}