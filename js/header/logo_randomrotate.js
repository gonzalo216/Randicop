const $logo = document.querySelector(".logo-img");
let rotation = 0;
export function rotarLogo() {
  rotation === 0 ? (rotation = 360) : (rotation = 0);
  $logo.style.transform = `rotate(${rotation}deg)`;
}
