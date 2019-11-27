using System;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Quiz.API.DbContext;
using Quiz.API.Repositories;
using Quiz.API.Repositories.AnswerRepository;
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddScoped<IQuizRepository, QuizRepository>();
            services.AddScoped<IAnswerRepository, AnswerRepository>();
            services.AddScoped<IUserAnswerRepository, UserAnswerRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Quiz API",
                    Description = "A simple example ASP.NET Core Web API"
                });
            });


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
    }
}