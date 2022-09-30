export default function hamburgerMenu(panelbtn, panel){
    const d = document;
        d.addEventListener("click", e=>{
            if (e.target.matches(panelbtn))
        })

}