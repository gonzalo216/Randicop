import { getRandomIntInclusive } from "../desarrollo/funciones.js";

const $logo = document.querySelector(".logo");
let rotation = 0;
export function rotarLogo() {
  // rotation = getRandomIntInclusive(360);
  rotation === 0 ? rotation = 360 : rotation = 0;
  $logo.style.transform = `rotate(${rotation}deg)`;
}
