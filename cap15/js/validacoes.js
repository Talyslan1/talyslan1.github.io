const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONE = /^\(82\) \d{5}-\d{4}$/;
const REGEX_SENHA_MAIUSCULA = /[A-Z]/;
const REGEX_SENHA_NUMERO = /\d/;
const IDADE_MINIMA = 16;
const TAMANHO_MAX_FOTO = 2 * 1024 * 1024;
const TIPOS_FOTO_PERMITIDOS = ["image/jpeg", "image/png"];

function validarNome(valor) {
    const nome = valor.trim();

    if (!nome) {
        return { valido: false, mensagem: "O nome é obrigatório." };
    }

    if (nome.length < 3) {
        return { valido: false, mensagem: "O nome deve ter no mínimo 3 caracteres." };
    }

    return { valido: true, mensagem: "" };
}

function validarEmail(valor) {
    const email = valor.trim();

    if (!email) {
        return { valido: false, mensagem: "O e-mail é obrigatório." };
    }

    if (!REGEX_EMAIL.test(email)) {
        return { valido: false, mensagem: "Informe um e-mail válido." };
    }

    return { valido: true, mensagem: "" };
}

function validarTelefone(valor) {
    const telefone = valor.trim();

    if (!telefone) {
        return { valido: false, mensagem: "O telefone é obrigatório." };
    }

    if (!REGEX_TELEFONE.test(telefone)) {
        return { valido: false, mensagem: "Use o formato (82) 99999-9999." };
    }

    return { valido: true, mensagem: "" };
}

function validarNascimento(valor) {
    if (!valor) {
        return { valido: false, mensagem: "A data de nascimento é obrigatória." };
    }

    const hoje = new Date();
    const nascimento = new Date(valor + "T00:00:00");

    if (Number.isNaN(nascimento.getTime())) {
        return { valido: false, mensagem: "Data de nascimento inválida." };
    }

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();

    if (
        mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }

    if (idade < IDADE_MINIMA) {
        return {
            valido: false,
            mensagem: `O aluno deve ter pelo menos ${IDADE_MINIMA} anos.`,
        };
    }

    return { valido: true, mensagem: "" };
}

function validarCurso(valor) {
    if (!valor) {
        return { valido: false, mensagem: "Selecione um curso." };
    }

    return { valido: true, mensagem: "" };
}

function validarTurno(valor) {
    if (!valor) {
        return { valido: false, mensagem: "Selecione um turno." };
    }

    return { valido: true, mensagem: "" };
}

function validarInteresses(checkboxesMarcados) {
    if (checkboxesMarcados.length < 2) {
        return {
            valido: false,
            mensagem: "Selecione pelo menos 2 áreas de interesse.",
        };
    }

    return { valido: true, mensagem: "" };
}

function validarSenha(valor) {
    if (!valor) {
        return { valido: false, mensagem: "A senha é obrigatória." };
    }

    if (valor.length < 8) {
        return { valido: false, mensagem: "A senha deve ter no mínimo 8 caracteres." };
    }

    if (!REGEX_SENHA_MAIUSCULA.test(valor)) {
        return { valido: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula." };
    }

    if (!REGEX_SENHA_NUMERO.test(valor)) {
        return { valido: false, mensagem: "A senha deve conter pelo menos um número." };
    }

    return { valido: true, mensagem: "" };
}

function validarConfirmarSenha(senha, confirmacao) {
    if (!confirmacao) {
        return { valido: false, mensagem: "Confirme sua senha." };
    }

    if (senha !== confirmacao) {
        return { valido: false, mensagem: "As senhas não coincidem." };
    }

    return { valido: true, mensagem: "" };
}

function validarMensagem(valor) {
    const mensagem = valor.trim();

    if (!mensagem) {
        return { valido: false, mensagem: "A mensagem é obrigatória." };
    }

    if (mensagem.length < 50) {
        return { valido: false, mensagem: "A mensagem deve ter no mínimo 50 caracteres." };
    }

    if (mensagem.length > 500) {
        return { valido: false, mensagem: "A mensagem deve ter no máximo 500 caracteres." };
    }

    return { valido: true, mensagem: "" };
}

function validarFoto(arquivo) {
    if (!arquivo) {
        return { valido: true, mensagem: "" };
    }

    if (!TIPOS_FOTO_PERMITIDOS.includes(arquivo.type)) {
        return { valido: false, mensagem: "A foto deve ser JPG ou PNG." };
    }

    if (arquivo.size > TAMANHO_MAX_FOTO) {
        return { valido: false, mensagem: "A foto deve ter no máximo 2 MB." };
    }

    return { valido: true, mensagem: "" };
}

function validarTermos(aceito) {
    if (!aceito) {
        return { valido: false, mensagem: "Você deve aceitar os termos para continuar." };
    }

    return { valido: true, mensagem: "" };
}
