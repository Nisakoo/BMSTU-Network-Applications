import { ServiceDetails } from "../../components/service-details/ServiceDetails.js";
import { ajax } from "../../modules/ajax.js";
import { serviceUrls } from "../../modules/serviceUrls.js";
import { MainPage } from "../main/index.js";
import { EditServicePage } from "../edit-service/index.js";

export class ServicePage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  get pageRoot() {
    return document.getElementById("service-page");
  }

  getHTML() {
    return `
        <div id="service-page"></div>
    `;
  }

  async getData() {
    const data = await ajax.get(serviceUrls.getServiceById(this.id));
    this.renderData(data);
  }

  async deleteService() {
    await ajax.delete(serviceUrls.deleteServiceById(this.id));
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  editService() {
    const editPage = new EditServicePage(this.parent, this.id);
    editPage.render();
  }

  renderData(data) {
    const serviceDetails = new ServiceDetails(this.pageRoot, data);
    serviceDetails.render(
      this.deleteService.bind(this),
      this.editService.bind(this),
    );
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    this.getData();
  }
}
