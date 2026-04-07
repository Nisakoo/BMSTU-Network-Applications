import { MainPage } from "../main/index.js";
import { ProductDetails } from "../../components/product-details/ProductDetails.js";
import { NavigationBackButton } from "../../components/nav-back-button/NavigationBackButton.js";

export class ProductPage {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
  }

  get pageRoot() {
    return document.getElementById("product-page");
  }

  getHTML() {
    return `
        <div id="product-page"></div>
    `;
  }

  clickBack() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const backButton = new NavigationBackButton(this.pageRoot);
    backButton.render(this.clickBack.bind(this));

    const stock = new ProductDetails(this.pageRoot, this.data);
    stock.render();
  }
}
