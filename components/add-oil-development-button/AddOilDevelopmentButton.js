export class AddOilDevelopmentButton {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <div class="oil-development-card add-btn col-auto" id="add-btn" tabindex="0">
          <div class="oil-development-card-bg">
              <div class="add-btn-placeholder"></div>
          </div>
          <div class="oil-development-card-fg">
              <div class="add-btn-content">
                  <span class="add-plus">+</span>
                  <p class="add-text">Добавить объект</p>
              </div>
          </div>
      </div>
    `;
  }

  addListeners(onClick) {
    document.getElementById("add-btn").addEventListener("click", onClick);
  }

  render(onClick) {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(onClick);
  }
}
