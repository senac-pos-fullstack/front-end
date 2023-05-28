window.onload = function () {
    buscar();
};

async function buscar(produto = "", armazem = "") {
    //Mudar endpoint para webservice
    const url =
        "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/transacoes.json";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarTransacoes(json.TRANSACOES);
        carregarSelects(json.TIPOS, json.EMPRESAS, json.ARMAZENS, json.USUARIOS)
    }
}

function carregarTransacoes(transacoes) {
    const tbody = document.getElementById("transacoes");

    transacoes.forEach(transacao => {
        const tr = document.createElement("tr");

        tr.appendChild(criarTd(transacao.ID_TRANSACAO));
        //TD TIPO
        tr.appendChild(criarTd(transacao.TXT_TIPO));
        //TD PRODUTO
        tr.appendChild(criarTd(transacao.TXT_PRODUTO));
        //TD QUANTIDADE
        tr.appendChild(criarTd(transacao.NUM_QUANTIDADE, true));
        //TD EMPRESA
        tr.appendChild(criarTd(transacao.TXT_EMPRESA));
        //TD ARMAZEM
        tr.appendChild(criarTd(transacao.TXT_ARMAZEM));
        //TD DESCRICAO 
        tr.appendChild(criarTdDescricao(transacao.ID_PRODUTO, transacao.TXT_PRODUTO, transacao.TXT_DESCRICAO));
        //TD DATA
        tr.appendChild(criarTd(transacao.DAT_TRANSACAO));
        //TD USUARIO
        tr.appendChild(criarTd(transacao.TXT_USUARIO));

        tbody.appendChild(tr);
    });
}

function carregarSelects(tipos, empresas, armazens, usuarios) {
    const tipoSelect = document.getElementById("tipoSelect");
    const empresaSelect = document.getElementById("empresaSelect");
    const armazemSelect = document.getElementById("armazemSelect");
    const usuarioSelect = document.getElementById("usuarioSelect");

    tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.ID_TIPO;
        option.innerText = tipo.TXT_NOME;

        tipoSelect.appendChild(option);
    });

    empresas.forEach(empresa => {
        const option = document.createElement("option");
        option.value = empresa.ID_EMPRESA;
        option.innerText = empresa.TXT_NOME;

        empresaSelect.appendChild(option);
    });

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.ID_ARMAZEM;
        option.innerText = armazem.TXT_NOME;

        armazemSelect.appendChild(option);
    });

    usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.ID_USUARIO;
        option.innerText = usuario.TXT_USUARIO;

        usuarioSelect.appendChild(option);
    });

    //SELECT WITH SEARCH
    dselect(tipoSelect, { search: true });
    dselect(empresaSelect, { search: true });
    dselect(armazemSelect, { search: true });
    dselect(usuarioSelect, { search: true });
}

