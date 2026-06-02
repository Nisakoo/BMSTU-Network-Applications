import { ProductDetails } from "../../components/product-details/ProductDetails.js";

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

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const stock = new ProductDetails(this.pageRoot, this.data);
    stock.render();
  }
}
