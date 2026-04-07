import { ProductPage } from "../product/index.js";
import { ProductCard } from "../../components/product-card/ProductCard.js";
import { AddProductButton } from "../../components/add-product-button/AddProductButton.js";
import { ProductSearch } from "../../components/product-search/ProductSearch.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.state = this.getData();
    this.globalCardId = 6;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  get cardContainer() {
    return document.getElementById("cards");
  }

  get searchContainer() {
    return document.getElementById("search-container");
  }

  getHTML() {
    return `
      <div id="main-page">
        <div id="search-container" class="d-flex justify-content-center mt-4">
        </div>
        <div id="cards" class="row g-4 gap-2"></div>
      </div>
    `;
  }

  getData() {
    return [
      {
        id: 1,
        src: "/assets/images/image_1.webp",
        big_src: "/assets/images/big_image_1.webp",
        title: "Бурение",
        text: "Скважины, которые работают. Без пауз",
      },
      {
        id: 2,
        src: "/assets/images/image_2.webp",
        big_src: "/assets/images/big_image_2.webp",
        title: "Геологоразведка",
        text: "Знаем, где лежит ваша прибыль",
      },
      {
        id: 3,
        src: "/assets/images/image_3.webp",
        big_src: "/assets/images/big_image_3.png",
        title: "Добыча",
        text: "Максимальная отдача каждого пласта",
      },
      {
        id: 4,
        src: "/assets/images/image_4.webp",
        big_src: "/assets/images/big_image_4.webp",
        title: "Нефтепереработка",
        text: "Больше, чем просто сырье",
      },
      {
        id: 5,
        src: "/assets/images/image_5.webp",
        big_src: "/assets/images/big_image_5.webp",
        title: "Экология",
        text: "Работаем чисто",
      },
    ];
  }

  findProductById(id) {
    for (let product of this.state) {
      if (product.id == id) {
        return product;
      }
    }
    return null;
  }

  deleteProductById(id) {
    this.state = this.state.filter((product) => product.id != id);
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;

    const productPage = new ProductPage(
      this.parent,
      this.findProductById(cardId),
    );
    productPage.render();
  }

  deleteCard(e) {
    const cardId = e.target.dataset.id;
    this.deleteProductById(cardId);
    this.render();
  }

  addCard(e) {
    const firstCard = this.getData()[0];
    firstCard.id = this.globalCardId;
    this.globalCardId++;

    this.state.push(firstCard);

    const productCard = new ProductCard(this.cardContainer);
    productCard.render(
      firstCard,
      this.clickCard.bind(this),
      this.deleteCard.bind(this),
    );
  }

  filterCards(searchValue) {
    const filtered = this.state.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    this.renderCards(filtered);
  }

  renderCards(cards) {
    this.cardContainer.innerHTML = "";

    const addButton = new AddProductButton(this.cardContainer);
    addButton.render(this.addCard.bind(this));

    cards.forEach((item) => {
      const productCard = new ProductCard(this.cardContainer);
      productCard.render(
        item,
        this.clickCard.bind(this),
        this.deleteCard.bind(this),
      );
    });
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    const search = new ProductSearch(this.searchContainer);
    search.render(this.filterCards.bind(this));

    this.renderCards(this.state);
  }
}
