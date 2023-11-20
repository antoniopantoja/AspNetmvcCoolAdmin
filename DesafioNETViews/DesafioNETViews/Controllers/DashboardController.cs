using DesafioNETViews.Models;
using DesafioNETViews.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace DesafioNETViews.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard
        public ActionResult Index()
        {
            return View("~/Views/Dashboard/Index.cshtml");
        }

        [HttpPost]
        public async Task<string> ClienteDashboardAsync()
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    var jsonBytes = new StringContent("", Encoding.UTF8, "application/json");
                    HttpResponseMessage clienteDashboard = await client.PostAsync(System.Configuration.ConfigurationManager.AppSettings["Cliente-Dashboard"], jsonBytes);

                    if (clienteDashboard.IsSuccessStatusCode)
                    {
                        DashboardVm retornoDashboard = await clienteDashboard.Content.ReadAsAsync<DashboardVm>();
                        return JsonConvert.SerializeObject(retornoDashboard, Formatting.Indented);
                    }
                    else
                    {
                        Console.WriteLine("A requisição falhou com o código de status: " + clienteDashboard.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                }
            }
            return JsonConvert.SerializeObject(new {}, Formatting.Indented);
        }

    }
}