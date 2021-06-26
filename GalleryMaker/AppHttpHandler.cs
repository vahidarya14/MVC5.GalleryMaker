using System.Web;

namespace PostcardMaker
{
    public class AppHttpHandler : IHttpHandler
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