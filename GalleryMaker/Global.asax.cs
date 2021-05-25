using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using GalleryMaker;

[assembly:PreApplicationStartMethod(typeof(MvcApplication), "RegisterCustomModule")]
namespace GalleryMaker
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
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

           
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //var persianCulture = new System.Globalization. PersianCulture();
            //Thread.CurrentThread.CurrentCulture = persianCulture;
            //Thread.CurrentThread.CurrentUICulture = persianCulture;
        }




    }
}
