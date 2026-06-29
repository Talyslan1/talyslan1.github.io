document.addEventListener("DOMContentLoaded", () => {
    const listaInscricoes = document.getElementById("listaInscricoes");
    const listaVazia = document.getElementById("listaVazia");
    const totalInscricoes = document.getElementById("totalInscricoes");
    const btnLimparInscricoes = document.getElementById("btnLimparInscricoes");
    const modalDetalhe = document.getElementById("modalDetalhe");
    const detalheTitulo = document.getElementById("detalheTitulo");
    const detalheEnviadoEm = document.getElementById("detalheEnviadoEm");
    const detalheDados = document.getElementById("detalheDados");
    const detalheMensagem = document.getElementById("detalheMensagem");
    const detalheFoto = document.getElementById("detalheFoto");
    const detalheImg = document.getElementById("detalheImg");
    const btnExcluirDetalhe = document.getElementById("btnExcluirDetalhe");

    let inscricaoSelecionada = null;

    function renderizarLista() {
        const inscricoes = obterInscricoes();
        listaInscricoes.replaceChildren();

        const quantidade = inscricoes.length;
        totalInscricoes.textContent = quantidade === 1
            ? "1 inscrição encontrada"
            : `${quantidade} inscrições encontradas`;

        listaVazia.hidden = quantidade > 0;
        btnLimparInscricoes.hidden = quantidade === 0;

        inscricoes.forEach((inscricao) => {
            const item = document.createElement("li");
            item.className = "cartao-inscricao";

            const cabecalho = document.createElement("div");
            cabecalho.className = "cartao-inscricao__cabecalho";

            if (inscricao.fotoBase64) {
                const foto = document.createElement("img");
                foto.className = "cartao-inscricao__foto";
                foto.src = inscricao.fotoBase64;
                foto.alt = `Foto de ${inscricao.nome}`;
                cabecalho.appendChild(foto);
            } else {
                const avatar = document.createElement("div");
                avatar.className = "cartao-inscricao__avatar";
                avatar.textContent = inscricao.nome.charAt(0).toUpperCase();
                avatar.setAttribute("aria-hidden", "true");
                cabecalho.appendChild(avatar);
            }

            const info = document.createElement("div");
            info.className = "cartao-inscricao__info";

            const nome = document.createElement("h2");
            nome.className = "cartao-inscricao__nome";
            nome.textContent = inscricao.nome;

            const curso = document.createElement("p");
            curso.className = "cartao-inscricao__curso";
            curso.textContent = ROTULOS_CURSO[inscricao.curso] || inscricao.curso;

            const meta = document.createElement("p");
            meta.className = "cartao-inscricao__meta";
            meta.textContent = `${ROTULOS_TURNO[inscricao.turno] || inscricao.turno} · ${formatarDataHoraBr(inscricao.enviadoEm)}`;

            info.appendChild(nome);
            info.appendChild(curso);
            info.appendChild(meta);
            cabecalho.appendChild(info);

            const email = document.createElement("p");
            email.className = "cartao-inscricao__email";
            email.textContent = inscricao.email;

            const acoes = document.createElement("div");
            acoes.className = "cartao-inscricao__acoes";

            const btnVer = document.createElement("button");
            btnVer.type = "button";
            btnVer.className = "btn-primario btn-pequeno";
            btnVer.textContent = "Ver detalhes";
            btnVer.addEventListener("click", () => abrirDetalhe(inscricao));

            const btnExcluir = document.createElement("button");
            btnExcluir.type = "button";
            btnExcluir.className = "btn-perigo btn-pequeno";
            btnExcluir.textContent = "Excluir";
            btnExcluir.addEventListener("click", () => {
                if (confirm(`Excluir a inscrição de ${inscricao.nome}?`)) {
                    removerInscricao(inscricao.id);
                    renderizarLista();
                }
            });

            acoes.appendChild(btnVer);
            acoes.appendChild(btnExcluir);

            item.appendChild(cabecalho);
            item.appendChild(email);
            item.appendChild(acoes);
            listaInscricoes.appendChild(item);
        });
    }

    function abrirDetalhe(inscricao) {
        inscricaoSelecionada = inscricao;

        detalheTitulo.textContent = inscricao.nome;
        detalheEnviadoEm.textContent = `Enviado em ${formatarDataHoraBr(inscricao.enviadoEm)}`;

        preencherResumoModal(detalheDados, [
            { rotulo: "E-mail", valor: inscricao.email },
            { rotulo: "Telefone", valor: inscricao.telefone },
            { rotulo: "Nascimento", valor: formatarDataBr(inscricao.nascimento) },
            { rotulo: "Curso", valor: ROTULOS_CURSO[inscricao.curso] || "—" },
            { rotulo: "Turno", valor: ROTULOS_TURNO[inscricao.turno] || "—" },
            { rotulo: "Interesses", valor: rotularInteresses(inscricao.interesses) },
        ]);

        detalheMensagem.textContent = inscricao.mensagem || "—";

        if (inscricao.fotoBase64) {
            detalheImg.src = inscricao.fotoBase64;
            detalheImg.alt = `Foto de ${inscricao.nome}`;
            detalheFoto.hidden = false;
        } else {
            detalheImg.src = "";
            detalheFoto.hidden = true;
        }

        modalDetalhe.showModal();
    }

    function fecharDetalhe() {
        inscricaoSelecionada = null;
        modalDetalhe.close();
    }

    document.getElementById("btnFecharDetalhe").addEventListener("click", fecharDetalhe);

    modalDetalhe.addEventListener("cancel", (evento) => {
        evento.preventDefault();
        fecharDetalhe();
    });

    btnExcluirDetalhe.addEventListener("click", () => {
        if (!inscricaoSelecionada) return;

        if (confirm(`Excluir a inscrição de ${inscricaoSelecionada.nome}?`)) {
            removerInscricao(inscricaoSelecionada.id);
            fecharDetalhe();
            renderizarLista();
        }
    });

    btnLimparInscricoes.addEventListener("click", () => {
        if (confirm("Excluir todas as inscrições salvas neste navegador?")) {
            limparInscricoes();
            renderizarLista();
        }
    });

    renderizarLista();
});
