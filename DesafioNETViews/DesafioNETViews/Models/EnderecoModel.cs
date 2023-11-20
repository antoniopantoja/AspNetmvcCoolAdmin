using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Description;

namespace DesafioNETViews.Models
{

    public class EnderecoModel
    {
        public int LogradouroId { get; set; }
        public string Cep { get; set; }
        public string Logradura { get; set; }
        public string Bairro { get; set; }
        public int Numero { get; set; }
        public string Complemento { get; set; }
        public string Uf { get; set; }
        public string Cidade { get; set; }
    }

}