/*
  calculator.js
  Funciones puras para calcular precios.
  Ventaja: queda separado del DOM y es fácil de testear.
*/

function calcularExtrasHotel(tipoHotel) {
  if (tipoHotel === "premium") return 250;
  if (tipoHotel === "elite") return 450;
  return 0; // standard
}

function calcularExtrasUpgrades() {
  let total = 0;

  document.querySelectorAll(".upgrade:checked").forEach(chk => {
    total += Number(chk.dataset.precio);
  });

  return total;
}

function calcularExtrasRondas(rondasExtra) {
  const precioPorRonda = 120;
  return rondasExtra * precioPorRonda;
}

function calcularExtrasNoches(noches) {
  // Base incluye 5 noches. Solo se cobra extra si supera 5.
  const nochesBase = 5;
  const precioNocheExtra = 80;

  const extras = Math.max(0, noches - nochesBase);
  return extras * precioNocheExtra;
}

function calcularTotalReserva(precioBase, personas, noches, tipoHotel, rondasExtra) {
  const extrasHotel = calcularExtrasHotel(tipoHotel);
  const extrasUpgrades = calcularExtrasUpgrades();
  const extrasRondas = calcularExtrasRondas(rondasExtra);
  const extrasNoches = calcularExtrasNoches(noches);

  const extras = extrasHotel + extrasUpgrades + extrasRondas + extrasNoches;

  const total = (precioBase + extras) * personas;

  return {
    desglose: {
      hotel: extrasHotel,
      noches: extrasNoches,
      upgrades: extrasUpgrades,
      rondas: extrasRondas
    },
    extras,
    total
  };
}
