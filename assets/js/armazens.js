async function buscarArmazens() {
  //Mudar endpoint para webservice
  const url =
    "https://raw.githubusercontent.com/senac-pos-fullstack/front-end/main/assets/json/armazens.json";
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();

    carregarArmazens(json.ARMAZENS);
    carregarTooltip();

    carregarPaginacao(json.PAGINACAO);
  }
}

function carregarArmazens(armazens) {
  const item = document.getElementById("item");

  armazens.forEach(armazem => {
    const tr = document.createElement("tr");

    //TD ID
    const tdId = document.createElement("td");
    tdId.innerText = armazem.ID_ARMAZEM;
    tr.appendChild(tdId);

    //TD NOME
    const tdNome = document.createElement("td");
    tr.appendChild(tdNome);
    tdNome.innerText = armazem.TXT_NOME;

    //TD ENDERECO
    const tdEndereco = document.createElement("td");
    tdEndereco.innerText = armazem.TXT_ENDERECO;
    tr.appendChild(tdEndereco);

    //TD TELEFONE
    const tdTelefone = document.createElement("td");
    tdTelefone.innerText = armazem.TXT_TELEFONE;
    tr.appendChild(tdTelefone);

    //TD EDITAR
    const tdEditar = document.createElement("td");
    tdEditar.classList.add("text-center");
    const aEditar = document.createElement("a");
    aEditar.href = `fornecedor.html?role=editar&id=${armazem.ID_ARMAZEM}`;
    aEditar.classList.add("link");
    const iEditar = document.createElement("i");
    iEditar.classList.add("fa-solid", "fa-pen-to-square");
    aEditar.appendChild(iEditar);
    tdEditar.appendChild(aEditar);
    tr.appendChild(tdEditar);

    //TD EXCLUIR
    const tdExcluir = document.createElement("td");
    tdExcluir.classList.add("text-center");
    const aExcluir = document.createElement("a");
    aExcluir.href = "#";
    aExcluir.classList.add("link");
    const iExcluir = document.createElement("i");
    iExcluir.classList.add("fa-solid", "fa-trash");
    aExcluir.appendChild(iExcluir);
    tdExcluir.appendChild(aExcluir);

    tr.appendChild(tdExcluir);

    //MODAL REMOVER
    if (armazem.BIT_DELETAR) {
      aExcluir.dataset.bsToggle = "modal";
      aExcluir.dataset.bsTarget = `#remover${armazem.ID_ARMAZEM}`;

      const divModal = document.createElement("div");
      divModal.classList.add("modal", "fade");
      divModal.id = `remover${armazem.ID_ARMAZEM}`;
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
      pbody.innerHTML = `Nessa ação você irá remover <b>${armazem.TXT_NOME}</b>. Uma vez removido não poderá voltar atrás!`;
      divModalBody.appendChild(pbody);

      const divModalFooter = document.createElement("div");
      divModalFooter.classList.add("modal-footer");

      const buttonFooterClose = document.createElement("button");
      buttonFooterClose.classList.add("btn", "btn-secondary");
      buttonFooterClose.dataset.bsDismiss = "modal";
      buttonFooterClose.innerText = "Fechar";
      divModalFooter.appendChild(buttonFooterClose);

      const aFooterRemover = document.createElement("a");
      aFooterRemover.href = `fornecedor.html?role=remover&id=${armazem.ID_ARMAZEM}`;
      aFooterRemover.classList.add("btn", "btn-danger");
      aFooterRemover.innerText = "Remover";
      divModalFooter.appendChild(aFooterRemover);

      divModalContent.appendChild(divModalHeader);
      divModalContent.appendChild(divModalBody);
      divModalContent.appendChild(divModalFooter);

      divModalDialog.appendChild(divModalContent);
      divModal.appendChild(divModalDialog);
      item.appendChild(divModal);
    } else {
      aExcluir.dataset.bsToggle = "tooltip";
      aExcluir.dataset.bsPlacement = "left";
      aExcluir.title = "Fornecedor com produto relacionado, por favor exclua o produto primeiro.";
      aExcluir.classList.add("disabled");
    }

    item.appendChild(tr);
  });
}
function carregarPaginacao(paginacao) {

  const ulPagination = document.createElement("ul");
  ulPagination.classList.add("pagination", "justify-content-center");

  for (let i = 1; i <= paginacao.PAGINA_TOTAL; i++) {
    const liItem = document.createElement("li");
    liItem.classList.add("page-item");
    if (paginacao.PAGINAL_ATUAL == i) {
      liItem.classList.add("active");
    }

    const aLink = document.createElement("a");
    aLink.classList.add("page-link", "link");
    aLink.href = `fornecedores.html?page=${i}`;
    aLink.innerText = i;

    liItem.appendChild(aLink);
    ulPagination.appendChild(liItem);
  }

  const page = document.getElementById("paginacao");
  page.appendChild(ulPagination);

  console.log(paginacao);
}

function carregarTooltip() {
  tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

window.onload = function () {
  buscarArmazens();
};
