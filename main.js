import { MainPage } from "./pages/main/index.js";
import { NavbarComponent } from "./components/navbar/index.js";

const navbar = document.getElementById("navbar");
const navbarComponent = new NavbarComponent(navbar);
navbarComponent.render({
  title: "Разработка месторождений",
});

const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();
