function validarTexto(valor, erro) {
    if (valor.length > 3) {
        remover(erro);
        return true;
    }
    mostrar(erro);
    return false;
}

function validarNumero(valor, erro) {
    if (!isNaN(parseFloat(valor)) && parseFloat(valor) > 0) {
        remover(erro);
        return true;
    }
    mostrar(erro);
    return false;
}

function validarSelect(valor, erro) {
    if (valor > 0) {
        remover(erro);
        return true;
    }
    mostrar(erro);
    return false;
}

function validarSelectDiferente(valorA, valorB, erro) {
    if (valorA != valorB) {
        remover(erro);
        return true;
    }
    mostrar(erro);
    return false;
}

function validarQuantidade(valorAtual, valorNovo, erro) {
    if (parseInt(valorAtual) > parseInt(valorNovo)) {
        alert( valorAtual + " > " + valorNovo);
        remover(erro);
        return true;
    }
    mostrar(erro);
    return false;
}

function mostrar(erro) {
    erro.classList.add('d-block')
}

function remover(erro) {
    erro.classList.remove('d-block')
}
