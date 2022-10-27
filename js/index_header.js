import hamburgerMenu from "./header/hamburgermenu.js";
import scaleHeader from "./header/header.js";
import { rotarLogo } from "./header/logo_randomrotate.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", "aside", ".panel");
});
window.addEventListener("scroll", (e) => scaleHeader());
setInterval(rotarLogo, 5000);
