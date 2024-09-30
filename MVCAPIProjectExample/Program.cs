using Microsoft.EntityFrameworkCore;
using System.Configuration;
using tafriAPI.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddTransient<tafriAPI.Models.IEmailSender, tafriAPI.Models.EmailSender>();


//builder.Services.AddTransient(IEmailSender, EmailSender)();

builder.Services.AddControllers();


//Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
       policy => policy
            .WithOrigins("https://localhost:7119")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Add your React app's origin
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// http client
builder.Services.AddHttpClient();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<tafriAPI.Models.ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 38))));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty; // Optional: Set the root path for Swagger UI
    });
}

// for cors

//app.UseCors("AllowSpecificOrigins");
app.UseCors();  


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
