// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {
    
    const formFilme = document.getElementById("formFilme");

    // Só executa se o formulário existir na página atual
    if (formFilme) {
        formFilme.addEventListener("submit", function (event) {
            // event.preventDefault() impede que a página recarregue ao clicar no botão
            event.preventDefault();

            // 1. Captura os dados digitados usando os IDs do seu HTML
            const novoFilme = {
                titulo: document.getElementById("nomeFilme").value,
                genero: document.getElementById("inputGenero").value,
                sinopse: document.getElementById("inputSinopse").value,
                classificacao: document.getElementById("inputClassificacao").value,
                duracao: document.getElementById("inputDuracao").value,
                estreia: document.getElementById("inputEstreia").value
            };

            // 2. Busca os filmes que já estão salvos no localStorage. 
            // Se não tiver nada salvo, cria uma lista vazia []
            let filmesSalvos = JSON.parse(localStorage.getItem("filmes")) || [];

            // 3. Adiciona o novo filme na lista
            filmesSalvos.push(novoFilme);

            // 4. Salva a lista atualizada de volta no localStorage (convertendo para texto)
            localStorage.setItem("filmes", JSON.stringify(filmesSalvos));

            // 5. Dá um aviso de sucesso para o usuário
            alert(`Filme "${novoFilme.titulo}" cadastrado com sucesso!`);

            // 6. Limpa os campos do formulário para o próximo cadastro
            formFilme.reset();
        });
    }
});

// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // LÓGICA DO CADASTRO DE FILMES (Já estava aqui)
    // ==========================================
    const formFilme = document.getElementById("formFilme");
    if (formFilme) {
        // ... (seu código de filmes continua aqui intacto) ...
    }

    // ==========================================
    // LÓGICA DO CADASTRO DE SALAS (CÓDIGO NOVO)
    // ==========================================
    const formSala = document.getElementById("formSala");

    // Só executa se estivermos na página de Cadastro de Salas
    if (formSala) {
        formSala.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede a página de recarregar

            // 1. Captura os dados da sala
            const novaSala = {
                nome: document.getElementById("nomeSala").value,
                capacidade: document.getElementById("inputCapacidade").value,
                tipoTela: document.getElementById("inputTipoTela").value
            };

            // 2. Busca as salas já salvas ou cria uma lista vazia
            let salasSalvas = JSON.parse(localStorage.getItem("salas")) || [];

            // 3. Adiciona a nova sala e salva no localStorage
            salasSalvas.push(novaSala);
            localStorage.setItem("salas", JSON.stringify(salasSalvas));

            // 4. Avisa o usuário e limpa o formulário
            alert(`Sala "${novaSala.nome}" (Capacidade: ${novaSala.capacidade} pessoas) cadastrada com sucesso!`);
            formSala.reset();
        });
    }
}); 

// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {

    // ... (Seus blocos formFilme e formSala continuam aqui em cima) ...

    // ==========================================
    // LÓGICA DO CADASTRO DE SESSÕES
    // ==========================================
    const formSessao = document.getElementById("formSessao");

    if (formSessao) {
        // --- 1. CARREGAR DADOS NOS SELECTS AO ABRIR A PÁGINA ---
        const selectFilme = document.getElementById("selectFilme");
        const selectSala = document.getElementById("selectSala");

        // Busca o que tem salvo no navegador
        const filmesSalvos = JSON.parse(localStorage.getItem("filmes")) || [];
        const salasSalvas = JSON.parse(localStorage.getItem("salas")) || [];

        // Preenche o Select de Filmes
        filmesSalvos.forEach(filme => {
            let option = document.createElement("option");
            option.value = filme.titulo;
            option.textContent = filme.titulo;
            selectFilme.appendChild(option);
        });

        // Preenche o Select de Salas (já mostrando a capacidade pra ajudar o usuário)
        salasSalvas.forEach(sala => {
            let option = document.createElement("option");
            option.value = sala.nome;
            option.textContent = `${sala.nome} (Capacidade: ${sala.capacidade})`;
            selectSala.appendChild(option);
        });

        // --- 2. SALVAR A NOVA SESSÃO AO CLICAR NO BOTÃO ---
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
            
            // Limpa o formulário, mas não apaga as opções dos selects
            formSessao.reset();
        });
    }

});

// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {

    // ... (Blocos formFilme, formSala, formSessao já estão aqui) ...

    // ==========================================
    // LÓGICA DA VENDA DE INGRESSOS
    // ==========================================
    const formVenda = document.getElementById("formVenda");

    if (formVenda) {
        const selectSessao = document.getElementById("selectSessao");
        let sessoesSalvas = JSON.parse(localStorage.getItem("sessoes")) || [];

        // 1. Preenche o Select com as Sessões Disponíveis
        sessoesSalvas.forEach((sessao, index) => {
            // Formata a data para ficar bonita na tela (DD/MM/AAAA HH:mm)
            const dataObj = new Date(sessao.dataHora);
            const dataFormatada = dataObj.toLocaleString('pt-BR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });

            let option = document.createElement("option");
            // Usamos o 'index' como valor para saber exatamente qual sessão foi escolhida
            option.value = index; 
            // Mostra Filme, Sala, Data e Preço na mesma linha
            option.textContent = `${sessao.filme} | ${sessao.sala} | ${dataFormatada} | R$ ${sessao.preco}`;
            
            selectSessao.appendChild(option);
        });

        // 2. Verifica se a página foi chamada com um ID específico (Ex: venda-ingressos.html?id=1)
        const urlParams = new URLSearchParams(window.location.search);
        const idSessaoUrl = urlParams.get('id');
        
        if (idSessaoUrl !== null && sessoesSalvas[idSessaoUrl]) {
            // Se tiver um ID válido, seleciona automaticamente essa sessão na lista
            selectSessao.value = idSessaoUrl;
        }

        // 3. Salvar a Venda
        formVenda.addEventListener("submit", function (event) {
            event.preventDefault();

            // Pega o ID da sessão escolhida
            const indexSessaoEscolhida = selectSessao.value;
            const sessaoEscolhida = sessoesSalvas[indexSessaoEscolhida];

            const novaVenda = {
                sessaoDetalhes: sessaoEscolhida, // Guarda todos os dados da sessão (filme, hora, preco)
                cliente: document.getElementById("nomeCliente").value,
                cpf: document.getElementById("cpfCliente").value,
                assento: document.getElementById("assento").value,
                pagamento: document.getElementById("selectPagamento").value,
                dataDaCompra: new Date().toISOString() // Salva o exato momento em que o ingresso foi vendido
            };

            let vendasSalvas = JSON.parse(localStorage.getItem("vendas")) || [];
            vendasSalvas.push(novaVenda);
            localStorage.setItem("vendas", JSON.stringify(vendasSalvas));

            alert(`Venda confirmada!\nCliente: ${novaVenda.cliente}\nAssento: ${novaVenda.assento}\nValor: R$ ${sessaoEscolhida.preco}`);
            
            formVenda.reset();
            // Reseta também o parâmetro da URL caso a pessoa queira fazer outra venda
            window.history.replaceState({}, document.title, window.location.pathname);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // LÓGICA DA PÁGINA SESSÕES DISPONÍVEIS
    // ==========================================
    const tabelaSessoes = document.getElementById("tabelaSessoes");

    if (tabelaSessoes) {
        const sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

        // Se não houver sessões, exibe mensagem de aviso
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

        // Percorre cada sessão e monta uma linha na tabela
        sessoes.forEach(function (sessao, index) {

            // Formata a data/hora para o padrão brasileiro
            let dataHora = "—";
            if (sessao.dataHora) {
                const dt = new Date(sessao.dataHora);
                dataHora = dt.toLocaleString("pt-BR", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                });
            }

            // Formata o preço como moeda R$
            let preco = "—";
            if (sessao.preco) {
                preco = parseFloat(sessao.preco).toLocaleString("pt-BR", {
                    style: "currency", currency: "BRL"
                });
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
    <td>${sessao.filme  || "—"}</td>
    <td>${sessao.sala   || "—"}</td>
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