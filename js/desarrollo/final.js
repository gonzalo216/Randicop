import { crearDiv } from "./print_blocks.js";
import { crearBotones, titulo } from "./print_lines.js";
let finalista;
export const finalistaData = (data) => (finalista = data);
export function final() {
  crearDiv();
  titulo(
    `<h2>El ultimo jugador sobreviviente fue ${finalista.nombre}</h2>`,
    "finalista"
  );
  const petsArray = [];
  if (finalista.perro) petsArray.push("<li>Perro</li>");
  if (finalista.gato) petsArray.push("<li>Gato</li>");
  if (!petsArray.length) petsArray.push("<li>No consiguio mascotas</li>");
  let companero = "Murio viviendo solo";
  if (finalista.conv) companero = `Convivio con ${finalista.conv.nombre}`;
  titulo(
    `
  <div><h4>Armadura</h4>
    <ul>
      <li>Casco: ${finalista.armourName.casco}</li>
      <li>Peto: ${finalista.armourName.peto}</li>
      <li>Pantalones: ${finalista.armourName.pantalon}</li>
      <li>Botas: ${finalista.armourName.botas}</li>
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
  titulo("", "volver");
  crearBotones(
    `<a href="./preinicio.html">Inicio</a>`,
    `Volver a Jugar`,
    "btn-final"
  );
}
