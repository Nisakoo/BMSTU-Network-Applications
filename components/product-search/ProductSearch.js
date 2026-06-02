import { countIdentic } from "../../utils/utils.js";

export class ProductSearch {
  constructor(parent) {
    this.parent = parent;
    this.searchHistory = [];
  }

  addListeners(listener) {
    document.getElementById("search-btn").addEventListener("click", () => {
      const searchValue = document.getElementById("search-input").value;
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
        <button id="search-btn" class="search-btn" type="button">Поиск</button>
      </div>
    `;
  }

  render(listener) {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(listener);
  }
}
