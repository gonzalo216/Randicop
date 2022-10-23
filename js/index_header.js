import hamburgerMenu from "./header/hamburgermenu.js";
import scaleHeader from "./header/header.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", ".panel");
});
window.addEventListener("scroll", (e) => scaleHeader());
