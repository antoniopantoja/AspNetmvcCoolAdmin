using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace DesafioNETViews.Models
{
    public class SessionModel
    {
        public static int? ClienteId
        {
            get
            {
                return Convert.ToInt32(HttpContext.Current.Session["ClienteId"]);
            }
            set
            {
                HttpContext.Current.Session["ClienteId"] = value;
            }
        }

    }

}