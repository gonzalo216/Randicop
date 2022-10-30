const d = document,
  $details = d.querySelector("details"),
  $expand = d.getElementById("expand");
export function toggleDescription() {
  $details.open
    ? $expand.setAttribute("src", "./../assets/svg/expand_more.svg")
    : $expand.setAttribute("src", "./../assets/svg/expand_less.svg");
}
