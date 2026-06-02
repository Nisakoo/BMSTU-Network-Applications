export class OilDevelopmentCard {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="oil-development-card col-auto">
          <button class="oil-development-card__delete" id="delete-oil-development-${data.id}" data-id="${data.id}"></button>
          <div class="oil-development-card-bg">
              <img
                  class="oil-development-card-bg__img"
                  src="${data.src}"
              />
          </div>
          <div class="oil-development-card-fg">
              <div>
                  <p class="oil-development-card__title">${data.title}</p>
                  <p class="oil-development-card__desc">
                    ${data.text}
                  </p>
              </div>
              <button class="oil-development-card__btn" id="click-oil-development-${data.id}" data-id="${data.id}">Подробнее</button>
          </div>
      </div>
    `;
  }

  addListeners(data, onClick, onDelete) {
    document
      .getElementById(`click-oil-development-${data.id}`)
      .addEventListener("click", onClick);

    document
      .getElementById(`delete-oil-development-${data.id}`)
      .addEventListener("click", onDelete);
  }

  render(data, onClick, onDelete) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data, onClick, onDelete);
  }
}
