import { OilDevelopmentDetails } from "../../components/oil-development-details/OilDevelopmentDetails.js";
import { ajax } from "../../modules/ajax.js";
import { oilDevelopmentUrls } from "../../modules/oilDevelopmentUrls.js";
import { MainPage } from "../main/index.js";
import { EditOilDevelopmentPage } from "../edit-oil-development/index.js";

export class OilDevelopmentPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  get pageRoot() {
    return document.getElementById("oil-development-page");
  }

  getHTML() {
    return `
        <div id="oil-development-page"></div>
    `;
  }

  getData() {
    ajax.get(oilDevelopmentUrls.getOilDevelopmentById(this.id), (data) => {
      this.renderData(data);
    });
  }

  deleteOilDevelopment() {
    ajax.delete(oilDevelopmentUrls.deleteOilDevelopmentById(this.id), () => {
      const mainPage = new MainPage(this.parent);
      mainPage.render();
    });
  }

  editOilDevelopment() {
    const editPage = new EditOilDevelopmentPage(this.parent, this.id);
    editPage.render();
  }

  renderData(data) {
    const details = new OilDevelopmentDetails(this.pageRoot, data);
    details.render(
      this.deleteOilDevelopment.bind(this),
      this.editOilDevelopment.bind(this),
    );
  }

  render() {
    this.parent.innerHTML = "";
    const html = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", html);

    this.getData();
  }
}
