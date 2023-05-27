

let tipos = document.getElementsByName("formaTransacao");
tipos.forEach(tipo => tipo.addEventListener('change', () => tipoTransacao(tipo.value)));

function tipoTransacao(tipo) {
    let compravenda = document.getElementById("tipoCompravenda");
    let transferencia = document.getElementById("tipoTransferencia");

    switch (tipo) {
        case "compravenda":
            compravenda.style.display = "block";
            transferencia.style.display = "none";
            break;
        case "transferencia":
            transferencia.style.display = "block";
            compravenda.style.display = "none";
            break;
    }
}