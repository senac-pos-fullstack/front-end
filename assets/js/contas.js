window.onload = function () {
    buscar();
};

async function buscar() {
    const url = "http://localhost:8080/usuario/all";
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregarContas(json);
        carregarTooltip();
    }
}

async function remover(id) {
    const url = `http://localhost:8080/usuario/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status == 200) {
        location.href = 'contas.html';
    }
}

function carregarContas(usuarios) {
    const tbody = document.getElementById("item");

    usuarios.forEach(usuario => {
        const tr = document.createElement("tr");

        //TD ID
        tr.appendChild(criarTd(usuario.idUsuario));
        //TD STATUS
        tr.appendChild(criarTd(usuario.status ? "Ativo" : "Inativo"));
        //TD USUARIO
        tr.appendChild(criarTd(usuario.usuario));
        //TD EDITAR
        tr.appendChild(criarTdLink(`conta.html?id=${usuario.idUsuario}`, "fa-pencil"));
        //TD DELETAR
        tr.appendChild(criarTdExcluir(usuario.idUsuario, usuario.usuario, usuario.deletar));

        tbody.appendChild(tr);
    });
}

function carregarTooltip() {
    tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}
