import { crearDiv } from "./print_blocks.js";
import { crearBotones, titulo } from "./print_lines.js";
import { jugs } from "./variables.js";
let finalista;
export const finalistaData = (data) => (finalista = data);
export const final = (win) => (win ? winArticle() : loseArticle());
function loseArticle() {
  crearDiv();
  let jugadores =
    jugs.length === 1 ? "El unico jugador" : `de ${jugs.length} jugadores`;
  titulo(
    `<h2>El ultimo jugador sobreviviente fue ${finalista.nombre}</h2><h5>${jugadores}</h5>`,
    "finalista"
  );
  datos(finalista);
  volver();
}
function winArticle() {
  console.log(finalista);
  crearDiv();
  const nombres = [];
  for (const el of finalista) {
    nombres.push(el.nombre);
  }
  if (nombres.length === 1)
    titulo(
      `<h2>El ganador fue ${nombres[0]}</h2><h5>Jugo solo</h5>`,
      "finalista"
    );
  else {
    titulo(
      `<h2>Los ganadores fueron: <br> ${nombres.join(" - ")}</h2>
      <h5>${nombres.length}/${jugs.length} de los jugadores</h5>`,
      "finalista"
    );
  }
  for (const el of finalista) {
    if (nombres.length !== 1) titulo(`<h3>${el.nombre}</h3>`, "nombre-winner");
    datos(el);
  }
  volver();
}
function datos(el) {
  let protag = el.protag ? "<h4>Es protagonista</h4>" : "";
  let arco = el.arco ? "<li>Arco</li>" : "";
  const petsArray = [];
  if (el.perro) petsArray.push("<li>Perro</li>");
  if (el.gato) petsArray.push("<li>Gato</li>");
  if (!petsArray.length) petsArray.push("<li>No consiguio mascotas</li>");
  let companero = el.conv ? `<p>Convivio con ${el.conv.nombre}</p>` : "";
  let trofeo = el.trofeo ? `<p>Sostuvo la cabeza de ${el.trofeo}</p>` : "";
  titulo(
    `
    <div>${protag}</div>
  <div><h4>Armadura</h4>
    <ul>
      <li>Casco: ${el.armourName.casco}</li>
      <li>Peto: ${el.armourName.peto}</li>
      <li>Pantalones: ${el.armourName.pantalon}</li>
      <li>Botas: ${el.armourName.botas}</li>
    </ul>
  </div>
  <div><h4>Herramientas</h4>
    <ul>
      <li>Espada de ${el.espada}</li>
      ${arco}
    </ul>
  </div>
  <div><h4>Mascotas</h4>
    <ul>
      ${petsArray.join("")}
    </ul>
  </div>
  ${companero}${trofeo}
  `,
    "datos"
  );
}
function volver() {
  titulo("", "volver");
  crearBotones(`Volver a Jugar`, `Volver a inicio`, "btn-final");
  titulo("", "espacio");
}
