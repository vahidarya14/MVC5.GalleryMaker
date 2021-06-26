using System;
using System.Diagnostics;
using System.Web;

namespace PostcardMaker
{
    public class AppHttpModule : IHttpModule
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
            if (app.Context.Items.Contains("start"))
            {
                string log = (DateTime.Now - DateTime.Parse(app.Context.Items["start"].ToString())).ToString();
                Debugger.Log(0, "duration", "request took " + log + Environment.NewLine);
            }
                

        }
    }
}