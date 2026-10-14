using TasteMap.Application.DTOs;

namespace TasteMap.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(UserRegisterDto dto);
    Task<AuthResponseDto> LoginAsync(UserLoginDto dto);
    Task<bool> VerifyEmailAsync(string email, string code);
}