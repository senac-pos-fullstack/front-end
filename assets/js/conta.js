window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        buscar(`usuario/${id}`);
    }

    const confirmar = document.getElementById("confirmar");
    confirmar.addEventListener("click", async function () {
        const id = document.getElementById("idUsuario").value;
        const path = "usuario";
        const result = await enviar(id, path);
        if (result) {
            location.href = 'contas.html';
        } else {
            //TODO ERRO
        }
    });
};

function dados() {
    const idUsuario = document.getElementById("idUsuario").value;
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const status = document.getElementById("status").checked ? 1 : 0;

    return {
        "idUsuario": idUsuario,
        "usuario": usuario,
        "senha": senha,
        "status": status
    };
}

function carregar(usuario) {
    document.getElementById("usuario").value = usuario.usuario;
    document.getElementById("idUsuario").value = usuario.idUsuario;
    document.getElementById("idUsuarioDiv").style.display = "block";
    document.getElementById("status").checked = usuario.status;
}