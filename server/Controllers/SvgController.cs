using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class SvgController : ControllerBase
{
    private readonly ILogger<SvgController> _logger;
    public SvgController(ILogger<SvgController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        try
        {
            string source = System.IO.File.ReadAllText("data.json");

            var data = JsonSerializer.Deserialize<Dimension>(source);

            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Put([FromBody] Dimension dimension)
    {
        try
        {
            System.IO.File.WriteAllText("data.json", JsonSerializer.Serialize(dimension));
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest();
        }
    }

    [HttpGet, Route("Perimeter")]
    public IActionResult Get([FromQuery] int width = 0, [FromQuery] int height = 0)
    {
        try
        {
            var perimeter = 2 * (width + height);

            return Ok(perimeter);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return BadRequest();
        }
    }
}
