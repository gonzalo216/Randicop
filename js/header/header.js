window.onscroll = function () {
  myFunction();
};

const $header = document.getElementById("sh");
const sticky = $header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    $header.classList.add("sticky");
  } else {
    $header.classList.remove("sticky");
  }
}
