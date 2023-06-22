window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        buscar(`armazem/${id}`);
    }

    const confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", async function () {
        if (validarCampos()) {
            const id = document.getElementById("idArmazem").value;
            const path = "armazem";
            const result = await enviar(id, path);
            if (result) {
                location.href = 'armazens.html';
            } else {
                //TODO ERRO
            }
        }
    });
};

function validarCampos() {
    const armazem = document.getElementById("armazem").value;
    const validacaoArmazem = document.getElementById("validacaoArmazem");

    if (!validarTexto(armazem, validacaoArmazem)) {
        return false;
    }

    return true;
}

function dados() {
    const idArmazem = document.getElementById("idArmazem").value;
    const nome = document.getElementById("armazem").value;

    return {
        "idArmazem": idArmazem,
        "nome": nome,
    };
}

function carregar(armazem) {
    document.getElementById("armazem").value = armazem.nome;
    document.getElementById("idArmazem").value = armazem.idArmazem;
    document.getElementById("idArmazemDiv").style.display = "block";
}