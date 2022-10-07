const d = document,
  $main = d.querySelector("main");

export default function insertar(url) {
  fetch(url)
    .then((res) => (res.ok ? res.text() : Promise.reject(res)))
    .then((html) => {
      $main.innerHTML = html;
    })
    .catch((err) => ($main.innerHTML = `<h1>${err}</h1>`));
}
