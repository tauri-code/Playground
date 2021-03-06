﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Owin;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace owin
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseOwin(pipeline => pipeline(next => context => {
                foreach(string key in context.Keys){
                    Console.WriteLine($"{key}: {context[key]}");
                }
                return next(context);
            }));

            // alternative
            app.Use((context, next) => {
                OwinEnvironment environment = new OwinEnvironment(context);
                IDictionary<string, string[]> headers = (IDictionary<string, string[]>)environment.Single(item => item.Key == "owin.RequestHeaders").Value;
                
                return next();
            });

            app.Use((context, next) => {
                OwinEnvironment environment = new OwinEnvironment(context);
                OwinFeatureCollection features = new OwinFeatureCollection(environment);
                IDictionary<string, string[]> headers = (IDictionary<string, string[]> )features.Environment["owin.RequestHeaders"];
                
                return next();
            });

            app.UseMvc();
        }
    }
}
