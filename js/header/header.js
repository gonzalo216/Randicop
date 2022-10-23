const d = document,
  $header = d.querySelector(".header"),
  $title = d.querySelector("h1"),
  $logo = d.querySelector(".logo");
let topAnterior = true;
export default function scaleHeader() {
  let top;
  window.pageYOffset === 0 ? (top = true) : (top = false);
  if (top !== topAnterior) {
    topAnterior = top;
    $header.classList.toggle("sticky");
    $title.classList.toggle("sticky");
    $logo.classList.toggle("sticky");
  }
}
