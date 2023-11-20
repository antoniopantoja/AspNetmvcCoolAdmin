var addresses = []; // Array para armazenar os objetos de endereço
var cliente = []; // Array para armazenar os objetos de cliente

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        const img = URL.createObjectURL(input.files[0])
        reader.onload = function (e) {
            file = e.target.result;
            $("#iconFoto").attr('style', 'display:none !important;')
            $('#containerImg').css("background-image", "url(" + img + ")")
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function salvar() {

    let outERRO = 0;
    let MessagemERRO = "";

    var form = capturarAtributos($('#formCadastroCliente'));

    if ($("#Logotipo").val() != "") {
        img = file.split('base64,');
        form.Logotipo = img[1];
    } else {
        form.Logotipo = "";
    }

    if (form.Logotipo === "" && cliente.length == 0) {
        outERRO = 1;
        MessagemERRO += "O LogoTipo &eacute obrigat&oacuterio!<br>";
    }
    
    if (form.nome === " ") {
        outERRO = 2;
        MessagemERRO += "O campo Nome &eacute obrigat&oacuterio!<br>";
    }

    if (form.email.length < 11 && form.email !== "") {
        outERRO = 3;
        MessagemERRO += "O campo E-mail nao foi preenchido corretamente!<br>";
    }

    if (addresses.length == 0) {
        outERRO = 4;
        MessagemERRO += "Adicione um Endere&ccedilo &eacute obrigat&oacuterio!<br>";
    }

    if (outERRO === 0) {

        $.ajax({
            url: "/Cliente/ClienteAsync/",
            data: {cliente: form,
                   Endereco: addresses},
            type: "post",
            dataType: "json",
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Erro({ out_msg: "ERRO DE SOLICITAÇÃO." });
            },
            success: function (data) {
                if (data.Code == 0) {
                    Sucesso({ out_msg: data.Message });
                    $("input").val('')
                    setTimeout(function () {
                        window.location = window.location.origin + '/Cliente';
                    }, 1800);

                } else {
                    Erro({ out_msg: data.Message });
                }
            }
        });

    }
    else {
        Erro({ out_msg: MessagemERRO });
        return;
    }


}

// Função para adicionar um endereço ao array
function adicionarEndereco() {

    let outERRO = 0;
    let MessagemERRO = "";

    var novoEndereco = {
        cep: $("#cep").val(),
        logradura: $("#logradura").val(),
        bairro: $("#bairro").val(),
        Numero: $("#Numero").val(),
        Complemento: $("#Complemento").val(),
        uf: $("#uf").val(),
        cidade: $("#cidade").val()
    };

    if (novoEndereco.cep === "") {
        outERRO = 1;
        MessagemERRO += "O campo Cep &eacute obrigat&oacuterio!<br>";
    }

    if (novoEndereco.logradura === "") {
        outERRO = 2;
        MessagemERRO += "O campo Endere&ccedilo &eacute obrigat&oacuterio!<br>";
    }

    if (novoEndereco.bairro === "") {
        outERRO = 3;
        MessagemERRO += "O campo Bairro &eacute obrigat&oacuterio!<br>";
    }

    if (novoEndereco.Numero === "") {
        outERRO = 4;
        MessagemERRO += "O campo Numero &eacute obrigat&oacuterio!<br>";
    }

    if (novoEndereco.uf === "-1") {
        outERRO = 5;
        MessagemERRO += "O campo UF &eacute obrigat&oacuterio!<br>";
    }

    if (novoEndereco.cidade === "-1") {
        outERRO = 6;
        MessagemERRO += "O campo Cidade &eacute obrigat&oacuterio!<br>";
    }


    if (outERRO === 0) {
        if (novoEndereco.Complemento.length <= 0) {
            novoEndereco.Complemento = " ";
        }
        addresses.push(novoEndereco);
        exibirEnderecos();
    }
    else {

        Erro({ out_msg: MessagemERRO });

    }
}

// Função para remover um endereço do array
function removerEndereco(index) {
    DeletarEndereco(addresses[index]);
    addresses.splice(index, 1);
    exibirEnderecos();
}
// Limpa Campos Endereço
function limpa_formulario_cep() {
    $("#cep").val("");
    $("#logradura").val("");
    $("#bairro").val("");
    $("#Numero").val("");
    $("#Complemento").val("");
    $("#uf").val("-1");
    $("#cidade").html("<option value='-1'>Selecione</option>");
}
// Função para exibir os endereços na lista
function exibirEnderecos() {
    var addressList = document.getElementById("addressList");
    addressList.innerHTML = ""; // Limpa a lista antes de recriá-la

    addresses.forEach(function (address, index) {
        var td = `
            <tr>
            <td>${address.cep}</td>
            <td>${address.logradura}</td>
            <td>${address.bairro}</td>
            <td>${address.Numero}</td>
            <td>${address.Complemento}</td>
            <td>${address.uf}</td>
            <td>${address.cidade}</td>
            <td style="text-align: center">
                <a title="Remover" role="button" class="btn btn-danger" onclick="removerEndereco(${index})">
                    <span class="fa fa-trash" style="padding-bottom: 5px;padding-top: 5px;color: #fff;"></span>
                </a>
            </td>
            </tr>
        `;
        //addressList.appendChild(td);
        $("#addressList").append(td);
    });
    limpa_formulario_cep();
}

function aplicarMascaraNumerica(input) {
    var valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    input.value = valor;
}

function aplicarMascaraLetras(input) {
    var valor = input.value.replace(/[^A-Za-z\s.,!?]/g, ''); // Remove todos os caracteres que não são letras
    input.value = valor;
}

function Listar() {
    $("#formCadastroCliente").hide(500);
    //$("#formTable").hide(500);
    $("#formTable").html(`
        <table class= "table table-borderless table-striped table-earning">
                    <thead>
                        <tr>
                            <th style="width: 12%;">Logotipo</th>
                            <th style="width: 22%;">Nome</th>
                            <th style="width: 22%;">E-mail</th>
                            <th style="text-align: center;width: 20%;">Op&ccedil&otildees</th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>
    `);

    var form = capturarAtributos($('#formCadastroCliente'));
    form.Logotipo = " ";
    form.ClienteId = 0;

    $.ajax({
        url: "/Cliente/ListarAsync/",
        data: { cliente: form },
        type: "post",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Erro({ out_msg: "ERRO DE SOLICITAÇÃO." });
        },
        success: function (data) {
            if (data.length > 0) {
                cliente = data;
                var tbody = ``;
                for (var i = 0; data.length > i;i++) {
                    tbody += `
                          <tr>
                            <td>
                                <div class="avatar-wrap">
                                    <div class="avatar">
                                        <img src="${data[i].Logotipo}" alt="${data[i].Nome}">
                                    </div>
                                </div>
                            </td>
                            <td>${data[i].Nome}</td>
                            <td class="email-cell">${data[i].Email}</td>

                            <td style="text-align: center">
                                <a title="Editar" role="button" class="btn btn-primary nbBrue" onclick="editar(${i})">
                                    <span class="fa fa-pencil" style="padding-bottom: 5px;padding-top: 5px;color: #fff;"></span>
                                </a>
                                <a title="Excluir" role="button" class="btn btn-danger" onclick="DeletarCliente(${i})">
                                    <span class="fa fa-trash" style="padding-bottom: 5px;padding-top: 5px;color: #fff;"></span>
                                </a>
                            </td>
                        </tr>
                `;
                }
                $("#tbody").html(tbody);
            } else {
                Erro({ out_msg: data.Message });
            }
        }
    });

}

function editar(index) {
    var i = cliente[index];
            addresses = [];
    $("#formTable").html(`
   <table class="table table-borderless table-striped table-earning">
        <thead>
            <tr>

                <th>CEP</th>
                <th>Endere&ccedilo</th>
                <th>Bairro</th>
                <th>Numero</th>
                <th>Complemento</th>
                <th>UF</th>
                <th>Cidade</th>
                <th>Op&ccedil&otildees</th>
            </tr>
        </thead>
        <tbody id="addressList">
        </tbody>
    </table>
    `);
    $("#formCadastroCliente").show(500);
    $('#containerImg').css("background-image", "url(" + i.Logotipo + ")")
    $('#nome').val(i.Nome);
    $('#email').val(i.Email);
    var form = capturarAtributos($('#formCadastroCliente'));
    form.ClienteId = i.ClienteId;
    $.ajax({
        url: "/Cliente/ListarEnderecoAsync/",
        data: { cliente: form },
        type: "post",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Erro({ out_msg: "ERRO DE SOLICITAÇÃO." });
        },
        success: function (data) {
            if (data.length > 0) {
                var tbody = ``;
                for (var i = 0; data.length > i; i++) {

                    var novoEndereco = {
                        logradouroId: `${data[i].LogradouroId}`,
                        cep: `${data[i].Cep}`,
                        logradura: `${data[i].Logradura}`,
                        bairro: `${data[i].Bairro}`,
                        Numero: `${data[i].Numero}`,
                        Complemento: `${data[i].Complemento}`,
                        uf: `${data[i].Uf}`,
                        cidade: `${data[i].Cidade}`
                    };

                    addresses.push(novoEndereco);
                    exibirEnderecos();
                }
            } else {
                Erro({ out_msg: data.Message });
            }
        }
    });
}

function DeletarCliente(index) {
    var i = cliente[index];
    $.ajax({
        url: "/Cliente/DeletarClienteAsync/",
        data: { cliente: i },
        type: "post",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Erro({ out_msg: "ERRO DE SOLICITAÇÃO." });
        },
        success: function (data) {
            if (data.Code == 0) {
               
                Sucesso({ out_msg: data.Message });
                setTimeout(function () {
                    window.location = window.location.origin + '/Cliente';
                    Listar();
                }, 1800);
                
            } else {
                Erro({ out_msg: data.Message });
            }
        }
    });


}

function DeletarEndereco(form) {

    $.ajax({
        url: "/Cliente/DeletarEnderecoAsync/",
        data: { Endereco: form },
        type: "post",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Erro({ out_msg: "ERRO DE SOLICITAÇÃO." });
        },
        success: function (data) {
            if (data.Code == 0) {
                Sucesso({ out_msg: data.Message });
                setTimeout(function () {
                    $('#sucesso').modal('toggle');
                }, 1800);              
            } else {
                Erro({ out_msg: data.Message });
            }
        }
    });


}