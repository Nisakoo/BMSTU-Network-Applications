import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/serviceUrls.js";
import { MainPage } from "../main/index.js";

export class EditServicePage {
  constructor(parent, id = null) {
    this.parent = parent;
    this.id = id;
  }

  getHTML() {
    return `
      <div id="edit-service-page" class="container mt-4 pb-5">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h2 style="font-weight: 700; letter-spacing: -1px;">${this.id ? "Редактирование" : "Новая услуга"}</h2>
          <button class="service-card__btn" style="color: black; border-color: rgba(0,0,0,0.2);" id="back-btn">Назад</button>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-8 shadow-sm p-4 rounded-4" style="background: white; border: 1px solid rgba(0,0,0,0.05);">
            <form id="edit-service-form">
              <div class="mb-4">
                <label for="title" class="form-label fw-bold">Название объекта</label>
                <input type="text" class="search-input" id="title" placeholder="Введите название (напр. Месторождение №1)">
              </div>

              <div class="mb-4">
                <label for="text" class="form-label fw-bold">Техническое описание</label>
                <textarea class="search-input" id="text" rows="4" style="border-radius: 20px;" placeholder="Введите описание характеристик..."></textarea>
              </div>

              <div class="row">
                <div class="col-md-6 mb-4">
                  <label for="src" class="form-label fw-bold">Превью (URL)</label>
                  <input type="text" class="search-input" id="src" placeholder="assets/images/image_1.webp">
                </div>
                <div class="col-md-6 mb-4">
                  <label for="big_src" class="form-label fw-bold">Фоновое фото (URL)</label>
                  <input type="text" class="search-input" id="big_src" placeholder="assets/images/big_image_1.webp">
                </div>
              </div>

              <div class="d-grid mt-4">
                <button type="submit" class="service-card__btn" style="background-color: var(--green-color); border-color: var(--green-color); color: white; padding: 15px;" id="save-btn">
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  async getData() {
    if (this.id) {
      const data = await ajax.get(serviceUrls.getServiceById(this.id));
      if (data) {
        document.getElementById("title").value = data.title || "";
        document.getElementById("text").value = data.text || "";
        document.getElementById("src").value = data.src || "";
        document.getElementById("big_src").value = data.big_src || "";
      }
    }
  }

  async save(e) {
    e.preventDefault();

    const data = {
      title: document.getElementById("title").value,
      text: document.getElementById("text").value,
      src: document.getElementById("src").value,
      big_src: document.getElementById("big_src").value,
    };

    try {
      if (this.id) {
        await ajax.patch(serviceUrls.updateServiceById(this.id), data);
      } else {
        await ajax.post(serviceUrls.createService(), data);
      }

      const mainPage = new MainPage(this.parent);
      mainPage.render();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Не удалось сохранить данные");
    }
  }

  addListeners() {
    document.getElementById("back-btn").addEventListener("click", () => {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    });

    document
      .getElementById("edit-service-form")
      .addEventListener("submit", this.save.bind(this));
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    this.addListeners();
    this.getData();
  }
}
