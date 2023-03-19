
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace server.Security;
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true,Inherited = true)]
public class ApiKeyAttribute : Attribute, IAuthorizationFilter
{
    private const string API_KEY_HEADER_NAME = "X-API-KEY";
    
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var receivedApiKey = GetReceivedApiKey(context.HttpContext);

        var apiKey = GetApiKey(context.HttpContext);

        if (!ApiKeyIsValid(apiKey, receivedApiKey))
        {
            context.Result = new UnauthorizedResult();
        }

    }

    private static string GetReceivedApiKey(HttpContext context)
    {
        return context.Request.Headers[API_KEY_HEADER_NAME];
    }

    private static string GetApiKey(HttpContext context)
    {
        var configuration = context.RequestServices.GetRequiredService<IConfiguration>();
        return configuration.GetValue<string>("ApiKey");
    }

    private static bool ApiKeyIsValid(string apiKey, string receivedApiKey)
    {
        if (string.IsNullOrWhiteSpace(receivedApiKey)) return false;

        var apiKeySpan = MemoryMarshal.Cast<char, byte>(apiKey.AsSpan());

        var receivedApiKeySpan = MemoryMarshal.Cast<char, byte>(receivedApiKey.AsSpan());

        return CryptographicOperations.FixedTimeEquals(apiKeySpan, receivedApiKeySpan);
    }
}
