using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace MVC_Cat.Controllers
{
    public class UpdateController : Controller
    {
        //
        // GET: /Update/

        public ActionResult Index()
        {
            //var user = Session["user"] as MPUser;
            //if (user.Authority != UserAuthorities.Administrator)
            return HttpNotFound();

            //var res = DB.SExecuteReader("select md5 from file");
            //foreach (var item in res)
            //{
            //    string md5 = (string)item[0];
            //    OssFile.Move(md5, md5 + ".jpg");
            //    OssFile.Move(md5 + "_fw236", md5 + "_fw236" + ".jpg");
            //    OssFile.Move(md5 + "_fw658", md5 + "_fw658" + ".jpg");
            //    OssFile.Move(md5 + "_fw78", md5 + "_fw78" + ".jpg");
            //    OssFile.Move(md5 + "_sq236", md5 + "_sq236" + ".jpg");
            //    OssFile.Move(md5 + "_sq75", md5 + "_sq75" + ".jpg");               
            //}
            //return Content("ok");
        }

    }
}
