namespace TasteMap.Application.DTOs.Reviews;

public class CreateReviewDto
{
    public int RestaurantId { get; set; }
    public int Rating { get; set; } // От 1 до 5
    public string Comment { get; set; } = string.Empty;
}