function criarTd(value, center = false) {
    const td = document.createElement("td");
    td.innerText = value;

    if (center) {
        td.classList.add("text-center");
    }

    return td;
}

function criarTdLink(link, icone) {
    const td = document.createElement("td");
    td.classList.add("text-center");
    const a = document.createElement("a");
    a.href = link;
    a.classList.add("link");
    const i = document.createElement("i");
    i.classList.add("fa-solid", icone);
    a.appendChild(i);
    td.appendChild(a);

    return td;
}

function criarTdTooltip(array, icone) {
    let title = "";
    array.forEach(item => {
        title += `<p>${item.TXT_NOME}</p>`;
    });

    const td = document.createElement("td");
    td.classList.add("text-center");
    const a = document.createElement("a");
    a.href = "#";
    a.classList.add("link");
    a.dataset.bsToggle = "tooltip";
    a.dataset.bsPlacement = "bottom";
    a.dataset.bsHtml = "true";
    a.title = title;
    const i = document.createElement("i");
    i.classList.add("fa-solid", icone);
    a.appendChild(i);
    td.appendChild(a);

    return td;
}

function criarTdExcluir(id, nome, deletar) {
    const td = document.createElement("td");
    td.classList.add("text-center");
    const a = document.createElement("a");
    a.href = "#";
    a.classList.add("link");
    const i = document.createElement("i");
    i.classList.add("fa-solid", "fa-trash");
    a.appendChild(i);
    td.appendChild(a);

    //MODAL REMOVER
    if (deletar) {
        a.dataset.bsToggle = "modal";
        a.dataset.bsTarget = `#remover${id}`;

        const divModal = document.createElement("div");
        divModal.classList.add("modal", "fade");
        divModal.id = `remover${id}`;
        divModal.tabIndex = "-1";
        const divModalDialog = document.createElement("div");
        divModalDialog.classList.add("modal-dialog");
        const divModalContent = document.createElement("div");
        divModalContent.classList.add("modal-content");

        const divModalHeader = document.createElement("div");
        divModalHeader.classList.add("modal-header");
        const h5Title = document.createElement("h5");
        h5Title.classList.add("modal-title");
        h5Title.innerText = "Você tem certeza que deseja remover?";
        const buttonClose = document.createElement("button");
        buttonClose.classList.add("btn-close");
        buttonClose.dataset.bsDismiss = "modal";
        divModalHeader.appendChild(h5Title);
        divModalHeader.appendChild(buttonClose);

        const divModalBody = document.createElement("div");
        divModalBody.classList.add("modal-body");
        const pbody = document.createElement("p");
        pbody.innerHTML = `Nessa ação você irá remover <b>${nome}</b>. Uma vez removido não poderá voltar atrás!`;
        divModalBody.appendChild(pbody);

        const divModalFooter = document.createElement("div");
        divModalFooter.classList.add("modal-footer");

        const buttonFooterClose = document.createElement("button");
        buttonFooterClose.classList.add("btn", "btn-secondary");
        buttonFooterClose.dataset.bsDismiss = "modal";
        buttonFooterClose.innerText = "Fechar";
        divModalFooter.appendChild(buttonFooterClose);

        const aFooterRemover = document.createElement("a");
        aFooterRemover.href = "#";
        aFooterRemover.addEventListener("click", function () { remover(id) });

        aFooterRemover.classList.add("btn", "btn-danger");
        aFooterRemover.innerText = "Remover";
        divModalFooter.appendChild(aFooterRemover);

        divModalContent.appendChild(divModalHeader);
        divModalContent.appendChild(divModalBody);
        divModalContent.appendChild(divModalFooter);

        divModalDialog.appendChild(divModalContent);
        divModal.appendChild(divModalDialog);

        document.body.appendChild(divModal);
    } else {
        a.dataset.bsToggle = "tooltip";
        a.dataset.bsPlacement = "left";
        a.title = "Esse item está relacionado, por favor exclua a relação primeiro.";
        a.classList.add("disabled");
    }

    return td;
}
