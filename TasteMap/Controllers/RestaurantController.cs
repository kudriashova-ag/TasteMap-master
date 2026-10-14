using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TasteMap.Application.DTOs.Restaurants;
using TasteMap.Application.Interfaces;

namespace TasteMap.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RestaurantController : ControllerBase
{
    private readonly IRestaurantService _restaurantService;

    public RestaurantController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }

    [Authorize(Roles = "RestaurantOwner")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateRestaurant([FromBody] CreateRestaurantDto dto)
    {
        try
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdString, out int ownerId))
            {
                return Unauthorized(new { message = "Не удалось определить пользователя." });
            }

            var restaurantId = await _restaurantService.CreateRestaurantAsync(ownerId, dto);

            return Ok(new { message = "Ресторан успешно добавлен!", restaurantId = restaurantId });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // Публичный доступ — просмотр всех ресторанов с возможностью фильтрации
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? city, [FromQuery] string? type, [FromQuery] bool? hasKidsZone)
    {
        var restaurants = await _restaurantService.GetAllAsync(city, type, hasKidsZone);
        return Ok(restaurants);
    }

    // Публичный доступ — детальная страница одного ресторана
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var restaurant = await _restaurantService.GetByIdAsync(id);
        if (restaurant == null)
            return NotFound(new { message = "Ресторан не найден." });

        return Ok(restaurant);
    }

    [Authorize(Roles = "RestaurantOwner")]
    [HttpGet("my-restaurant")]
    public async Task<IActionResult> GetMyRestaurant()
    {
        try
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(userIdString, out int ownerId))
            {
                return Unauthorized(new { message = "Не вдалося визначити користувача." });
            }

            var restaurant = await _restaurantService.GetByOwnerIdAsync(ownerId);
            if (restaurant == null)
            {
                // Возвращаем 200 OK со значением null (или 404), чтобы фронтенд сразу предлагал создать ресторан
                return Ok(null);
            }

            return Ok(restaurant);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}