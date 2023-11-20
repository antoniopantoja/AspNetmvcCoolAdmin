
$(function () {

    var form = {
        ClienteId : 0,
        Logotipo : " ",
        Nome : " ",
        Email : " "
    };

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
                var tbody = ``;
                for (var i = 0; data.length > i; i++) {
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
                        </tr>
                `;
                }
                $("#tbody").html(tbody);
            } else {
                Erro({ out_msg: data.Message });
            }
        }
    });

    $.ajax({
        url: "/Dashboard/ClienteDashboardAsync/",
        type: "post",
        dataType: "json",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Erro({ out_msg: "ERRO DE SOLICITAÇÃO." });
        },
        success: function (data) {
            if (data != null) {
                $("#ClientesCadastrados").html(data.ClientesCadastrados);
                $("#RegistroAlterados").html(data.RegistroAlterados);
                $("#ClientesExcluIdos").html(data.ClientesExcluIdos);
                $("#LogsRequisicao").html(data.LogsRequisicao);
            } else {
                Erro({ out_msg: data.Message });
            }
        }
    });
});
