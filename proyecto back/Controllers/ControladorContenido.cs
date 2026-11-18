using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TestProject.Models;

namespace TestProject.Controllers
{
    [ApiController]
    [Route("api/contenido")]
    public class ControladorContenido : ControllerBase
    {private readonly string archivoJson = "usuarios.json";



[HttpPost("guardar/{usuario}")]
public async Task<IActionResult> GuardarContenido(string usuario, [FromBody] Contenido contenido)
{
    // Validar que el usuario no sea nulo o vacío
    if (string.IsNullOrEmpty(usuario))
    {
        return BadRequest(new { message = "El usuario es requerido." });
    }

    // Validar que el cuerpo del contenido no sea nulo
    if (contenido == null)
    {
        return BadRequest(new { message = "El contenido es requerido." });
    }

    // Validar que el estado del contenido sea válido
    var estadosValidos = new[] { "viendo", "porver", "visto" };
    if (!estadosValidos.Contains(contenido.Estado.ToLower()))
    {
        return BadRequest(new { message = $"El estado '{contenido.Estado}' no es válido. Los estados válidos son: {string.Join(", ", estadosValidos)}." });
    }

    // Cargar la lista de usuarios
    var personas = CargarPersonas();
    var persona = personas.FirstOrDefault(p => p.Usuario == usuario);

    // Validar que el usuario exista
    if (persona == null)
    {
        return NotFound(new { message = "Usuario no encontrado." });
    }

    // Verificar si el contenido ya existe en la lista según el título
    bool contenidoYaExiste = persona.ListaDeseo.Any(c => c.Titulo == contenido.Titulo);
    if (contenidoYaExiste)
    {
        return BadRequest(new { message = "El contenido ya está en la lista de deseos." });
    }

    // Agregar el contenido a la lista de deseos del usuario
    persona.ListaDeseo.Add(contenido);

    // Guardar los cambios en el archivo JSON
    var json = JsonConvert.SerializeObject(personas, Formatting.Indented, new JsonSerializerSettings
    {
        TypeNameHandling = TypeNameHandling.Auto
    });
    await System.IO.File.WriteAllTextAsync(archivoJson, json);

    return Ok(new { message = "Contenido agregado a la lista con éxito." });
}


 

        [HttpGet("{usuario}")]
        public IActionResult ObtenerListaDeDeseos(string usuario)
        {
            var personas = CargarPersonas();
            var persona = personas.FirstOrDefault(p => p.Usuario == usuario);

            if (persona == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            return Ok(persona.ListaDeseo);
        }

        [HttpDelete("eliminar/{usuario}/{titulo}")]
        public async Task<IActionResult> EliminarContenidoDeListaDeseo(string usuario, string titulo)
        {
            var personas = CargarPersonas();
            var persona = personas.FirstOrDefault(p => p.Usuario == usuario);

            if (persona == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            var contenido = persona.ListaDeseo.FirstOrDefault(c => c.Titulo == titulo);

            if (contenido == null)
            {
                return NotFound(new { message = "Contenido no encontrado en la lista de deseos" });
            }

            persona.ListaDeseo.Remove(contenido);

            var json = JsonConvert.SerializeObject(personas, Formatting.Indented, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.Auto
            });

            await System.IO.File.WriteAllTextAsync(archivoJson, json);

            return Ok(new { message = "Contenido eliminado de la lista de deseos con éxito" });
        }

       [HttpPut("actualizar/{usuario}/{titulo}")]
public async Task<IActionResult> ActualizarContenidoEnListaDeseo(string usuario, string titulo)
{
    try
    {
        // Leer el cuerpo de la solicitud
        using var reader = new StreamReader(Request.Body);
        var body = await reader.ReadToEndAsync();

        if (string.IsNullOrEmpty(body))
        {
            return BadRequest(new { message = "El cuerpo de la solicitud no puede estar vacío." });
        }

        // Intentar parsear el JSON
        JObject jObject;
        try
        {
            jObject = JObject.Parse(body);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "El cuerpo de la solicitud tiene un formato JSON inválido.", details = ex.Message });
        }

        // Obtener el estado desde el JSON
        var estado = jObject["estado"]?.ToString();
        if (string.IsNullOrEmpty(estado))
        {
            return BadRequest(new { message = "El estado es requerido en el cuerpo de la solicitud." });
        }

        // Validar el estado
        var estadosValidos = new[] { "viendo", "porver", "visto" };
        if (!estadosValidos.Contains(estado.ToLower()))
        {
            return BadRequest(new { message = $"El estado '{estado}' no es válido. Los estados válidos son: {string.Join(", ", estadosValidos)}." });
        }

        // Cargar las personas y buscar al usuario
        var personas = CargarPersonas();
        var persona = personas.FirstOrDefault(p => p.Usuario == usuario);

        if (persona == null)
        {
            return NotFound(new { message = "Usuario no encontrado." });
        }

        // Buscar el contenido en la lista de deseos
        var contenido = persona.ListaDeseo.FirstOrDefault(c => c.Titulo == titulo);

        if (contenido == null)
        {
            return NotFound(new { message = "Contenido no encontrado en la lista de deseos." });
        }

        // Actualizar el estado del contenido
        contenido.Estado = estado;

        // Guardar los cambios en el archivo JSON
        var json = JsonConvert.SerializeObject(personas, Formatting.Indented, new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.Auto
        });

        await System.IO.File.WriteAllTextAsync(archivoJson, json);

        return Ok(new { message = "Estado del contenido actualizado con éxito." });
    }
    catch (Exception ex)
    {
        // Manejar errores no controlados
        return StatusCode(500, new { message = "Error al modificar el contenido. Por favor, inténtalo de nuevo.", details = ex.Message });
    }
}


        private List<Persona> CargarPersonas()
{
    if (!System.IO.File.Exists(archivoJson))
    {
        return new List<Persona>();
    }

    try
    {
        var json = System.IO.File.ReadAllText(archivoJson);
        return JsonConvert.DeserializeObject<List<Persona>>(json, new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.Auto
        }) ?? new List<Persona>(); // Asegúrate de que no sea nulo
    }
    catch (JsonException ex)
    {
        // Manejo de errores de deserialización
        Console.WriteLine("Error al deserializar el archivo JSON: " + ex.Message);
        return new List<Persona>(); // Retorna una lista vacía en caso de error
    }
}
    }
}

