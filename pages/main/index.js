import { OilDevelopmentPage } from "../oil-development/index.js";
import { OilDevelopmentCard } from "../../components/oil-development-card/OilDevelopmentCard.js";
import { AddOilDevelopmentButton } from "../../components/add-oil-development-button/AddOilDevelopmentButton.js";
import { OilDevelopmentSearch } from "../../components/oil-development-search/OilDevelopmentSearch.js";
import { ajax } from "../../modules/ajax.js";
import { oilDevelopmentUrls } from "../../modules/oilDevelopmentUrls.js";
import { EditOilDevelopmentPage } from "../edit-oil-development/index.js";

export class MainPage {
  constructor(parent) {
    this.parent = parent;
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
    ajax.get(oilDevelopmentUrls.getOilDevelopments(), (data) => {
      this.renderCards(data);
    });
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;

    const oilDevelopmentPage = new OilDevelopmentPage(this.parent, cardId);
    oilDevelopmentPage.render();
  }

  deleteCard(e) {
    const cardId = e.target.dataset.id;
    ajax.delete(oilDevelopmentUrls.deleteOilDevelopmentById(cardId), () => {
      this.getData();
    });
  }

  addCard() {
    const editPage = new EditOilDevelopmentPage(this.parent);
    editPage.render();
  }

  filterCards(searchValue) {
    ajax.get(
      `${oilDevelopmentUrls.getOilDevelopments()}?title=${encodeURIComponent(searchValue)}`,
      (data) => {
        this.renderCards(data);
      },
    );
  }

  renderCards(oilDevelopments) {
    this.cardContainer.innerHTML = "";

    const addButton = new AddOilDevelopmentButton(this.cardContainer);
    addButton.render(this.addCard.bind(this));

    oilDevelopments.forEach((item) => {
      const oilDevelopmentCard = new OilDevelopmentCard(this.cardContainer);
      oilDevelopmentCard.render(
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

    const search = new OilDevelopmentSearch(this.searchContainer);
    search.render(this.filterCards.bind(this));

    this.getData();
  }
}
