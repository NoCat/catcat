using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Net;

namespace MVC_Cat.Controllers
{
    public class UpdateController : Controller
    {
        //
        // GET: /Update/

        public ActionResult Index()
        {
            var res = DB.SExecuteReader("select id from file");
            var wc = new WebClient();
            var host=Tools.GetSetting("WnsHost");
            foreach (var item in res)
            {
                var id = Convert.ToInt32(item[0]);
                var file = new MPFile(id);
                wc.DownloadString(host+string.Format("/ajax/from-miaopass?token=E020C75C-710B-842D-5A43-E38795611CD7&key={0}.jpg&width={1}&height={2}",file.MD5,file.Width,file.Height));
            }
            return Content("ok");
        }

    }
}
