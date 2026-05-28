import { countIdentic } from "../../utils/utils.js";

export class ServiceSearch {
  constructor(parent) {
    this.parent = parent;
    this.searchHistory = [];
  }

  addListeners(listener) {
    const input = document.getElementById("search-input");
    const button = document.getElementById("search-button");

    const performSearch = () => {
      const searchValue = input.value;
      listener(searchValue);

      if (searchValue.trim().length > 2) {
        this.searchHistory.push(searchValue.toLowerCase());
        const duplicatesCount = countIdentic(this.searchHistory);
        if (duplicatesCount > 0) {
          console.log(
            `[Аналитика поиска] Повторяющихся запросов в этой сессии: ${duplicatesCount}`,
          );
        }
      }
    };

    button.addEventListener("click", performSearch);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        performSearch();
      }
    });
  }

  getHTML() {
    return `
      <div class="search-wrapper">
        <input
          id="search-input"
          class="search-input"
          type="text"
          placeholder="Поиск услуг..."
          autocomplete="off"
        >
        <button
          id="search-button"
          class="search-button"
          type="button"
        >
          Найти
        </button>
      </div>
    `;
  }

  render(listener) {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(listener);
  }
}
