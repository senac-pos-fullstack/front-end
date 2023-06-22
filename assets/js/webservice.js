let baseUrl = "http://localhost:8080/";

async function buscar(path) {
    const url = baseUrl + path;
    const response = await fetch(url);
    if (response.status == 200) {
        const json = await response.json();

        carregar(json);
    }
}

async function cadastrar(path) {
    const data = dados();

    const url = baseUrl + path;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.status == 201;
}

async function editar(path) {
    const data = dados();

    const url = baseUrl + path;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.status == 200;
}

async function enviar(id, path) {
    if (id == 0) {
        return await cadastrar(path);
    } else {
        return await editar(path);
    }
}