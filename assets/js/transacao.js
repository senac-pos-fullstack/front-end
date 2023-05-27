

//DEFINE OS TIPOS PARA CHAMAR A FUNCAO
let tipo = document.getElementById("tipoSelect");
tipo.addEventListener('change', () => tipoTransacao(tipo));

//SELECT WITH SEARCH
dselect(document.getElementById("produtoSelect"), { search: true });
dselect(document.getElementById("tipoSelect"), { search: true });
dselect(document.getElementById("empresaSelect"), { search: true });
dselect(document.getElementById("armazemSelect"), { search: true });
dselect(document.getElementById("saidaSelect"), { search: true });
dselect(document.getElementById("entradaSelect"), { search: true });



function tipoTransacao(tipo) {
    tipo = tipo.options[tipo.selectedIndex].text.toLowerCase()

    let fluxo = document.getElementById("tipoFluxo");
    let transferencia = document.getElementById("tipoTransferencia");

    if (tipo.includes("entrada")) {
        fluxo.style.display = "block";
        transferencia.style.display = "none";
    } else if (tipo.includes("saída")) {
        fluxo.style.display = "block";
        transferencia.style.display = "none";
    } else if (tipo.includes("transferências")) {
        transferencia.style.display = "block";
        fluxo.style.display = "none";
    }
}

