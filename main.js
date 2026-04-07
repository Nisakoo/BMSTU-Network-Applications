import { MainPage } from "./pages/main/index.js";
import { HeaderNavbar } from "./components/header-navbar/HeaderNavbar.js";

const navbar = document.getElementById("navbar");
const navbarComponent = new HeaderNavbar(navbar);
navbarComponent.render({
  title: "Разработка месторождений",
});

const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();
