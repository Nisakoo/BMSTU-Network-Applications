export class AddProductButton {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <div class="product-card add-btn col-auto" id="add-btn" tabindex="0">
          <div class="product-card-bg">
              <div class="add-btn-placeholder"></div>
          </div>
          <div class="product-card-fg">
              <div class="add-btn-content">
                  <span class="add-plus">+</span>
                  <p class="add-text">Добавить услугу</p>
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
