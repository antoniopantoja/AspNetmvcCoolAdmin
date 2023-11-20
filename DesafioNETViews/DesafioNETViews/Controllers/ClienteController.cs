using DesafioNETViews.Models;
using DesafioNETViews.ViewModels;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Net.Http.Formatting;
using System.Security.Policy;

namespace DesafioNETViews.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View("~/Views/Cliente/Index.cshtml");
        }

        [HttpPost]
        public async Task<string> ClienteAsync(ClienteModel cliente, List<EnderecoModel> Endereco)
        {
            if (SessionModel.ClienteId != 0)
                cliente.ClienteId = (int)SessionModel.ClienteId;

            if (cliente.Logotipo == null)
                cliente.Logotipo = "";

            string jsonContent = JsonConvert.SerializeObject(cliente);
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    var jsonBytes = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                    HttpResponseMessage clienteGravar;

                    if (cliente.ClienteId != 0)
                    {                      
                        clienteGravar = await client.PutAsync(System.Configuration.ConfigurationManager.AppSettings["Cliente-Atualizar"], jsonBytes);
                    }
                    else
                    {
                        clienteGravar = await client.PostAsync(System.Configuration.ConfigurationManager.AppSettings["Cliente-Gravar"], jsonBytes);
                    }

                    if (clienteGravar.IsSuccessStatusCode)
                    {
                        RetornoPostVm retornoCliente = await clienteGravar.Content.ReadAsAsync<RetornoPostVm>();

                        if (retornoCliente.Code == 0)
                        {   //Atualizar Endereço
                            List<EnderecoModel> enderecosFiltradosAtualizar = Endereco.Where(e => e.LogradouroId != 0).ToList();
                            if (enderecosFiltradosAtualizar.Count != 0) { 
                                jsonContent = JsonConvert.SerializeObject(enderecosFiltradosAtualizar);
                                try
                                {
                                    jsonBytes = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                                    HttpResponseMessage EnderecoGravar = await client.PutAsync(System.Configuration.ConfigurationManager.AppSettings["Endereco-Atualizar"] + cliente.ClienteId, jsonBytes);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                                }
                            }
                            //Inserir Endereço
                            List<EnderecoModel> enderecosFiltradosInserir = Endereco.Where(e => e.LogradouroId == 0).ToList();
                            if (enderecosFiltradosInserir.Count != 0)
                            {
                                jsonContent = JsonConvert.SerializeObject(enderecosFiltradosInserir);
                                try
                                {
                                    jsonBytes = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                                    HttpResponseMessage EnderecoGravar = await client.PostAsync(System.Configuration.ConfigurationManager.AppSettings["Endereco-Gravar"] + (SessionModel.ClienteId != 0 ? cliente.ClienteId : retornoCliente.Output), jsonBytes);
                                }
                                catch (Exception ex)
                                {
                                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                                }
                            }

                            SessionModel.ClienteId = 0;
                        }
                        return JsonConvert.SerializeObject(retornoCliente, Formatting.Indented);
                    }
                    else
                    {
                        Console.WriteLine("A requisição falhou com o código de status: " + clienteGravar.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                }
            }
            return JsonConvert.SerializeObject(cliente, Formatting.Indented);
        }

        [HttpPost]
        public async Task<string> ListarAsync(ClienteModel cliente)
        {

            string jsonContent = JsonConvert.SerializeObject(cliente);
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    var jsonBytes = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                    HttpResponseMessage clienteListar = await client.PostAsync(System.Configuration.ConfigurationManager.AppSettings["Cliente-Listar"], jsonBytes);

                    if (clienteListar.IsSuccessStatusCode)
                    {
                        List<ClienteModel> retornoCliente = await clienteListar.Content.ReadAsAsync<List<ClienteModel>>();
                        return JsonConvert.SerializeObject(retornoCliente, Formatting.Indented);
                    }
                    else
                    {
                        Console.WriteLine("A requisição falhou com o código de status: " + clienteListar.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                }
            }
            return JsonConvert.SerializeObject(cliente, Formatting.Indented);
        }

        [HttpPost]
        public async Task<string> ListarEnderecoAsync(ClienteModel cliente)
        {
            SessionModel.ClienteId = cliente.ClienteId;
            string jsonContent = JsonConvert.SerializeObject(cliente);
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    var jsonBytes = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                    HttpResponseMessage clienteListar = await client.PostAsync(System.Configuration.ConfigurationManager.AppSettings["Endereco-Listar"]+ cliente.ClienteId, jsonBytes);

                    if (clienteListar.IsSuccessStatusCode)
                    {
                        List<EnderecoModel> retornoEndereco = await clienteListar.Content.ReadAsAsync<List<EnderecoModel>>();
                        return JsonConvert.SerializeObject(retornoEndereco, Formatting.Indented);
                    }
                    else
                    {
                        Console.WriteLine("A requisição falhou com o código de status: " + clienteListar.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                }
            }
            return JsonConvert.SerializeObject(cliente, Formatting.Indented);
        }

        [HttpPost]
        public async Task<string> DeletarClienteAsync(ClienteModel cliente)
        {
            string jsonContent = JsonConvert.SerializeObject(cliente);

            var client = new RestClient(System.Configuration.ConfigurationManager.AppSettings["Cliente-Deletar"]);
            client.Timeout = -1;
            var request = new RestRequest(Method.DELETE);
            request.AddHeader("Content-Type", "application/json");
            var body = jsonContent;
            request.AddParameter("application/json", body, ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            RetornoPostVm retorno = JsonConvert.DeserializeObject<RetornoPostVm>(response.Content);

            return JsonConvert.SerializeObject(retorno, Formatting.Indented);
        }

        [HttpPost]
        public async Task<string> DeletarEnderecoAsync(EnderecoModel Endereco)
        {
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage deletarEndereco = await client.DeleteAsync(System.Configuration.ConfigurationManager.AppSettings["Endereco-Deletar"] + Endereco.LogradouroId);

                    if (deletarEndereco.IsSuccessStatusCode)
                    {
                        RetornoPostVm retornoEndereco = await deletarEndereco.Content.ReadAsAsync<RetornoPostVm>();
                        return JsonConvert.SerializeObject(retornoEndereco, Formatting.Indented);
                    }
                    else
                    {
                        Console.WriteLine("A requisição falhou com o código de status: " + deletarEndereco.StatusCode);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Ocorreu um erro: " + ex.Message);
                }
            }
            return JsonConvert.SerializeObject(Endereco, Formatting.Indented);
        }

    }
}