export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="product-card col-auto">
          <button class="product-card__delete" id="delete-card-${data.id}" data-id="${data.id}"></button>
          <div class="product-card-bg">
              <img
                  class="product-card-bg__img"
                  src="${data.src}"
              />
          </div>
          <div class="product-card-fg">
              <div>
                  <p class="product-card__title">${data.title}</p>
                  <p class="product-card__desc">
                    ${data.text}
                  </p>
              </div>
              <button class="product-card__btn" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
          </div>
      </div>
    `;
  }

  addListeners(data, onClick, onDelete) {
    document
      .getElementById(`click-card-${data.id}`)
      .addEventListener("click", onClick);

    document
      .getElementById(`delete-card-${data.id}`)
      .addEventListener("click", onDelete);
  }

  render(data, onClick, onDelete) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data, onClick, onDelete);
  }
}
