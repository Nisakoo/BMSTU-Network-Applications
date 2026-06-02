export class ProductSearch {
  constructor(parent) {
    this.parent = parent;
  }

  addListeners(listener) {
    document.getElementById("search-btn").addEventListener("click", () => {
      const value = document.getElementById("search-input").value;
      listener(value);
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
