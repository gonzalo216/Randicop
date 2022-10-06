const d = document,
  $main = d.querySelector("main"),
  $desarrolloJs = d.getElementById("index");
  $edicionJs = d.getElementById("crear-formulario")

const insertar = (url) => {
  fetch(url)
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((html) => {
      $main.innerHTML = html;
    })
    .catch((error) => ($main.innerHTML = `<h1>${error}</h1>`));
};

d.addEventListener("DOMContentLoaded", (e) => {
  insertar("./edicion.html");
  $edicionJs.setAttribute("src", "./../js/edicion/crear_formulario.js");
});
d.addEventListener("click", (e) => {
  if (e.target.matches(".iniciar")) {
    e.preventDefault();
    insertar("./desarrollo.html");
    $desarrolloJs.setAttribute("src", "./../js/desarrollo/index_desarrollo.js");
  }
});
