import { ServicePage } from "../service/index.js";
import { ServiceCard } from "../../components/service-card/ServiceCard.js";
import { AddServiceButton } from "../../components/add-service-button/AddServiceButton.js";
import { ServiceSearch } from "../../components/service-search/ServiceSearch.js";
import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/serviceUrls.js";

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
    ajax.get(serviceUrls.getServices(), (data) => {
      this.renderCards(data);
    });
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;

    const servicePage = new ServicePage(this.parent, cardId);
    servicePage.render();
  }

  deleteCard(e) {
    const cardId = e.target.dataset.id;
    ajax.delete(serviceUrls.deleteServiceById(cardId), () => {
      this.getData();
    });
  }

  addCard(e) {
    // Дублируем первую карточку как в оригинальном задании, но через API
    ajax.get(serviceUrls.getServices(), (data) => {
      if (data && data.length > 0) {
        const firstService = data[0];
        const { id, ...newServiceData } = firstService; // Удаляем ID для создания новой
        ajax.post(serviceUrls.createService(), newServiceData, () => {
          this.getData();
        });
      }
    });
  }

  filterCards(searchValue) {
    ajax.get(
      `${serviceUrls.getServices()}?title=${encodeURIComponent(searchValue)}`,
      (data) => {
        this.renderCards(data);
      },
    );
  }

  renderCards(services) {
    this.cardContainer.innerHTML = "";

    const addButton = new AddServiceButton(this.cardContainer);
    addButton.render(this.addCard.bind(this));

    services.forEach((item) => {
      const serviceCard = new ServiceCard(this.cardContainer);
      serviceCard.render(
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

    const search = new ServiceSearch(this.searchContainer);
    search.render(this.filterCards.bind(this));

    this.getData();
  }
}
