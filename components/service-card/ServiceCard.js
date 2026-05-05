export class ServiceCard {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="service-card col-auto">
          <button class="service-card__delete" id="delete-service-${data.id}" data-id="${data.id}"></button>
          <div class="service-card-bg">
              <img
                  class="service-card-bg__img"
                  src="${data.src}"
              />
          </div>
          <div class="service-card-fg">
              <div>
                  <p class="service-card__title">${data.title}</p>
                  <p class="service-card__desc">
                    ${data.text}
                  </p>
              </div>
              <button class="service-card__btn" id="click-service-${data.id}" data-id="${data.id}">Подробнее</button>
          </div>
      </div>
    `;
  }

  addListeners(data, onClick, onDelete) {
    document
      .getElementById(`click-service-${data.id}`)
      .addEventListener("click", onClick);

    document
      .getElementById(`delete-service-${data.id}`)
      .addEventListener("click", onDelete);
  }

  render(data, onClick, onDelete) {
    const html = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", html);
    this.addListeners(data, onClick, onDelete);
  }
}
