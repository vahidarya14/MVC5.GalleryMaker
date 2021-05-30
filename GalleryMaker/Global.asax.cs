using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using PostcardMaker;

[assembly:PreApplicationStartMethod(typeof(MvcApplication), "RegisterCustomModule")]
namespace PostcardMaker
{
   
    public class MvcApplication : HttpApplication
    {
        public static void RegisterCustomModule()
        {
            RegisterModule(typeof(UrlPath));
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RegisterGlobalFilters(GlobalFilters.Filters);
            RegisterRoutes(RouteTable.Routes);
            RegisterBundles(BundleTable.Bundles);

           
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //var persianCulture = new System.Globalization. PersianCulture();
            //Thread.CurrentThread.CurrentCulture = persianCulture;
            //Thread.CurrentThread.CurrentUICulture = persianCulture;
        }


        static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
        static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
        static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/wwwroot/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/wwwroot/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/wwwroot/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/wwwroot/Scripts/bootstrap.js",
                "~/wwwroot/Scripts/respond.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));
        }

    }
}
