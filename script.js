const form = document.getElementById("ticketForm");
const lista = document.getElementById("listaChamados");

let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
let filtro = "recentes";

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const chamado = {
    id: Date.now(),
    titulo,
    descricao,
    status: "Aberto",
    data: new Date().toLocaleString()
  };

  chamados.push(chamado);
  salvar();
  renderizar();

  form.reset();
});

function filtrar(tipo) {
  filtro = tipo;
  renderizar();
}

function renderizar() {
  lista.innerHTML = "";

  let filtrados = [...chamados];

  if (filtro === "abertos") {
    filtrados = chamados.filter(c => c.status === "Aberto");
  }

  if (filtro === "fechados") {
    filtrados = chamados.filter(c => c.status === "Fechado");
  }

  if (filtro === "recentes") {
    filtrados = [...chamados].reverse();
  }

  filtrados.forEach(c => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${c.titulo}</strong><br>
      ${c.descricao}<br><br>

      📅 ${c.data ?? "Data não disponível"}<br>

      Status: <span class="${c.status === "Fechado" ? "fechado" : "aberto"}">
        ${c.status}
      </span>

      <br>

      <button class="closeBtn" onclick="fechar(${c.id})">
        Fechar
      </button>
    `;

    lista.appendChild(li);
  });

  salvar();
}

function fechar(id) {
  chamados = chamados.map(c =>
    c.id === id ? { ...c, status: "Fechado" } : c
  );

  salvar();
  renderizar();
}

function salvar() {
  localStorage.setItem("chamados", JSON.stringify(chamados));
}

renderizar();
