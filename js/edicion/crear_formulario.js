const $template = d.querySelector("template").content,
    $fragment = d.createDocumentFragment();
const jsonNames = () => fetch("./../json/nombres.json")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) =>{
        json.forEach(el => {
            $template.querySelector(".input-name").textContent = el.name;
            let $clone = d.importNode($template,true);
            $fragment.appendChild($clone);
        });
        d.querySelector(".flex").appendChild($fragment);
    })
    .catch((error) => (d.querySelector(".flex").innerHTML = `<h1>${error}</h1>`));
    jsonNames();