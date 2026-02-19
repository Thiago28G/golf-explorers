/* 
  data.js
  Acá guardo los datos de los destinos en un solo lugar. Si cambio una imagen o texto, lo hago acá y se actualiza en todas las páginas.
*/

const DESTINOS = [
  {
    id: 1,
    tipo: "nacional",
    nombre: "Patagonia Elite — Bariloche",
    descripcion: "Golf con lagos y montañas. Patagonia en estado puro.",
    precioBase: 1250,
    imagenHero: "assets/img/bariloche.png",
    incluyeBase: ["Hotel standard", "3 rondas", "Transfers"],
    mejorEpoca: "Octubre a abril"
  },
  {
    id: 2,
    tipo: "nacional",
    nombre: "Buenos Aires Premium — Pilar",
    descripcion: "Escapada urbana premium cerca de la ciudad.",
    precioBase: 980,
    imagenHero: "assets/img/pilar.png",
    incluyeBase: ["Hotel standard", "3 rondas", "Transfers"],
    mejorEpoca: "Marzo a junio / Agosto a noviembre"
  },
  {
    id: 3,
    tipo: "nacional",
    nombre: "Golf & Wine — Mendoza",
    descripcion: "Golf de día, vinos de noche. Experiencia boutique.",
    precioBase: 1100,
    imagenHero: "assets/img/mendoza.png",
    incluyeBase: ["Hotel standard", "3 rondas", "Transfers"],
    mejorEpoca: "Septiembre a mayo"
  },
  {
    id: 4,
    tipo: "internacional",
    nombre: "St Andrews — Escocia",
    descripcion: "La cuna del golf. Historia y tradición en estado puro.",
    precioBase: 3800,
    imagenHero: "assets/img/standrews.png",
    incluyeBase: ["Hotel standard", "3 rondas", "Transfers"],
    mejorEpoca: "Mayo a septiembre"
  },
  {
    id: 5,
    tipo: "internacional",
    nombre: "Algarve — Portugal",
    descripcion: "Resorts, sol y golf europeo de lujo.",
    precioBase: 2700,
    imagenHero: "assets/img/algarve.png",
    incluyeBase: ["Hotel standard", "3 rondas", "Transfers"],
    mejorEpoca: "Marzo a junio / Septiembre a noviembre"
  },
  {
    id: 6,
    tipo: "internacional",
    nombre: "Pebble Beach — California",
    descripcion: "Ícono mundial: golf sobre el Pacífico.",
    precioBase: 4200,
    imagenHero: "assets/img/pebble.png",
    incluyeBase: ["Hotel standard", "3 rondas", "Transfers"],
    mejorEpoca: "Abril a octubre"
  }
];
