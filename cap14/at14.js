// Pegando os elementos que vou usar no script
const cabecalho = document.querySelector("header");
const tituloPagina = document.getElementById("tituloPagina");
const secaoPerfil = document.getElementById("perfil");
const fotoPerfil = document.getElementById("fotoPerfil");
const nomePerfil = document.getElementById("nomePerfil");
const cursoPerfil = document.getElementById("cursoPerfil");
const biografiaPerfil = document.getElementById("biografiaPerfil");

const temaSelect = document.getElementById("temaSelect");
const fonteRange = document.getElementById("fonteRange");
const valorFonte = document.getElementById("valorFonte");
const mostrarBio = document.getElementById("mostrarBio");

const emailInput = document.getElementById("emailInput");
const telefoneInput = document.getElementById("telefoneInput");
const emailExibido = document.getElementById("emailExibido");
const telefoneExibido = document.getElementById("telefoneExibido");

const contadorAcoes = document.getElementById("contadorAcoes");
const ultimaAcao = document.getElementById("ultimaAcao");

const btnAlterarNome = document.getElementById("btnAlterarNome");
const btnAlterarCurso = document.getElementById("btnAlterarCurso");
const btnAlterarFoto = document.getElementById("btnAlterarFoto");
const btnDestacarPerfil = document.getElementById("btnDestacarPerfil");
const btnRestaurar = document.getElementById("btnRestaurar");
const btnAtualizarContato = document.getElementById("btnAtualizarContato");

// Guardo como estava no começo pra conseguir restaurar depois
const perfilOriginal = {
  nome: nomePerfil.textContent,
  curso: cursoPerfil.textContent,
  foto: fotoPerfil.src,
  tamanhoFonte: fonteRange.value,
  biografiaVisivel: mostrarBio.checked,
};

// Desafio extra: mais fotos na pasta imagens/
const fotosPerfil = [
  "imagens/perfil1.jpg",
  "imagens/perfil2.jpg",
  "imagens/perfil3.jpg",
  "imagens/perfil4.jpg",
];
let indiceFotoAtual = 0;

// Desafio extra: lista de cursos pra ir alternando
const cursosDisponiveis = [
  "Técnico em Informática",
  "Análise e Desenvolvimento de Sistemas",
  "Bacharelado em Sistemas de Informação",
  "Ciência da Computação",
  "Engenharia de Software",
];
let indiceCursoAtual = 0;

// Desafio extra: cor do título conforme o tema escolhido
const coresTitulo = {
  claro: "#a8431f",
  escuro: "#d4623a",
  azul: "#1a5080",
};

let totalAcoes = 0;

// Atualiza o contador e mostra qual foi a última coisa que o usuário fez
function registrarAcao(descricao) {
  totalAcoes += 1;
  contadorAcoes.textContent = totalAcoes;
  ultimaAcao.textContent = descricao;
}

// Troca o tema mudando a classe do body (o CSS cuida do resto)
function aplicarTema(tema) {
  document.body.classList.remove("tema-escuro", "tema-azul");

  if (tema === "escuro") {
    document.body.classList.add("tema-escuro");
  } else if (tema === "azul") {
    document.body.classList.add("tema-azul");
  }
}

// Desafio extra: muda a cor do título conforme o tema
function aplicarCorTitulo(tema) {
  tituloPagina.style.color = coresTitulo[tema] || coresTitulo.claro;
}

// Desafio extra: mensagem de boas-vindas com o nome do perfil
function mostrarBoasVindas() {
  const mensagem = document.createElement("p");
  mensagem.className = "boas-vindas";
  mensagem.textContent =
    "Olá, " +
    nomePerfil.textContent +
    "! Bem-vindo(a) ao seu painel acadêmico.";

  cabecalho.appendChild(mensagem);

  setTimeout(function () {
    mensagem.classList.add("saindo");
    setTimeout(function () {
      mensagem.remove();
    }, 550);
  }, 4500);
}

// Desafio extra: validação simples de e-mail e telefone
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, "");
  return numeros.length >= 10 && numeros.length <= 11;
}

function limparErrosValidacao() {
  emailInput.classList.remove("campo-erro");
  telefoneInput.classList.remove("campo-erro");
  document.getElementById("erroEmail").textContent = "";
  document.getElementById("erroTelefone").textContent = "";
}

// Crio as mensagens de erro via JS (sem mexer no HTML do professor)
function criarMensagensValidacao() {
  const erroEmail = document.createElement("span");
  erroEmail.id = "erroEmail";
  erroEmail.className = "msg-erro";
  emailInput.parentElement.appendChild(erroEmail);

  const erroTelefone = document.createElement("span");
  erroTelefone.id = "erroTelefone";
  erroTelefone.className = "msg-erro";
  telefoneInput.parentElement.appendChild(erroTelefone);
}

// Funcionalidade 1 - Alterar Nome
btnAlterarNome.addEventListener("click", function () {
  const novoNome = prompt("Digite o novo nome:", nomePerfil.textContent);

  if (novoNome !== null && novoNome.trim() !== "") {
    nomePerfil.textContent = novoNome.trim();
    registrarAcao("Alteração de nome");
  }
});

// Funcionalidade 2 - Alterar Curso (com lista extra de cursos)
btnAlterarCurso.addEventListener("click", function () {
  indiceCursoAtual = (indiceCursoAtual + 1) % cursosDisponiveis.length;
  cursoPerfil.textContent = "Curso: " + cursosDisponiveis[indiceCursoAtual];
  registrarAcao("Alteração de curso");
});

// Funcionalidade 3 - Alterar Foto
btnAlterarFoto.addEventListener("click", function () {
  indiceFotoAtual = (indiceFotoAtual + 1) % fotosPerfil.length;

  fotoPerfil.classList.add("foto-trocando");
  fotoPerfil.src = fotosPerfil[indiceFotoAtual];

  fotoPerfil.addEventListener(
    "animationend",
    function () {
      fotoPerfil.classList.remove("foto-trocando");
    },
    { once: true },
  );

  registrarAcao("Alteração de foto");
});

// Funcionalidade 4 - Destacar Perfil
btnDestacarPerfil.addEventListener("click", function () {
  secaoPerfil.classList.add("perfil-destacado");
  registrarAcao("Destaque de perfil");
});

// Funcionalidade 5 - Restaurar Perfil
btnRestaurar.addEventListener("click", function () {
  nomePerfil.textContent = perfilOriginal.nome;
  cursoPerfil.textContent = perfilOriginal.curso;
  fotoPerfil.src = perfilOriginal.foto;
  secaoPerfil.classList.remove("perfil-destacado");

  indiceFotoAtual = 0;
  indiceCursoAtual = 0;

  fonteRange.value = perfilOriginal.tamanhoFonte;
  biografiaPerfil.style.fontSize = perfilOriginal.tamanhoFonte + "px";
  valorFonte.textContent = perfilOriginal.tamanhoFonte + "px";

  mostrarBio.checked = perfilOriginal.biografiaVisivel;
  biografiaPerfil.classList.toggle("biografia-oculta", !mostrarBio.checked);

  temaSelect.value = "claro";
  aplicarTema("claro");
  aplicarCorTitulo("claro");

  limparErrosValidacao();
  registrarAcao("Restauração de perfil");
});

// Funcionalidade 6 - Alterar Tema
temaSelect.addEventListener("change", function () {
  aplicarTema(temaSelect.value);
  aplicarCorTitulo(temaSelect.value);

  const nomesTema = { claro: "Claro", escuro: "Escuro", azul: "Azul" };
  registrarAcao("Alteração de tema (" + nomesTema[temaSelect.value] + ")");
});

// Funcionalidade 7 - Tamanho da Fonte
fonteRange.addEventListener("input", function () {
  const tamanho = fonteRange.value;
  biografiaPerfil.style.fontSize = tamanho + "px";
  valorFonte.textContent = tamanho + "px";
  registrarAcao("Alteração de tamanho da fonte");
});

// Funcionalidade 8 - Exibir ou Ocultar Biografia
mostrarBio.addEventListener("change", function () {
  biografiaPerfil.classList.toggle("biografia-oculta", !mostrarBio.checked);

  if (mostrarBio.checked) {
    registrarAcao("Exibição da biografia");
  } else {
    registrarAcao("Ocultação da biografia");
  }
});

// Funcionalidade 9 - Atualizar Contato (com validação no desafio extra)
btnAtualizarContato.addEventListener("click", function () {
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();
  let formularioValido = true;

  limparErrosValidacao();

  if (email !== "" && !validarEmail(email)) {
    emailInput.classList.add("campo-erro");
    document.getElementById("erroEmail").textContent =
      "E-mail inválido. Ex: nome@email.com";
    formularioValido = false;
  }

  if (telefone !== "" && !validarTelefone(telefone)) {
    telefoneInput.classList.add("campo-erro");
    document.getElementById("erroTelefone").textContent =
      "Telefone inválido. Use 10 ou 11 dígitos.";
    formularioValido = false;
  }

  if (!formularioValido) {
    registrarAcao("Erro na validação de contato");
    return;
  }

  emailExibido.textContent =
    "E-mail: " + (email !== "" ? email : "não informado");
  telefoneExibido.textContent =
    "Telefone: " + (telefone !== "" ? telefone : "não informado");

  registrarAcao("Atualização de contato");
});

// desafio extra
criarMensagensValidacao();
aplicarCorTitulo("claro");
mostrarBoasVindas();
