/*
  destinos.js
  Objetivo:
  - Mostrar TODOS los destinos (DESTINOS de data.js) en cards como en el Home
  - Permitir buscar por nombre
  - Permitir filtrar por tipo (todos/nacional/internacional)
*/

function recortarTexto(texto, max) {
  if (!texto) return "";
  return texto.length > max ? texto.slice(0, max).trim() + "..." : texto;
}

function crearCardDestino(destino) {
  const textoTipo = destino.tipo === "nacional" ? "Nacional" : "Internacional";
  const claseTipo = destino.tipo === "nacional" ? "etiqueta-nacional" : "etiqueta-internacional";

  const descripcionCorta = recortarTexto(destino.descripcion, 70);

  return `
    <article class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${destino.imagenHero}" class="card-img-top img-card-destino" alt="${destino.nombre}">
        <div class="card-body">
          <span class="etiqueta-destino ${claseTipo}">${textoTipo}</span>
          <h2 class="h5 mt-2">${destino.nombre}</h2>
          <p class="text-muted mb-3">${descripcionCorta}</p>
          <a href="destino.html?id=${destino.id}" class="btn btn-outline-dark w-100">Ver experiencia</a>
        </div>
      </div>
    </article>
  `;
}

function renderizarListado(lista) {
  const contenedor = document.getElementById("contenedorDestinos");
  const mensaje = document.getElementById("mensajeSinResultados");

  contenedor.innerHTML = "";

  if (lista.length === 0) {
    mensaje.classList.remove("d-none");
    return;
  }

  mensaje.classList.add("d-none");

  lista.forEach(destino => {
    contenedor.insertAdjacentHTML("beforeend", crearCardDestino(destino));
  });
}

function filtrarDestinos(textoBusqueda, tipo) {
  const busqueda = (textoBusqueda || "").trim().toLowerCase();

  return DESTINOS.filter(d => {
    const coincideNombre = d.nombre.toLowerCase().includes(busqueda);
    const coincideTipo = tipo === "todos" ? true : d.tipo === tipo;
    return coincideNombre && coincideTipo;
  });
}

function iniciarPaginaDestinos() {
  const inputBusqueda = document.getElementById("busquedaDestino");
  const selectTipo = document.getElementById("filtroTipo");
  const btnLimpiar = document.getElementById("btnLimpiarFiltros");

  // Render inicial: todos
  renderizarListado(DESTINOS);

  function aplicarFiltros() {
    const lista = filtrarDestinos(inputBusqueda.value, selectTipo.value);
    renderizarListado(lista);
  }

  inputBusqueda.addEventListener("input", aplicarFiltros);
  selectTipo.addEventListener("change", aplicarFiltros);

  btnLimpiar.addEventListener("click", () => {
    inputBusqueda.value = "";
    selectTipo.value = "todos";
    renderizarListado(DESTINOS);
  });
}

if (document.getElementById("contenedorDestinos")) {
  iniciarPaginaDestinos();
}
