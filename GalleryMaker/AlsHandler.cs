using System;
using System.Diagnostics;
using System.Web;

namespace GalleryMaker
{

    public class UrlPath : IHttpModule
    {
        public void Init(HttpApplication app)
        {
            app.BeginRequest += _BeginRequest;
            app.EndRequest += _EndRequest;
            app.LogRequest += _LogRequest;
        }

        public void Dispose()
        {

        }

        private void _LogRequest(object sender, System.EventArgs e)
        {
            Debug.WriteLine("آیتم با موفقیت لاگ شد ");
        }
        void _BeginRequest(object sender, EventArgs e)
        {

            HttpApplication app = (HttpApplication)sender;
            app.Context.Items["start"] = DateTime.Now;

            if (app.Context.Request.RawUrl.ToLower().Contains("tours_list.aspx"))
            {
                app.Context.RewritePath(app.Context.Request.RawUrl.ToLower().Replace("tours_list.aspx", "tours_cat.aspx"));
            }

        }
        void _EndRequest(object sender, EventArgs e)
        {
            HttpApplication app = (HttpApplication)sender;
            string log = (DateTime.Now - DateTime.Parse(app.Context.Items["start"].ToString())).ToString();
            Debugger.Log(0, "duration", "request took " + log + Environment.NewLine);

        }
    }

    public class AlsHandler : IHttpHandler
    {
        //Notice ProcessRequest is the only method
        //exposed by the IHttpHandler
        public void ProcessRequest(HttpContext context)
        {
            HttpResponse response = context.Response;
            HttpRequest request = context.Request;

            response.Write("Every Page has a some text like this");
        }

        //By calling IsReusable, an HTTP factory can query a handler to 
        //determine whether the same instance can be used to service 
        //multiple requests 
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }

    //public class NewHandler : IRouteHandler
    //{
    //    public IHttpHandler GetHttpHandler(RequestContext requestContext)
    //    {
            
    //    }
    //}
}