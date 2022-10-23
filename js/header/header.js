const d = document,
  $header = d.querySelector(".header"),
  $content = d.querySelectorAll(".header > *");
let topAnterior = true;
export default function scaleHeader() {
  let top;
  window.pageYOffset === 0 ? (top = true) : (top = false);
  if (top !== topAnterior) {
    topAnterior = top;
    $header.classList.toggle("sticky");
    // $title.classList.toggle("sticky");
    // $logo.classList.toggle("sticky");
    $content.forEach((el) => el.classList.toggle("sticky"));
  }
}
