export class NavigationBackButton {
  constructor(parent) {
    this.parent = parent;
  }

  addListeners(listener) {
    document.getElementById("back-button").addEventListener("click", listener);
  }

  getHTML() {
    return `
        <button id="back-button" class="back-btn" type="button">Назад</button>
    `;
  }

  render(listener) {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(listener);
  }
}
