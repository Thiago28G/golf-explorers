# Golf Explorers – Plataforma Web Turística

**Versión:** 1.0.0 (SemVer)

Este proyecto es mi trabajo final de la materia **Aplicaciones Web I**.  
Desarrollé una plataforma web ficticia llamada **Golf Explorers**, una agencia especializada en **paquetes turísticos de golf** nacionales e internacionales.

El objetivo principal es integrar los contenidos vistos en la cursada: **HTML5 semántico, CSS, Bootstrap, JavaScript, DOM, validaciones, cálculos dinámicos, uso de Storage, Git/GitHub y deploy**.

- **Repositorio:** [github.com/Thiago28G/golf-explorers](https://github.com/Thiago28G/golf-explorers)
- **Sitio en vivo:** [golf-explorers.vercel.app](https://golf-explorers.vercel.app)

---

## Funcionalidad del sitio

El sitio permite:

- **Visualizar destinos** de golf nacionales e internacionales.
- **Filtrar y buscar destinos** por nombre y tipo.
- Ver el **detalle de cada destino** (información, mejor época, precio base, qué incluye).
- **Simular y reservar un paquete**, con:
  - Datos del viajero.
  - Selección de hotel y upgrades.
  - Cálculo dinámico del precio total.
- **Validar datos del usuario** con mensajes de error personalizados.
- **Guardar la reserva en LocalStorage**.
- Consultar la **última reserva guardada** en la sección “Mis reservas”.
- Enviar una **consulta** a través del formulario de contacto (simulado, sin backend).

---

## Páginas principales

- `index.html`: página de inicio con destacados.
- `destinos.html`: listado completo de destinos con filtros.
- `destino.html`: detalle de un destino seleccionado por `id` en la URL.
- `reserva.html`: simulación y reserva del paquete turístico.
- `contacto.html`: formulario de contacto con validaciones.
- `mis-reservas.html`: muestra la última reserva guardada en el navegador.

---

## Tecnologías utilizadas

- **HTML5**
- **CSS3** (estilos personalizados + responsive básico)
- **Bootstrap 5.3** (framework CSS)
- **JavaScript**
  - Manipulación del DOM
  - Eventos
  - Validaciones personalizadas
  - Cálculos dinámicos
  - LocalStorage
- **Git & GitHub** para control de versiones (SemVer para versionado)
- **Deploy** en **Vercel**  

---

## Estructura del proyecto

- `index.html`, `destinos.html`, `destino.html`, `reserva.html`, `contacto.html`, `mis-reservas.html`
- `css/`
  - `styles.css`
- `js/`
  - `data.js` (datos de destinos)
  - `destinos.js` (listado y filtros de destinos)
  - `main.js` (detalle de destino y lógica de reserva)
  - `calculator.js` (cálculos de precios)
  - `storage.js` (lectura/escritura en LocalStorage)
  - `contacto.js` (validaciones del formulario de contacto)
- `assets/`
  - `img/` (imágenes de destinos y hero)

---

## Detalle de funcionalidades

### Destinos y filtros

- Los destinos están centralizados en `data.js` en un array `DESTINOS`.
- `destinos.html` muestra todas las experiencias y permite:
  - **Buscar por nombre**.
  - **Filtrar por tipo** (nacional / internacional).
- El listado se arma dinámicamente con JavaScript.

### Detalle de destino

- `destino.html` recibe el `id` por query string (`?id=...`).
- Con ese `id` busca el destino en `DESTINOS` y renderiza:
  - Imagen principal.
  - Tipo (nacional/internacional).
  - Descripción.
  - Mejor época.
  - Precio base.
  - Qué incluye el paquete base.
- Desde ahí se puede ir a la **reserva** de ese destino.

### Reserva y cálculos dinámicos

- En `reserva.html` el usuario completa:
  - Nombre, email, fecha de salida, cantidad de personas, noches.
  - Nivel de hotel (standard/premium/elite).
  - Upgrades (transfer, caddie, seguro, rondas extra).
- `calculator.js` se encarga de los **cálculos de precios**:
  - Extras por tipo de hotel.
  - Noches adicionales.
  - Upgrades seleccionados.
  - Rondas extra.
- El **resumen** se actualiza en tiempo real al modificar los campos.
- El botón **“Confirmar reserva”** solo se habilita cuando **nombre, email y fecha** son válidos.
- Al confirmar:
  - Se validan todos los campos con mensajes personalizados.
  - Se guarda la reserva en **LocalStorage** (`reservaGolfExplorers`).
  - Se muestra un cartel de éxito con el botón **“Ver mi reserva”** que lleva a `mis-reservas.html`.
  - El formulario se limpia y el botón vuelve a deshabilitarse hasta completar de nuevo nombre, email y fecha.

### Mis reservas (LocalStorage)

- `mis-reservas.html` lee la reserva desde LocalStorage.
- Si existe, muestra un card resumen con todos los datos y montos.
- Permite **eliminar la reserva guardada**.

### Formulario de contacto

- `contacto.html` incluye un formulario con:
  - Nombre y apellido.
  - Email.
  - Asunto (select).
  - Mensaje con contador de caracteres (máximo 300).
- `contacto.js`:
  - Valida nombre, email, asunto y mensaje.
  - Usa los `invalid-feedback` para mostrar errores personalizados.
  - Habilita / deshabilita el botón **“Enviar”** según si el formulario es válido.
  - Muestra un mensaje de éxito al “enviar” (simulado en frontend).

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Thiago28G/golf-explorers.git
   ```

2. Entrar a la carpeta del proyecto:

   ```bash
   cd golf-explorers
   ```

3. Abrir `index.html` en el navegador (o usar una extensión tipo **Live Server** en VS Code/Cursor para evitar problemas de CORS con archivos locales).

---

## Deploy

El proyecto está publicado en **Vercel**. Cada push a la rama `main` en GitHub dispara un deploy automático.

- **URL:** [https://golf-explorers.vercel.app](https://golf-explorers.vercel.app)

La corrección del trabajo se hace sobre esta versión en producción.

---

## Autor

- **Thiago Gallego** — *Proyecto final* — [Thiago28G](https://github.com/Thiago28G)  
- Materia: Aplicaciones Web I

---