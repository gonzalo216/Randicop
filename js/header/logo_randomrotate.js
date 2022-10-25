import { getRandomIntInclusive } from "../desarrollo/funciones.js";

const $logo = document.querySelector(".logo-img");
let rotation = 0;
export function rotarLogo() {
  rotation = getRandomIntInclusive(360);
  $logo.style.transform = `rotate(${rotation}deg)`;
}
