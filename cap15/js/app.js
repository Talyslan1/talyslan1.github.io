document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formInscricao");
    const modal = document.getElementById("modalConfirmacao");
    const overlaySucesso = document.getElementById("overlaySucesso");
    const resumoConfirmacao = document.getElementById("resumoConfirmacao");
    const avisoRascunho = document.getElementById("avisoRascunho");
    const statusRascunho = document.getElementById("statusRascunho");
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const confete = document.getElementById("confete");
    const iconeSucesso = document.getElementById("iconeSucesso");

    const camposTempoReal = ["nome", "email", "senha", "confirmarSenha", "mensagem"];

    const elementos = {
        barraForcaSenha: document.getElementById("barraForcaSenha"),
        textoForcaSenha: document.getElementById("textoForcaSenha"),
        contadorMensagem: document.getElementById("contadorMensagem"),
        previewFoto: document.getElementById("previewFoto"),
        imgPreview: document.getElementById("imgPreview"),
    };

    const salvarRascunho = debounce(() => {
        const resultado = salvarFormulario(form);
        if (resultado.salvo) {
            exibirStatusRascunho(statusRascunho, "Rascunho salvo automaticamente");
        }
    }, 500);

    function obterInteressesMarcados() {
        return Array.from(form.querySelectorAll('input[name="interesses"]:checked'));
    }

    function exibirErro(campoId, resultado) {
        const elementoErro = document.getElementById(`erro-${campoId}`);
        const campo = form.elements[campoId] || document.getElementById(campoId);

        if (!elementoErro) return;

        elementoErro.textContent = resultado.valido ? "" : resultado.mensagem;

        if (campo && campo.type !== "checkbox" && campo.type !== "radio") {
            campo.classList.toggle("campo-invalido", !resultado.valido);
            campo.classList.toggle("campo-valido", resultado.valido && campo.value.trim() !== "");
        }
    }

    function exibirErroGrupo(campoId, resultado, elementosGrupo) {
        const elementoErro = document.getElementById(`erro-${campoId}`);
        if (elementoErro) {
            elementoErro.textContent = resultado.valido ? "" : resultado.mensagem;
        }

        elementosGrupo.forEach((el) => {
            el.classList.toggle("campo-invalido", !resultado.valido);
            el.classList.toggle("campo-valido", resultado.valido);
        });
    }

    function validarCampo(campoId) {
        switch (campoId) {
            case "nome":
                return validarNome(form.nome.value);
            case "email":
                return validarEmail(form.email.value);
            case "telefone":
                return validarTelefone(form.telefone.value);
            case "nascimento":
                return validarNascimento(form.nascimento.value);
            case "curso":
                return validarCurso(form.curso.value);
            case "turno":
                return validarTurno(form.turno.value);
            case "interesses":
                return validarInteresses(obterInteressesMarcados());
            case "senha":
                return validarSenha(form.senha.value);
            case "confirmarSenha":
                return validarConfirmarSenha(form.senha.value, form.confirmarSenha.value);
            case "mensagem":
                return validarMensagem(form.mensagem.value);
            case "foto":
                return validarFoto(form.foto.files[0] || null);
            case "termos":
                return validarTermos(form.termos.checked);
            default:
                return { valido: true, mensagem: "" };
        }
    }

    function aplicarValidacao(campoId) {
        const resultado = validarCampo(campoId);

        if (campoId === "interesses") {
            exibirErroGrupo(campoId, resultado, form.querySelectorAll('input[name="interesses"]'));
        } else if (campoId === "turno") {
            exibirErroGrupo(campoId, resultado, form.querySelectorAll('input[name="turno"]'));
        } else if (campoId === "termos") {
            exibirErro(campoId, resultado);
            form.termos.classList.toggle("campo-invalido", !resultado.valido);
            form.termos.classList.toggle("campo-valido", resultado.valido);
        } else {
            exibirErro(campoId, resultado);
        }

        return resultado.valido;
    }

    function atualizarForcaSenha() {
        const forca = calcularForcaSenha(form.senha.value);
        elementos.barraForcaSenha.dataset.nivel = forca.nivel;
        elementos.textoForcaSenha.textContent = forca.texto
            ? `Força da senha: ${forca.texto}`
            : "";
    }

    function validarFormularioCompleto() {
        const campos = [
            "nome", "email", "telefone", "nascimento", "curso",
            "turno", "interesses", "senha", "confirmarSenha",
            "mensagem", "foto", "termos",
        ];

        return campos.every((campo) => aplicarValidacao(campo));
    }

    function limparEstadosVisuais() {
        elementos.previewFoto.hidden = true;
        elementos.imgPreview.src = "";
        atualizarContadorCaracteres(form.mensagem, elementos.contadorMensagem);
        atualizarForcaSenha();
        form.querySelectorAll(".campo-valido, .campo-invalido").forEach((el) => {
            el.classList.remove("campo-valido", "campo-invalido");
        });
        form.querySelectorAll(".erro").forEach((el) => {
            el.textContent = "";
        });
    }

    function fecharOverlaySucesso() {
        overlaySucesso.hidden = true;
        overlaySucesso.setAttribute("aria-hidden", "true");
        confete.replaceChildren();
        iconeSucesso.classList.remove("overlay-sucesso__icone--animar");
    }

    function abrirOverlaySucesso(nome) {
        mensagemSucesso.textContent = nome
            ? `${nome}, sua inscrição foi registrada! Em breve entraremos em contato.`
            : "Em breve entraremos em contato pelo e-mail informado.";

        overlaySucesso.hidden = false;
        overlaySucesso.setAttribute("aria-hidden", "false");
        iconeSucesso.classList.add("overlay-sucesso__icone--animar");
        dispararConfete(confete);
        document.getElementById("btnFecharSucesso").focus();
    }

    camposTempoReal.forEach((campoId) => {
        const campo = form.elements[campoId];

        campo.addEventListener("input", () => {
            aplicarValidacao(campoId);

            if (campoId === "senha") {
                atualizarForcaSenha();
                if (form.confirmarSenha.value) {
                    aplicarValidacao("confirmarSenha");
                }
            }

            if (campoId === "mensagem") {
                atualizarContadorCaracteres(campo, elementos.contadorMensagem);
            }

            salvarRascunho();
        });

        campo.addEventListener("blur", () => aplicarValidacao(campoId));
    });

    form.telefone.addEventListener("input", (evento) => {
        const posicao = evento.target.selectionStart;
        const valorAnterior = evento.target.value;
        evento.target.value = aplicarMascaraTelefone(valorAnterior);
        evento.target.setSelectionRange(posicao, posicao);
        salvarRascunho();
    });

    form.telefone.addEventListener("blur", () => aplicarValidacao("telefone"));

    ["nascimento", "curso"].forEach((campoId) => {
        form.elements[campoId].addEventListener("change", () => {
            aplicarValidacao(campoId);
            salvarRascunho();
        });
    });

    form.querySelectorAll('input[name="turno"]').forEach((radio) => {
        radio.addEventListener("change", () => {
            aplicarValidacao("turno");
            salvarRascunho();
        });
    });

    form.querySelectorAll('input[name="interesses"]').forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            aplicarValidacao("interesses");
            salvarRascunho();
        });
    });

    form.termos.addEventListener("change", () => {
        aplicarValidacao("termos");
        salvarRascunho();
    });

    form.foto.addEventListener("change", async () => {
        const arquivo = form.foto.files[0] || null;
        aplicarValidacao("foto");
        await definirFotoParaSalvar(arquivo);
        exibirPreviewImagem(arquivo, elementos.imgPreview, elementos.previewFoto);
        salvarRascunho();
    });

    document.getElementById("btnToggleSenha").addEventListener("click", () => {
        alternarVisibilidadeSenha(form.senha, document.getElementById("btnToggleSenha"));
    });

    document.getElementById("btnToggleConfirmarSenha").addEventListener("click", () => {
        alternarVisibilidadeSenha(
            form.confirmarSenha,
            document.getElementById("btnToggleConfirmarSenha")
        );
    });

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!validarFormularioCompleto()) {
            const primeiroInvalido = form.querySelector(".campo-invalido, :invalid");
            if (primeiroInvalido) primeiroInvalido.focus();
            return;
        }

        preencherResumoModal(resumoConfirmacao, montarResumoConfirmacao(form));
        modal.showModal();
    });

    document.getElementById("btnConfirmarEnvio").addEventListener("click", async () => {
        const nome = form.nome.value.trim();
        const inscricao = await montarDadosInscricao(form);
        salvarInscricaoEnviada(inscricao);

        modal.close();
        limparDadosSalvos();
        form.reset();
        avisoRascunho.hidden = true;
        limparEstadosVisuais();
        abrirOverlaySucesso(nome);
    });

    document.getElementById("btnCancelarEnvio").addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("cancel", (evento) => {
        evento.preventDefault();
        modal.close();
    });

    document.getElementById("btnFecharSucesso").addEventListener("click", fecharOverlaySucesso);

    overlaySucesso.addEventListener("click", (evento) => {
        if (evento.target === overlaySucesso) {
            fecharOverlaySucesso();
        }
    });

    document.getElementById("btnDescartarRascunho").addEventListener("click", () => {
        limparDadosSalvos();
        form.reset();
        avisoRascunho.hidden = true;
        limparEstadosVisuais();
        exibirStatusRascunho(statusRascunho, "Rascunho descartado");
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            limparDadosSalvos();
            avisoRascunho.hidden = true;
            limparEstadosVisuais();
        }, 0);
    });

    const dadosRestaurados = restaurarFormulario(form);

    if (dadosRestaurados) {
        avisoRascunho.hidden = false;
        restaurarPreviewFoto(elementos.imgPreview, elementos.previewFoto);
        atualizarContadorCaracteres(form.mensagem, elementos.contadorMensagem);
        atualizarForcaSenha();
    } else {
        atualizarContadorCaracteres(form.mensagem, elementos.contadorMensagem);
    }
});
