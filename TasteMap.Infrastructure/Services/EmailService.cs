using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using TasteMap.Application.Interfaces;

namespace TasteMap.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        var email = new MimeMessage();
        
        // От кого (берем настройки из appsettings.json)
        email.From.Add(new MailboxAddress(
            _configuration["EmailSettings:SenderName"], 
            _configuration["EmailSettings:SenderEmail"]
        ));
        
        // Кому
        email.To.Add(MailboxAddress.Parse(toEmail));
        
        // Тема и тело письма
        email.Subject = subject;
        email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message };

        using var smtp = new SmtpClient();
        try
        {
            // Подключаемся к SMTP-серверу (например, Gmail, Ukr.net или SendGrid)
            await smtp.ConnectAsync(
                _configuration["EmailSettings:SmtpServer"],
                int.Parse(_configuration["EmailSettings:SmtpPort"]!),
                MailKit.Security.SecureSocketOptions.StartTls
            );

            // Авторизуемся
            await smtp.AuthenticateAsync(
                _configuration["EmailSettings:Username"],
                _configuration["EmailSettings:Password"]
            );

            // Отправляем письмо
            await smtp.SendAsync(email);
        }
        catch (Exception ex)
        {
            // Логируем ошибку (в реальном проекте лучше использовать ILogger)
            throw new InvalidOperationException($"Ошибка при отправке email: {ex.Message}");
        }
        finally
        {
            await smtp.DisconnectAsync(true);
        }
    }
}