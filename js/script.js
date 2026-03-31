document.addEventListener("DOMContentLoaded", function () {

    const formFilme = document.getElementById("formFilme");

    if (formFilme) {
        formFilme.addEventListener("submit", function (event) {
            event.preventDefault();

            const novoFilme = {
                titulo: document.getElementById("nomeFilme").value,
                genero: document.getElementById("inputGenero").value,
                sinopse: document.getElementById("inputSinopse").value,
                classificacao: document.getElementById("inputClassificacao").value,
                duracao: document.getElementById("inputDuracao").value,
                estreia: document.getElementById("inputEstreia").value
            };

            let filmesSalvos = JSON.parse(localStorage.getItem("filmes")) || [];

            filmesSalvos.push(novoFilme);

            localStorage.setItem("filmes", JSON.stringify(filmesSalvos));

            alert(`Filme "${novoFilme.titulo}" cadastrado com sucesso!`);

            formFilme.reset();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const formSala = document.getElementById("formSala");

    if (formSala) {
        formSala.addEventListener("submit", function (event) {
            event.preventDefault();

            const novaSala = {
                nome: document.getElementById("nomeSala").value,
                capacidade: document.getElementById("inputCapacidade").value,
                tipoTela: document.getElementById("inputTipoTela").value
            };

            let salasSalvas = JSON.parse(localStorage.getItem("salas")) || [];

            salasSalvas.push(novaSala);
            localStorage.setItem("salas", JSON.stringify(salasSalvas));

            alert(`Sala "${novaSala.nome}" (Capacidade: ${novaSala.capacidade} pessoas) cadastrada com sucesso!`);
            formSala.reset();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const formSessao = document.getElementById("formSessao");

    if (formSessao) {
        const selectFilme = document.getElementById("selectFilme");
        const selectSala = document.getElementById("selectSala");

        const filmesSalvos = JSON.parse(localStorage.getItem("filmes")) || [];
        const salasSalvas = JSON.parse(localStorage.getItem("salas")) || [];

        filmesSalvos.forEach(filme => {
            let option = document.createElement("option");
            option.value = filme.titulo;
            option.textContent = filme.titulo;
            selectFilme.appendChild(option);
        });

        salasSalvas.forEach(sala => {
            let option = document.createElement("option");
            option.value = sala.nome;
            option.textContent = `${sala.nome} (Capacidade: ${sala.capacidade}) (${sala.tipoTela})`;
            selectSala.appendChild(option);
        });

        selectSala.addEventListener("change", function () {
            const nomeSalaSelecionada = this.value;
            const sala = salasSalvas.find(s => s.nome === nomeSalaSelecionada);

            const inputFormato = document.getElementById("inputFormato");

            if (sala && inputFormato) {
                inputFormato.value = sala.tipoTela;
            } else {
                inputFormato.value = "";
            }
        });

        formSessao.addEventListener("submit", function (event) {
            event.preventDefault();

            const novaSessao = {
                filme: document.getElementById("selectFilme").value,
                sala: document.getElementById("selectSala").value,
                dataHora: document.getElementById("inputDataHora").value,
                preco: document.getElementById("inputPreco").value,
                idioma: document.getElementById("inputIdioma").value,
                formato: document.getElementById("inputFormato").value
            };

            let sessoesSalvas = JSON.parse(localStorage.getItem("sessoes")) || [];
            sessoesSalvas.push(novaSessao);
            localStorage.setItem("sessoes", JSON.stringify(sessoesSalvas));

            alert(`Sessão do filme "${novaSessao.filme}" agendada com sucesso!`);

            formSessao.reset();
        });
    }

});

document.addEventListener("DOMContentLoaded", function () {

    const formVenda = document.getElementById("formVenda");

    if (formVenda) {
        const selectSessao = document.getElementById("selectSessao");
        let sessoesSalvas = JSON.parse(localStorage.getItem("sessoes")) || [];

        sessoesSalvas.forEach((sessao, index) => {
            const dataObj = new Date(sessao.dataHora);
            const dataFormatada = dataObj.toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            let option = document.createElement("option");
            option.value = index;
            option.textContent = `${sessao.filme} | ${sessao.sala} | ${dataFormatada} | R$ ${sessao.preco}`;

            selectSessao.appendChild(option);
        });

        const urlParams = new URLSearchParams(window.location.search);
        const idSessaoUrl = urlParams.get('id');

        if (idSessaoUrl !== null && sessoesSalvas[idSessaoUrl]) {
            selectSessao.value = idSessaoUrl;
        }

        formVenda.addEventListener("submit", function (event) {
            event.preventDefault();

            const indexSessaoEscolhida = selectSessao.value;
            const sessaoEscolhida = sessoesSalvas[indexSessaoEscolhida];

            const novaVenda = {
                sessaoDetalhes: sessaoEscolhida,
                cliente: document.getElementById("nomeCliente").value,
                cpf: document.getElementById("cpfCliente").value,
                assento: document.getElementById("assento").value,
                pagamento: document.getElementById("selectPagamento").value,
                dataDaCompra: new Date().toISOString()
            };

            let vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];
            vendasSalvas.push(novaVenda);
            localStorage.setItem("vendas", JSON.stringify(vendasSalvas));

            alert(`Venda confirmada!\nCliente: ${novaVenda.cliente}\nAssento: ${novaVenda.assento}\nValor: R$ ${sessaoEscolhida.preco}`);

            formVenda.reset();
            window.history.replaceState({}, document.title, window.location.pathname);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    const tabelaSessoes = document.getElementById("tabelaSessoes");

    if (tabelaSessoes) {
        const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

        if (sessoes.length === 0) {
            tabelaSessoes.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-warning py-4">
                        <i class="bi bi-exclamation-circle me-2"></i>
                        Nenhuma sessão disponível no momento.
                    </td>
                </tr>`;
            return;
        }

        sessoes.forEach(function (sessao, index) {

            let dataHora = "—";
            if (sessao.dataHora) {
                const dt = new Date(sessao.dataHora);
                dataHora = dt.toLocaleString("pt-BR", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                });
            }

            let preco = "—";
            if (sessao.preco) {
                preco = parseFloat(sessao.preco).toLocaleString("pt-BR", {
                    style: "currency", currency: "BRL"
                });
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${sessao.filme || "—"}</td>
            <td>${sessao.sala || "—"}</td>
            <td>${dataHora}</td>
            <td>${preco}</td>
            <td>${sessao.idioma || "—"}</td>
            <td>
            <a href="/venda-ingressos.html?id=${index}" class="btn btn-warning btn-sm">
            Comprar
            </a>
            </td>
            `;
            tabelaSessoes.appendChild(tr);
        });
    }
});