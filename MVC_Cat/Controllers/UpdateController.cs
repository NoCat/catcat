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
                wc.DownloadString(host+string.Format("/ajax/from-miaopass?token={3}&md5={0}&width={1}&height={2}",file.MD5,file.Width,file.Height,Tools.WnsAccessToken));
            }
            return Content("ok");
        }

    }
}
