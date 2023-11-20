using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesafioNETViews.ViewModels
{
    public class DashboardVm
    {
        public int ClientesCadastrados { get; set; }
        public int RegistroAlterados { get; set; }
        public int ClientesExcluIdos { get; set; }
        public int LogsRequisicao { get; set; }
    }

}