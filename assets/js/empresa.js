window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        buscar(`empresa/${id}`);
    }

    const confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", async function () {
        if (validarCampos()) {
            const id = document.getElementById("idEmpresa").value;

            const path = "empresa";
            const result = await enviar(id, path);
            if (result) {
                location.href = 'empresas.html';
            } else {
                //TODO ERRO
            }
        }
    });
};

function validarCampos() {
    const empresa = document.getElementById("empresa").value;
    const validacaoEmpresa = document.getElementById("validacaoEmpresa");

    if (!validarTexto(empresa, validacaoEmpresa)) {
        return false;
    }

    return true;
}

function dados() {
    const idEmpresa = document.getElementById("idEmpresa").value;
    const nome = document.getElementById("empresa").value;

    return {
        "idEmpresa": idEmpresa,
        "nome": nome,
    };
}

function carregar(empresa) {
    document.getElementById("empresa").value = empresa.nome;
    document.getElementById("idEmpresa").value = empresa.idEmpresa;
    document.getElementById("idEmpresaDiv").style.display = "block";
}