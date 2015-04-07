using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_Cat.Controllers
{
    public class UpdateController : Controller
    {
        //
        // GET: /Update/

        public ActionResult Index()
        {
            var user = Session["user"] as MPUser;
            if (user == null || user.Authority != UserAuthorities.Administrator)
            {
                return HttpNotFound();
            }

            var res = DB.SExecuteReader("select id,url from image");
            foreach (var item in res)
            {
                string url = (string)item[1];

                try
                {
                    var uri = new Uri(url);
                    var host = uri.Host;
                    DB.SExecuteNonQuery("update image set host=? where id=?", host, item[0]);
                }
                catch { }
            }
            return Content("update Complete!");
        }

    }
}
