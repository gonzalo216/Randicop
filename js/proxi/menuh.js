export default function hamburgerMenu(panelBtn, panel) {
  var d = document;
  d.addEventListener("click", e => {
    if (e.target.matches(panel) || e.target.matches(`${panelBtn} *`)) {
      d.querySelector(panel).classList.toggle("is-active");
      d.querySelector(panelBtn).classList.toggle("is-active");
    }
  });
}
