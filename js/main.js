/*
  main.js
  - destino.html: renderiza detalle del destino por URL (?id=)
  - reserva.html: calcula precio dinámico y muestra resumen con desglose
  - además: valida y guarda la reserva en LocalStorage al confirmar
*/

/* ================= UTILIDADES ================= */

function obtenerParametroURL(clave) {
  const url = new URL(window.location.href);
  return url.searchParams.get(clave);
}

function formatearUSD(valor) {
  return Number(valor).toLocaleString("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function buscarDestinoPorId(id) {
  const idNumerico = Number(id);
  return DESTINOS.find(d => d.id === idNumerico) || null;
}

/* ================= DESTINO (destino.html) ================= */

function renderizarDestino(destino) {
  const img = document.getElementById("destinoImagen");
  const tipo = document.getElementById("destinoTipo");
  const nombre = document.getElementById("destinoNombre");
  const descripcion = document.getElementById("destinoDescripcion");
  const incluye = document.getElementById("destinoIncluye");
  const mejorEpoca = document.getElementById("destinoMejorEpoca");
  const precio = document.getElementById("destinoPrecio");
  const btnReservar = document.getElementById("btnReservar");

  img.src = destino.imagenHero;
  img.alt = destino.nombre;

  tipo.textContent = destino.tipo === "nacional" ? "Nacional" : "Internacional";
  tipo.classList.remove("etiqueta-nacional", "etiqueta-internacional");
  tipo.classList.add(destino.tipo === "nacional" ? "etiqueta-nacional" : "etiqueta-internacional");

  nombre.textContent = destino.nombre;
  descripcion.textContent = destino.descripcion;
  mejorEpoca.textContent = destino.mejorEpoca;
  precio.textContent = formatearUSD(destino.precioBase);

  incluye.innerHTML = "";
  destino.incluyeBase.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    incluye.appendChild(li);
  });

  btnReservar.href = `reserva.html?id=${destino.id}`;
}

function iniciarPaginaDestino() {
  const id = obtenerParametroURL("id");
  const destino = buscarDestinoPorId(id);

  if (!destino) {
    const mensaje = document.getElementById("mensajeError");
    if (mensaje) mensaje.classList.remove("d-none");
    return;
  }

  renderizarDestino(destino);
}

// Si existe el h1 del destino, estoy en destino.html
if (document.getElementById("destinoNombre")) {
  iniciarPaginaDestino();
}

/* ================= RESERVA (reserva.html) ================= */

function iniciarPaginaReserva() {
  // 1) obtengo id desde URL
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));

  // 2) busco destino
  const destinoSeleccionado = buscarDestinoPorId(id);

  if (!destinoSeleccionado) {
    window.location.href = "destinos.html";
    return;
  }

  // 3) referencias a resumen
  const resumenDestino = document.getElementById("resumenDestino");
  const resumenBase = document.getElementById("resumenBase");
  const resumenExtras = document.getElementById("resumenExtras");
  const resumenTotal = document.getElementById("resumenTotal");

  // desglose
  const extraHotel = document.getElementById("extraHotel");
  const extraNoches = document.getElementById("extraNoches");
  const extraUpgrades = document.getElementById("extraUpgrades");
  const extraRondas = document.getElementById("extraRondas");

  // 4) inputs
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const inputFecha = document.getElementById("fechaSalida");
  const inputPersonas = document.getElementById("personas");
  const inputNoches = document.getElementById("noches");
  const selectHotel = document.getElementById("hotel");
  const inputRondas = document.getElementById("rondasExtra");

  // 5) cargo datos base
  resumenDestino.textContent = destinoSeleccionado.nombre;
  resumenBase.textContent = formatearUSD(destinoSeleccionado.precioBase);

  // fecha mínima = hoy
  if (inputFecha) {
    const hoy = new Date().toISOString().split("T")[0];
    inputFecha.min = hoy;
  }

  // ===== Helpers para validación (mensajes personalizados) =====
  const errorNombre = document.getElementById("errorNombre");
  const errorEmail = document.getElementById("errorEmail");
  const errorFecha = document.getElementById("errorFecha");
  const errorPersonas = document.getElementById("errorPersonas");
  const errorNoches = document.getElementById("errorNoches");
  const errorRondas = document.getElementById("errorRondas");

  function marcarError(input, contenedorError, mensaje) {
    if (!input) return;
    input.classList.add("is-invalid");
    if (contenedorError) contenedorError.textContent = mensaje;
  }

  function limpiarError(input, contenedorError) {
    if (!input) return;
    input.classList.remove("is-invalid");
    if (contenedorError) contenedorError.textContent = "";
  }

  function validarFormulario() {
    let esValido = true;

    limpiarError(inputNombre, errorNombre);
    limpiarError(inputEmail, errorEmail);
    limpiarError(inputFecha, errorFecha);
    limpiarError(inputPersonas, errorPersonas);
    limpiarError(inputNoches, errorNoches);
    limpiarError(inputRondas, errorRondas);

    // Nombre: solo letras y espacios
    const nombre = (inputNombre?.value || "").trim();
    const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{3,}$/;
    if (!regexNombre.test(nombre)) {
      marcarError(inputNombre, errorNombre, "Ingresá un nombre válido (solo letras y espacios).");
      esValido = false;
    }

    // Email: formato básico
    const email = (inputEmail?.value || "").trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      marcarError(inputEmail, errorEmail, "Ingresá un email válido (ej: nombre@mail.com).");
      esValido = false;
    }

    // Fecha: obligatoria y no pasada
    const fecha = inputFecha?.value || "";
    if (!fecha) {
      marcarError(inputFecha, errorFecha, "Seleccioná una fecha de salida.");
      esValido = false;
    } else {
      const hoy = new Date().toISOString().split("T")[0];
      if (fecha < hoy) {
        marcarError(inputFecha, errorFecha, "La fecha no puede ser anterior a hoy.");
        esValido = false;
      }
    }

    // Personas: mínimo 1
    const personas = Number(inputPersonas?.value);
    if (!Number.isInteger(personas) || personas < 1) {
      marcarError(inputPersonas, errorPersonas, "La cantidad de personas debe ser 1 o más.");
      esValido = false;
    }

    // Noches: mínimo 5 (base)
    const noches = Number(inputNoches?.value);
    if (!Number.isInteger(noches) || noches < 5) {
      marcarError(inputNoches, errorNoches, "Las noches deben ser 5 o más.");
      esValido = false;
    }

    // Rondas extra: mínimo 0
    const rondasExtra = Number(inputRondas?.value);
    if (!Number.isInteger(rondasExtra) || rondasExtra < 0) {
      marcarError(inputRondas, errorRondas, "Las rondas extra no pueden ser negativas.");
      esValido = false;
    }

    return esValido;
  }

  function obtenerUpgradesSeleccionados() {
    const upgrades = [];

    document.querySelectorAll(".upgrade:checked").forEach(chk => {
      const label = document.querySelector(`label[for="${chk.id}"]`);
      upgrades.push({
        id: chk.id,
        nombre: label ? label.textContent.trim() : chk.id,
        precio: Number(chk.dataset.precio)
      });
    });

    return upgrades;
  }

  // 6) calcula y actualiza resumen
  function actualizarResumen() {
    const personas = Number(inputPersonas.value) || 1;
    const noches = Number(inputNoches.value) || 5;
    const rondasExtra = Number(inputRondas.value) || 0;
    const hotel = selectHotel.value;

    // Esta función viene de calculator.js
    const resultado = calcularTotalReserva(
      destinoSeleccionado.precioBase,
      personas,
      noches,
      hotel,
      rondasExtra
    );

    // Desglose (por persona)
    if (extraHotel) extraHotel.textContent = formatearUSD(resultado.desglose.hotel);
    if (extraNoches) extraNoches.textContent = formatearUSD(resultado.desglose.noches);
    if (extraUpgrades) extraUpgrades.textContent = formatearUSD(resultado.desglose.upgrades);
    if (extraRondas) extraRondas.textContent = formatearUSD(resultado.desglose.rondas);

    // Totales
    resumenExtras.textContent = formatearUSD(resultado.extras * personas);
    resumenTotal.textContent = formatearUSD(resultado.total);
  }

  // 7) eventos para cálculo dinámico
  inputPersonas.addEventListener("input", actualizarResumen);
  inputNoches.addEventListener("input", actualizarResumen);
  inputRondas.addEventListener("input", actualizarResumen);
  selectHotel.addEventListener("change", actualizarResumen);

  document.querySelectorAll(".upgrade").forEach(chk => {
    chk.addEventListener("change", actualizarResumen);
  });

  // 8) primera ejecución
  actualizarResumen();

  // ================= GUARDADO EN LOCALSTORAGE =================

  const formReserva = document.getElementById("formReserva");
  const mensajeOk = document.getElementById("mensajeOk");

  formReserva.addEventListener("submit", function (e) {
    e.preventDefault(); // evito recarga

    if (!validarFormulario()) return;

    // recalculo final por seguridad antes de guardar
    const personas = Number(inputPersonas.value) || 1;
    const noches = Number(inputNoches.value) || 5;
    const rondasExtra = Number(inputRondas.value) || 0;
    const hotel = selectHotel.value;

    const resultado = calcularTotalReserva(
      destinoSeleccionado.precioBase,
      personas,
      noches,
      hotel,
      rondasExtra
    );

    const reserva = {
      idDestino: destinoSeleccionado.id,
      destino: destinoSeleccionado.nombre,
      nombreCliente: inputNombre.value.trim(),
      emailCliente: inputEmail.value.trim(),
      fechaSalida: inputFecha.value,
      personas,
      noches,
      hotel,
      upgrades: obtenerUpgradesSeleccionados(),
      rondasExtra,
      totalExtras: resultado.extras * personas,
      totalFinal: resultado.total,
      fechaRegistro: new Date().toISOString()
    };

    localStorage.setItem("reservaGolfExplorers", JSON.stringify(reserva));

    if (mensajeOk) {
      mensajeOk.classList.remove("d-none");
    }
  });
}

// Si existe el form, estoy en reserva.html
if (document.getElementById("formReserva")) {
  iniciarPaginaReserva();
}
