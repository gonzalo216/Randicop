const d = document,
  $header = d.querySelector(".header"),
  $title = d.querySelector("h1"),
  $minei = d.querySelector("h2"),
  $logo = d.querySelector(".logo-link"),
  $button = d.querySelector(".panel-btn");
let topAnterior = true;
export default function scaleHeader() {
  let top;
  window.pageYOffset === 0 ? (top = true) : (top = false);
  if (top !== topAnterior) {
    topAnterior = top;
    $header.classList.toggle("sticky");
    $title.classList.toggle("sticky");
    $minei.classList.toggle("sticky");
    $logo.classList.toggle("sticky");
    $button.classList.toggle("sticky");

  }
}
