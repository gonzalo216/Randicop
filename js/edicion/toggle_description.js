const d = document,
    $details = d.querySelector("details"),
    $expand = d.getElementById("expand");
export function toggleDescription(){
    $details.open
        ?$expand.setAttribute("src", "./../assets/expand_more.svg")
        :$expand.setAttribute("src", "./../assets/expand_less.svg");
}