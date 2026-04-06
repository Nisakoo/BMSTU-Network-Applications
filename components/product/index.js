export class ProductComponent {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
  }

  getHTML() {
    return `
      <div class="big-product-card my-2">
          <div class="product-card-bg">
              <img
                  class="product-card-bg__img"
                  src="${this.data.big_src}"
              />
          </div>
          <div class="product-card-fg">
              <div class="d-flex justify-content-end">
                <p class="product-card__title">${this.data.title}</p>
              </div>
              <p class="product-card__desc">
                ${this.data.text}
              </p>
          </div>
      </div>
    `;
  }

  render() {
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);
  }
}
