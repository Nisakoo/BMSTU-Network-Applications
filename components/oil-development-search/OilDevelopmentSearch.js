import { countIdentic, debounce } from "../../utils/utils.js";

export class OilDevelopmentSearch {
  constructor(parent) {
    this.parent = parent;
    this.searchHistory = [];
  }

  addListeners(listener) {
    const input = document.getElementById("search-input");

    const debouncedSearch = debounce((searchValue) => {
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
    }, 300);

    input.addEventListener("input", (event) => {
      debouncedSearch(event.target.value);
    });
  }

  getHTML() {
    return `
      <div class="search-wrapper">
        <input
          id="search-input"
          class="search-input"
          type="text"
          placeholder="Поиск объектов..."
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
