# AspNetmvcCoolAdmin
Scenario
The company is expanding its business and one of the technology team's missions is to create a Customer registration functionality.
Front must be developed in Asp.net with MVC, Razor, Javascript and Html (if necessary).
Back must be a REST API in C#.
Requirements
• It must be possible to create, update, view and remove Client
o Customer registration must only contain the following fields:
 Name;
 email
 Logo;
 Public place;
• A client can contain several public places;
 A customer cannot register twice with the same email address;

Cenário
a empresa está expandindo seus negócios e uma das missões do time de tecnologia é criar uma funcionalidade de cadastro de Clientes.
O Front deve ser desenvolvido em Asp.net com MVC, Razor, Javascript e Html(se necessário).
O Back deve ser uma API REST em C#.
Requisitos
•	Deve ser possível criar, atualizar, visualizar e remover Cliente
o	O cadastro dos clientes deve conter apenas os seguintes campos:
	Nome;
	e-mail
	Logotipo;
	Logradouro;
•	Um cliente pode conter vários logradouros;
	Um cliente não pode se registrar duas vezes com o mesmo endereço de e-mail;

## Especificação tecnica

Challenge in ASP.NET Mvc using Bootstrap 4.1 CoolAdmin Template framework Front was developed in Asp.net with MVC, Javascript and Html.
model is available here: https://colorlib.com/polygon/cooladmin/index.html

Desafio em ASP.NET Mvc utilizando framework Bootstrap 4.1 CoolAdmin Template O Front foi desenvolvido em Asp.net com MVC, Javascript e Html.
modelo esta disponível aqui: https://colorlib.com/polygon/cooladmin/index.html 

.NET Framework 4.7.2 MVC 

API REST Core 6.0 
### Configuração

Abra o arquivo [Web.config](https://github.com/antoniopantoja/AspNetmvcCoolAdmin/blob/main/DesafioNETViews/DesafioNETViews/Web.config) e coloque se for ambiente local com a API então hocalhost com a porta se for publicado e so coloca url 

	<add key="Cliente-Gravar" value=" /api/Cliente/Gravar" />
	<add key="Endereco-Gravar" value=" /api/Endereco/Gravar?clienteId=" />
	<add key="Cliente-Listar" value=" /api/Cliente/Listar" />
	<add key="Endereco-Listar" value=" /api/Endereco/Listar?clienteId=" />
	<add key="Cliente-Atualizar" value=" /api/Cliente/Atualizar" />
	<add key="Endereco-Atualizar" value=" /api/Endereco/Atualizar?clienteId=" />
	<add key="Cliente-Deletar" value=" /api/Cliente/Deletar" />
	<add key="Endereco-Deletar" value=" /api/Endereco/Deletar?LogradouroId=" />
	<add key="Cliente-Dashboard" value=" /api/Dashboard/Listar" />


### Preview

<img align="center" alt="React and React Native" src="https://github.com/antoniopantoja/antoniopantoja/blob/main/assets/DESAFIO.NET.gif"/>

### Licença

CoolAdmin is licensed under The MIT License (MIT). Which means that you can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the final products. But you always need to state that Colorlib is the original author of this template.

CoolAdmin é licenciado sob a Licença MIT (MIT). O que significa que você pode usar, copiar, modificar, fundir, publicar, distribuir, sublicenciar e/ou vender cópias do produtos finais. Mas você sempre precisa afirmar que Colorlib é o original autor deste modelo.

