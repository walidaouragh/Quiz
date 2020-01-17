using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Quiz.API.DbContext;
using Quiz.API.Models;
using Quiz.API.Repositories;
using Quiz.API.Repositories.AdminRepository;
using Quiz.API.Repositories.AnswerRepository;
using Quiz.API.Repositories.QuestionRepository;
using Quiz.API.Repositories.User;
using Quiz.API.Repositories.UserAnswerRepository;

namespace Quiz.API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<QuizDbContext>(opt => opt.UseSqlServer(_configuration.GetSection("Quiz")["ConnStr"]));
            services.AddCors();
            services.AddAutoMapper(typeof(Startup));
            /*services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);*/
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddScoped<IQuizRepository, QuizRepository>();
            services.AddScoped<IAnswerRepository, AnswerRepository>();
            services.AddScoped<IUserAnswerRepository, UserAnswerRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IQuestionRepository, QuestionRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Quiz API",
                    Description = "A simple example ASP.NET Core Web API"
                });
            });
            SetUpJwtTokens(services);

            //we have to add this when we use IdentityUser and IdentityDbContext
            services.AddDefaultIdentity<Admin>()
                .AddEntityFrameworkStores<QuizDbContext>();


            RegisterServicesInOtherAssemblies(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, QuizDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            Seed.SeedDatabase(context);
            app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:4200"));
            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Quiz API V1");
                c.RoutePrefix = "swagger/ui";
            });
        }

        //Using Scrutor to automatically register your services with the ASP.NET Core, so no need to add like services.Addscope.........
        private static void RegisterServicesInOtherAssemblies(IServiceCollection services)
        {
            services.Scan(scan => scan
                .FromExecutingAssembly()
                .FromApplicationDependencies(dep =>
                    dep.FullName.StartsWith("Movie.API", StringComparison.CurrentCultureIgnoreCase))
                .AddClasses()
                .AsImplementedInterfaces()
                .WithScopedLifetime()
            );
        }

        private void SetUpJwtTokens(IServiceCollection services)
        {
            // ===== Add Jwt Authentication ========
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = _configuration.GetValue<string>("AuthConfig:development:JwtIssuer"),
                        ValidAudience = _configuration.GetValue<string>("AuthConfig:development:JwtIssuer"),
                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                Encoding.UTF8.GetBytes(
                                    _configuration.GetValue<string>("AuthConfig:development:secret"))),
                        ClockSkew = TimeSpan.Zero, // remove delay of token when expire
                        RequireExpirationTime = false,
                    };
                });
        }
    }
}