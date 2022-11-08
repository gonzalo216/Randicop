const d = document;
export function crearFormulario(num, eliminar = false) {
  const $template = d.querySelector("template").content,
    $fragment = d.createDocumentFragment();
  fetch("/json/nombres.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      const $ids = d.querySelectorAll(`input[name="id"]`);
      let lastId;
      if ($ids.length !== 0) {
        lastId = $ids[$ids.length - 1].value;
        lastId = parseInt(lastId, 10);
        if (eliminar) {
          const $divs = d.querySelectorAll(".celda");
          if ($divs.length > 1) {
            $divs[$divs.length - 1].remove();
            lastId--;
          }
          return;
        }
      } else {
        lastId = 0;
      }
      num += lastId;
      for (let i = lastId; i < num; i++) {
        if (!json[i]) return;
        const el = json[i];
        $template.querySelector(`input[name="nombre"]`).value = el.name;
        $template.querySelector(`input[name="id"]`).value = el.id;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      }
      d.querySelector(".flex").appendChild($fragment);
    })
    .catch((error) => console.error(error));
}
export function updateJson() {
  const $celdas = d.querySelectorAll(".celda");
  $celdas.forEach(($celda, i) => {
    fetch(`/json/nombres.json/${i + 1}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        if (!json[i + 1]) return;
        const el = json[i + 1];
        el.name = $celda.querySelector(`input[name="nombre"]`).value;
        el.id = $celda.querySelector(`input[name="id"]`).value;
      })
      .catch((error) => console.error(error));
  });
}
