import { crearDiv } from "./print_blocks.js";
import { crearBotones, titulo } from "./print_lines.js";
let finalista;
export const finalistaData = (data) => (finalista = data);
export const final = (win) => (win ? winArticle() : loseArticle());
function loseArticle() {
  crearDiv();
  titulo(
    `<h2>El ultimo jugador sobreviviente fue ${finalista.nombre}</h2>`,
    "finalista"
  );
  datos(finalista);
  titulo("", "volver");
  crearBotones(
    `Volver a Jugar`,
    `<a href="./preinicio.html">Inicio</a>`,
    "btn-final"
  );
  titulo("", "espacio");
}
function winArticle() {
  console.log(finalista);
  crearDiv();
  const nombres = [];
  for (const el of finalista) {
    nombres.push(el.nombre);
  }
  if (nombres.length === 1)
    titulo(`<h2>El ganador fue ${nombres[0]}</h2>`, "finalista");
  else
    titulo(
      `<h2>Los ganadores fueron: <br> ${nombres.join(" - ")}</h2>`,
      "finalista"
    );
  for (const el of finalista) {
    if (nombres.length !== 1) titulo(`<h3>${el.nombre}</h3>`, "nombre-winner");
    datos(el);
  }
  titulo("", "volver");
  crearBotones(
    `Volver a Jugar`,
    `<a href="./preinicio.html">Inicio</a>`,
    "btn-final"
  );
  titulo("", "espacio");
}
function datos(el) {
  const petsArray = [];
  if (el.perro) petsArray.push("<li>Perro</li>");
  if (el.gato) petsArray.push("<li>Gato</li>");
  if (!petsArray.length) petsArray.push("<li>No consiguio mascotas</li>");
  let companero = "Murio viviendo solo";
  if (el.conv) companero = `Convivio con ${el.conv.nombre}`;
  titulo(
    `
  <div><h4>Armadura</h4>
    <ul>
      <li>Casco: ${el.armourName.casco}</li>
      <li>Peto: ${el.armourName.peto}</li>
      <li>Pantalones: ${el.armourName.pantalon}</li>
      <li>Botas: ${el.armourName.botas}</li>
    </ul>
  </div>
  <div><h4>Mascotas</h4>
    <ul>
      ${petsArray.join("")}
    </ul>
  </div>
  <p>${companero}</p>
  `,
    "datos"
  );
}
