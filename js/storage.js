/*
  storage.js
  - Lee la reserva guardada en LocalStorage
  - La muestra en mis-reservas.html
  - Permite eliminarla (opcional pero suma puntos)
*/

function formatearUSD(valor) {
  return Number(valor).toLocaleString("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function leerReserva() {
  const data = localStorage.getItem("reservaGolfExplorers");
  return data ? JSON.parse(data) : null;
}

function eliminarReserva() {
  localStorage.removeItem("reservaGolfExplorers");
}

function renderizarReserva(reserva) {
  const contenedor = document.getElementById("contenedorReserva");
  contenedor.innerHTML = "";

  const upgradesTexto = (reserva.upgrades && reserva.upgrades.length > 0)
    ? reserva.upgrades.map(u => `• ${u.nombre}`).join("<br>")
    : "Sin upgrades";

  const html = `
    <article class="col-12 col-lg-8">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="h5 fw-bold mb-3">Resumen de la reserva</h2>

          <p class="mb-1"><span class="fw-bold">Destino:</span> ${reserva.destino}</p>
          <p class="mb-1"><span class="fw-bold">Nombre:</span> ${reserva.nombreCliente}</p>
          <p class="mb-1"><span class="fw-bold">Email:</span> ${reserva.emailCliente}</p>
          <p class="mb-1"><span class="fw-bold">Fecha de salida:</span> ${reserva.fechaSalida}</p>

          <hr>

          <p class="mb-1"><span class="fw-bold">Personas:</span> ${reserva.personas}</p>
          <p class="mb-1"><span class="fw-bold">Noches:</span> ${reserva.noches}</p>
          <p class="mb-1"><span class="fw-bold">Hotel:</span> ${reserva.hotel}</p>
          <p class="mb-1"><span class="fw-bold">Rondas extra:</span> ${reserva.rondasExtra}</p>

          <div class="mt-3">
            <p class="fw-bold mb-1">Upgrades</p>
            <p class="text-muted mb-0">${upgradesTexto}</p>
          </div>

          <hr>

          <p class="mb-1"><span class="fw-bold">Total extras:</span> ${formatearUSD(reserva.totalExtras)}</p>
          <p class="mb-0 fs-5"><span class="fw-bold">Total final:</span> ${formatearUSD(reserva.totalFinal)}</p>
        </div>
      </div>
    </article>
  `;

  contenedor.insertAdjacentHTML("beforeend", html);
}

function iniciarMisReservas() {
  const sinReservas = document.getElementById("sinReservas");
  const btnEliminar = document.getElementById("btnEliminarReserva");

  const reserva = leerReserva();

  if (!reserva) {
    sinReservas.classList.remove("d-none");
    return;
  }

  renderizarReserva(reserva);
  btnEliminar.classList.remove("d-none");

  btnEliminar.addEventListener("click", () => {
    eliminarReserva();
    window.location.reload();
  });
}

// Solo corre si existe el contenedor (para evitar errores si alguien incluye el script en otra página)
if (document.getElementById("contenedorReserva")) {
  iniciarMisReservas();
}
