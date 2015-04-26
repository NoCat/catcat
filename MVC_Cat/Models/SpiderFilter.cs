using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC_Cat
{
    public class SpiderFilter : System.Web.Mvc.ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            var http = filterContext.HttpContext;
            var agent = http.Request.UserAgent.ToLower();
            if (agent != null)
            {
                if (agent.Contains("baiduspider") || agent.Contains("googlebot")|| agent.Contains("360spider") )
                {
                    filterContext.RouteData.Values.Add("isSpider", true);
                }
            }
            base.OnActionExecuting(filterContext);
        }
    }
}