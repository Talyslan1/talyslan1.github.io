const CHAVE_LOCAL_STORAGE = "cap15-inscricao";
const CHAVE_INSCRICOES = "cap15-inscricoes-enviadas";
const LIMITE_FOTO_STORAGE = 500 * 1024;

const ICONES_OLHO = {
    visivel: "../public/images/eye-visibility/eye-visible.png",
    oculto: "../public/images/eye-visibility/eye-hidden.png",
};

const ROTULOS_CURSO = {
    informatica: "Técnico em Informática",
    administracao: "Técnico em Administração",
    enfermagem: "Técnico em Enfermagem",
    edificacoes: "Técnico em Edificações",
    eletrotecnica: "Técnico em Eletrotécnica",
};

const ROTULOS_TURNO = {
    matutino: "Matutino",
    vespertino: "Vespertino",
    noturno: "Noturno",
};

const ROTULOS_INTERESSE = {
    programacao: "Programação",
    redes: "Redes de Computadores",
    "banco-dados": "Banco de Dados",
    design: "Design Digital",
    robotica: "Robótica",
    empreendedorismo: "Empreendedorismo",
};

let fotoBase64Salva = null;

function debounce(funcao, atraso) {
    let timer;

    return (...argumentos) => {
        clearTimeout(timer);
        timer = setTimeout(() => funcao(...argumentos), atraso);
    };
}

function aplicarMascaraTelefone(valor) {
    const digitos = valor.replace(/\D/g, "").slice(0, 11);

    if (digitos.length === 0) return "";
    if (digitos.length <= 2) return `(${digitos}`;
    if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

function calcularForcaSenha(senha) {
    if (!senha) {
        return { nivel: 0, texto: "" };
    }

    let pontos = 0;

    if (senha.length >= 8) pontos++;
    if (senha.length >= 12) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/\d/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 2) return { nivel: 1, texto: "Fraca" };
    if (pontos <= 4) return { nivel: 2, texto: "Média" };
    return { nivel: 3, texto: "Forte" };
}

function atualizarContadorCaracteres(textarea, elementoContador) {
    const quantidade = textarea.value.length;
    const maximo = textarea.maxLength || 500;
    elementoContador.textContent = `${quantidade} / ${maximo} caracteres`;

    if (quantidade < 50) {
        elementoContador.classList.add("contador--alerta");
    } else {
        elementoContador.classList.remove("contador--alerta");
    }
}

function alternarVisibilidadeSenha(input, botao) {
    const senhaVisivel = input.type === "text";
    input.type = senhaVisivel ? "password" : "text";

    const icone = botao.querySelector(".btn-toggle-senha__icone");
    if (icone) {
        icone.src = senhaVisivel ? ICONES_OLHO.visivel : ICONES_OLHO.oculto;
    }

    botao.setAttribute("aria-label", senhaVisivel ? "Mostrar senha" : "Ocultar senha");
    botao.setAttribute("aria-pressed", String(!senhaVisivel));
}

function arquivoParaBase64(arquivo) {
    return new Promise((resolver, rejeitar) => {
        const leitor = new FileReader();
        leitor.onload = () => resolver(leitor.result);
        leitor.onerror = rejeitar;
        leitor.readAsDataURL(arquivo);
    });
}

async function definirFotoParaSalvar(arquivo) {
    if (!arquivo) {
        fotoBase64Salva = null;
        return;
    }

    if (arquivo.size > LIMITE_FOTO_STORAGE) {
        fotoBase64Salva = null;
        return;
    }

    try {
        fotoBase64Salva = await arquivoParaBase64(arquivo);
    } catch {
        fotoBase64Salva = null;
    }
}

function salvarFormulario(form) {
    const dados = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        nascimento: form.nascimento.value,
        curso: form.curso.value,
        turno: form.turno.value,
        interesses: Array.from(form.querySelectorAll('input[name="interesses"]:checked')).map(
            (cb) => cb.value
        ),
        mensagem: form.mensagem.value,
        termos: form.termos.checked,
        fotoBase64: fotoBase64Salva,
        salvoEm: new Date().toISOString(),
    };

    try {
        localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(dados));
        return { salvo: true, comFoto: Boolean(fotoBase64Salva) };
    } catch {
        try {
            dados.fotoBase64 = null;
            localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(dados));
            return { salvo: true, comFoto: false };
        } catch {
            return { salvo: false, comFoto: false };
        }
    }
}

function restaurarFormulario(form) {
    const salvo = localStorage.getItem(CHAVE_LOCAL_STORAGE);

    if (!salvo) return null;

    try {
        const dados = JSON.parse(salvo);

        form.nome.value = dados.nome || "";
        form.email.value = dados.email || "";
        form.telefone.value = dados.telefone || "";
        form.nascimento.value = dados.nascimento || "";
        form.curso.value = dados.curso || "";
        form.mensagem.value = dados.mensagem || "";
        form.termos.checked = Boolean(dados.termos);

        if (dados.turno) {
            const radioTurno = form.querySelector(`input[name="turno"][value="${dados.turno}"]`);
            if (radioTurno) radioTurno.checked = true;
        }

        form.querySelectorAll('input[name="interesses"]').forEach((cb) => {
            cb.checked = Array.isArray(dados.interesses) && dados.interesses.includes(cb.value);
        });

        fotoBase64Salva = dados.fotoBase64 || null;

        return dados;
    } catch {
        return null;
    }
}

function limparDadosSalvos() {
    localStorage.removeItem(CHAVE_LOCAL_STORAGE);
    fotoBase64Salva = null;
}

function formatarDataBr(dataIso) {
    if (!dataIso) return "—";

    const [ano, mes, dia] = dataIso.split("-");
    if (!ano || !mes || !dia) return dataIso;

    return `${dia}/${mes}/${ano}`;
}

function formatarDataHoraBr(dataIso) {
    if (!dataIso) return "—";

    const data = new Date(dataIso);
    if (Number.isNaN(data.getTime())) return dataIso;

    return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function obterInscricoes() {
    const salvo = localStorage.getItem(CHAVE_INSCRICOES);

    if (!salvo) return [];

    try {
        const lista = JSON.parse(salvo);
        return Array.isArray(lista) ? lista : [];
    } catch {
        return [];
    }
}

async function montarDadosInscricao(form) {
    let fotoBase64 = fotoBase64Salva;
    const arquivo = form.foto.files[0];

    if (arquivo && !fotoBase64) {
        try {
            fotoBase64 = await arquivoParaBase64(arquivo);
        } catch {
            fotoBase64 = null;
        }
    }

    return {
        id: crypto.randomUUID(),
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        nascimento: form.nascimento.value,
        curso: form.curso.value,
        turno: form.turno.value,
        interesses: Array.from(form.querySelectorAll('input[name="interesses"]:checked')).map(
            (cb) => cb.value
        ),
        mensagem: form.mensagem.value.trim(),
        fotoBase64,
        enviadoEm: new Date().toISOString(),
    };
}

function salvarInscricaoEnviada(inscricao) {
    const lista = obterInscricoes();
    lista.unshift(inscricao);

    try {
        localStorage.setItem(CHAVE_INSCRICOES, JSON.stringify(lista));
        return true;
    } catch {
        inscricao.fotoBase64 = null;

        try {
            localStorage.setItem(CHAVE_INSCRICOES, JSON.stringify(lista));
            return true;
        } catch {
            return false;
        }
    }
}

function removerInscricao(id) {
    const lista = obterInscricoes().filter((item) => item.id !== id);
    localStorage.setItem(CHAVE_INSCRICOES, JSON.stringify(lista));
    return lista;
}

function limparInscricoes() {
    localStorage.removeItem(CHAVE_INSCRICOES);
}

function rotularInteresses(interesses) {
    if (!Array.isArray(interesses) || interesses.length === 0) return "—";

    return interesses
        .map((valor) => ROTULOS_INTERESSE[valor] || valor)
        .join(", ");
}

function montarResumoConfirmacao(form) {
    const interesses = Array.from(form.querySelectorAll('input[name="interesses"]:checked'))
        .map((cb) => ROTULOS_INTERESSE[cb.value] || cb.value)
        .join(", ");

    return [
        { rotulo: "Nome", valor: form.nome.value.trim() },
        { rotulo: "E-mail", valor: form.email.value.trim() },
        { rotulo: "Telefone", valor: form.telefone.value.trim() },
        { rotulo: "Nascimento", valor: formatarDataBr(form.nascimento.value) },
        { rotulo: "Curso", valor: ROTULOS_CURSO[form.curso.value] || "—" },
        { rotulo: "Turno", valor: ROTULOS_TURNO[form.turno.value] || "—" },
        { rotulo: "Interesses", valor: interesses || "—" },
        { rotulo: "Mensagem", valor: `${form.mensagem.value.trim().length} caracteres` },
        { rotulo: "Foto", valor: form.foto.files[0]?.name || (fotoBase64Salva ? "Foto em rascunho" : "Não enviada") },
    ];
}

function preencherResumoModal(elementoResumo, itens) {
    elementoResumo.replaceChildren();

    itens.forEach(({ rotulo, valor }) => {
        const dt = document.createElement("dt");
        dt.textContent = rotulo;

        const dd = document.createElement("dd");
        dd.textContent = valor;

        elementoResumo.appendChild(dt);
        elementoResumo.appendChild(dd);
    });
}

function exibirStatusRascunho(elemento, mensagem) {
    if (!elemento) return;

    elemento.textContent = mensagem;
    elemento.hidden = !mensagem;

    if (mensagem) {
        elemento.classList.add("status-rascunho--visivel");
        setTimeout(() => elemento.classList.remove("status-rascunho--visivel"), 2000);
    }
}

function dispararConfete(container) {
    const cores = ["#1e8449", "#1a5276", "#d68910", "#f39c12", "#8e44ad", "#2980b9"];

    container.replaceChildren();

    for (let i = 0; i < 50; i++) {
        const particula = document.createElement("span");
        particula.className = "confete__particula";
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        particula.style.animationDelay = `${Math.random() * 0.6}s`;
        particula.style.animationDuration = `${2 + Math.random() * 2}s`;
        container.appendChild(particula);
    }
}

function exibirPreviewImagem(arquivo, imgElement, figureElement) {
    if (!arquivo) {
        if (fotoBase64Salva) {
            imgElement.src = fotoBase64Salva;
            figureElement.hidden = false;
            return;
        }

        figureElement.hidden = true;
        imgElement.src = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = (evento) => {
        imgElement.src = evento.target.result;
        figureElement.hidden = false;
    };

    leitor.readAsDataURL(arquivo);
}

function restaurarPreviewFoto(imgElement, figureElement) {
    if (!fotoBase64Salva) {
        figureElement.hidden = true;
        imgElement.src = "";
        return;
    }

    imgElement.src = fotoBase64Salva;
    figureElement.hidden = false;
}
