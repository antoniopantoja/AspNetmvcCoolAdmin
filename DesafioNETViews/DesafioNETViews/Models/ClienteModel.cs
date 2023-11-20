using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace DesafioNETViews.Models
{
    public class ClienteModel
    {
        public int ClienteId { get; set; }
        public string Logotipo { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }

    }

}