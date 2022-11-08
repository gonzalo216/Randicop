const d = document;
export function toggleDescription() {
  const $details = d.querySelector("details"),
    $expand = d.getElementById("expand");
  $details.open
    ? $expand.setAttribute("src", "/assets/svg/expand_more.svg")
    : $expand.setAttribute("src", "/assets/svg/expand_less.svg");
}
