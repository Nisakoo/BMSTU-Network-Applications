export class SearchComponent {
  constructor(parent) {
    this.parent = parent;
  }

  addListeners(listener) {
    const input = document.getElementById("search-input");
    input.addEventListener("input", (event) => {
      listener(event.target.value);
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
