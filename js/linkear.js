const d = document;
export default function linkear(id, link){
d.addEventListener("click",(e)=>{
    if(e.target.matches(id)){
        window.location.href = link;
    }
})
}