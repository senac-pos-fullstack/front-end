window.onload = function () {
    buscarTipos();
    buscarProdutos();
    buscarArmazens();

    //DEFINE OS TIPOS PARA CHAMAR A FUNCAO
    let tipoSelect = document.getElementById("tipoSelect");
    tipoSelect.addEventListener('change', () => tipoChange(tipoSelect));

    const produtoSelect = document.getElementById("produtoSelect");
    produtoSelect.addEventListener('change', () => produtoChange(produtoSelect.value));

    const empresaVerTodas = document.getElementById("empresaVerTodas");
    empresaVerTodas.addEventListener('click', () => buscarEmpresas());

    const transacao = document.getElementById("transacao");
    transacao.addEventListener('click', () => realizarTransacao());

    const armazemSelect = document.getElementById("armazemSelect");
    armazemSelect.addEventListener('change', () => buscarQuantidadeAtual());

    const armazemSaidaSelect = document.getElementById("armazemSaidaSelect");
    armazemSaidaSelect.addEventListener('change', () => buscarQuantidadeAtual());
};

function validarCampos() {
    const produtoSelect = document.getElementById("produtoSelect").value;
    const validacaoProduto = document.getElementById("validacaoProduto");
    const quantidade = document.getElementById("quantidade").value;
    const validacaoQuantidade = document.getElementById("validacaoQuantidade");
    const preco = document.getElementById("preco").value;
    const validacaoPreco = document.getElementById("validacaoPreco");
    const empresaSelect = document.getElementById("empresaSelect").value;
    const validacaoEmpresa = document.getElementById("validacaoEmpresa");
    const armazemSaidaSelect = document.getElementById("armazemSaidaSelect").value;
    const validacaoArmazemSaida = document.getElementById("validacaoArmazemSaida");
    const armazemSelect = document.getElementById("armazemSelect").value;
    const validacaoArmazem = document.getElementById("validacaoArmazemSaida");

    const quantidadeAtual = document.getElementById("quantidadeAtual").value;
    const validacaoQuantidadeAtual = document.getElementById("validacaoQuantidadeAtual");

    if (tipoEntrada) {
        if (!validarSelect(produtoSelect, validacaoProduto)
            || !validarNumero(quantidade, validacaoQuantidade)
            || !validarNumero(preco, validacaoPreco)
            || !validarSelect(empresaSelect, validacaoEmpresa)
            || !validarSelect(armazemSelect, validacaoArmazem)) {
            return false;
        }
    } else if (tipoSaida) {
        if (!validarSelect(produtoSelect, validacaoProduto)
            || !validarNumero(quantidade, validacaoQuantidade)
            || !validarQuantidade(quantidadeAtual, quantidade, validacaoQuantidadeAtual)
            || !validarSelect(armazemSelect, validacaoArmazem)) {
            return false;
        }
    } else if (tipoTransacao) {
        if (!validarSelect(produtoSelect, validacaoProduto)
            || !validarNumero(quantidade, validacaoQuantidade)
            || !validarQuantidade(quantidadeAtual, quantidade, validacaoQuantidadeAtual)
            || !validarSelect(armazemSaidaSelect, validacaoArmazemSaida)
            || !validarSelect(armazemSelect, validacaoArmazem)
            || !validarSelectDiferente(armazemSaidaSelect, armazemSelect, validacaoArmazem)) {

            return false;
        }
    }

    return true;
}

let tipoEntrada = true;
let tipoSaida = false;
let tipoTransacao = false;
function tipoChange(tipo) {
    const tipoTexto = tipo.options[tipo.selectedIndex].text.toLowerCase()

    let entradas = document.querySelectorAll('.tipoEntrada');
    let transferencias = document.querySelectorAll('.tipoTransferencia');

    if (tipoTexto.includes("entrada")) {
        tipoEntrada = true;
        tipoSaida = false;
        tipoTransacao = false;
        entradas.forEach(entrada => {
            entrada.style.display = "block";
        });
        transferencias.forEach(transferencia => {
            transferencia.style.display = "none";
        });
    } else if (tipoTexto.includes("saída")) {
        tipoEntrada = false;
        tipoSaida = true;
        tipoTransacao = false;
        entradas.forEach(entrada => {
            entrada.style.display = "none";
        });
        transferencias.forEach(transferencia => {
            transferencia.style.display = "none";
        });
    } else if (tipoTexto.includes("transferência")) {
        tipoEntrada = false;
        tipoSaida = false;
        tipoTransacao = true;
        entradas.forEach(entrada => {
            entrada.style.display = "none";
        });
        transferencias.forEach(transferencia => {
            transferencia.style.display = "block";
        });
    }
}

function produtoChange(idProduto) {
    buscarEmpresasProduto(idProduto);
    buscarQuantidadeAtual();
}

//------------ WEB SERVICES

async function buscarTipos() {
    const url = "http://localhost:8080/tipo/all";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarTipos(json);
    }
}

async function buscarProdutos() {
    const url = "http://localhost:8080/produto/all";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarProdutos(json);
    }
}

async function buscarEmpresasProduto(id) {
    const url = `http://localhost:8080/empresa/produto/empresas/${id}`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        if (json.length > 0) {
            carregarEmpresas(json);
            adicionarCarregarEmpresas();
        } else {
            buscarEmpresas();
        }

    }
}

async function buscarQuantidadeAtual() {
    let idProduto = document.getElementById("produtoSelect").value;
    if (idProduto == 0) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('idProduto')) {
            idProduto = urlParams.get('idProduto');
        }
    }
    let idArmazem;
    if (tipoEntrada || tipoSaida) {
        idArmazem = document.getElementById("armazemSelect").value;
    } else {
        idArmazem = document.getElementById("armazemSaidaSelect").value;
    }

    if (idArmazem == "") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('idArmazem')) {
            idArmazem = urlParams.get('idArmazem');
        }
    }

    const url = `http://localhost:8080/armazem/produto/${idArmazem}/${idProduto}`;
    const quantidadeAtual = document.getElementById("quantidadeAtual");
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        quantidadeAtual.value = json.quantidadeAtualArmazem;
    } else {
        quantidadeAtual.value = 0;
    }
}

async function buscarEmpresas() {
    const url = `http://localhost:8080/empresa/all`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarEmpresas(json);
        removerCarregarEmpresas()
    }
}

async function buscarArmazens() {
    const url = `http://localhost:8080/armazem/all`;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarArmazens(json);
    }
}

async function realizarTransacao() {
    if (validarCampos()) {
        const data = dados();

        const url = "http://localhost:8080/transacao";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status == 201) {
            location.href = 'transacoes.html';
        }
    }
}

//------------ PEGAR DADOS
function dados() {
    const idTipo = document.getElementById("tipoSelect").value;
    const idProduto = document.getElementById("produtoSelect").value;
    const quantidade = document.getElementById("quantidade").value;
    const preco = document.getElementById("preco").value.replace(',', '.');
    const idEmpresa = document.getElementById("empresaSelect").value;
    const idArmazem = document.getElementById("armazemSelect").value;
    const idArmazemSaida = document.getElementById("armazemSaidaSelect").value;

    return {
        "idTipo": idTipo,
        "idProduto": idProduto,
        "quantidade": quantidade,
        "preco": preco,
        "idEmpresa": idEmpresa,
        "idArmazem": idArmazem,
        "idEmpresa": idEmpresa,
        "idArmazemSaida": idArmazemSaida,
    };
}

//------------ CARREGAR DADOS

function carregarTipos(tipos) {
    const tipoSelect = document.getElementById("tipoSelect");

    tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.idTipo;
        option.innerText = tipo.nome;

        tipoSelect.appendChild(option);
    });

    dselect(tipoSelect, { search: true });
}

function carregarProdutos(produtos) {
    const urlParams = new URLSearchParams(window.location.search);
    let idProduto = null;
    if (urlParams.has('idProduto')) {
        idProduto = urlParams.get('idProduto');
    }

    produtos.forEach(produto => {
        const option = document.createElement("option");
        option.value = produto.idProduto;
        option.innerText = `${produto.nome}`;

        if (idProduto == produto.idProduto) {
            option.selected = true;
            produtoChange(produto.idProduto);
            buscarQuantidadeAtual();
        }

        produtoSelect.appendChild(option);
    });

    dselect(produtoSelect, { search: true });
}

function carregarArmazens(armazens) {
    const urlParams = new URLSearchParams(window.location.search);
    let idArmazem = null;
    if (urlParams.has('idArmazem')) {
        idArmazem = urlParams.get('idArmazem');
    }

    const armazemSelect = document.getElementById("armazemSelect");
    const armazemSaidaSelect = document.getElementById("armazemSaidaSelect");

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.idArmazem;
        option.innerText = armazem.nome;
        if (idArmazem == armazem.idArmazem) {
            option.selected = true;
        }
        armazemSelect.appendChild(option);
    });

    armazens.forEach(armazem => {
        const option = document.createElement("option");
        option.value = armazem.idArmazem;
        option.innerText = armazem.nome;
        armazemSaidaSelect.appendChild(option);
    });

    dselect(armazemSelect, { search: true });
    dselect(armazemSaidaSelect, { search: true });
}

function carregarEmpresas(empresas) {
    const empresaSelect = document.getElementById("empresaSelect");
    empresaSelect.disabled = false;
    empresaSelect.innerHTML = "";

    empresas.forEach(empresa => {
        const option = document.createElement("option");
        option.value = empresa.idEmpresa;
        option.innerText = empresa.nome;

        empresaSelect.appendChild(option);
    });

    empresaSelect.disable = false;

    dselect(empresaSelect, { search: true });
}

function adicionarCarregarEmpresas() {
    const empresaLabel = document.getElementById("empresaLabel");
    empresaLabel.innerText = "Empresa que possui produtos cadastrados:";

    const empresaCol = document.getElementById("empresaCol");
    empresaCol.classList.add("col-10");
    empresaCol.classList.remove("col-12");

    const empresaVerTodas = document.getElementById("empresaVerTodas");
    if (empresaVerTodas.children.length == 0) {
        const a = document.createElement("a");
        a.classList.add("btn", "btn-primary");
        a.href = "#";
        a.innerText = "Ver todas";
        empresaVerTodas.appendChild(a);
    }
}

function removerCarregarEmpresas() {
    const empresaVerTodas = document.getElementById("empresaVerTodas");
    if (empresaVerTodas != null) {
        empresaVerTodas.innerHTML = "";
    }

    const empresaLabel = document.getElementById("empresaLabel");
    empresaLabel.innerText = "Empresa:";

    const empresaCol = document.getElementById("empresaCol");
    empresaCol.classList.add("col-12");
    empresaCol.classList.remove("col-10");
}