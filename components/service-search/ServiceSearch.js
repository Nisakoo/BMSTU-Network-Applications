import { countIdentic } from "../../utils/utils.js";

export class ServiceSearch {
  constructor(parent) {
    this.parent = parent;
    this.searchHistory = [];
  }

  addListeners(listener) {
    const input = document.getElementById("search-input");
    input.addEventListener("input", (event) => {
      const searchValue = event.target.value;
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
      </div>
    `;
  }

  render(listener) {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(listener);
  }
}
