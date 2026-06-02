class OilDevelopmentUrls {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  getOilDevelopments() {
    return `${this.baseUrl}/oil_development`;
  }

  getOilDevelopmentById(id) {
    return `${this.baseUrl}/oil_development/${id}`;
  }

  createOilDevelopment() {
    return `${this.baseUrl}/oil_development`;
  }

  deleteOilDevelopmentById(id) {
    return `${this.baseUrl}/oil_development/${id}`;
  }

  updateOilDevelopmentById(id) {
    return `${this.baseUrl}/oil_development/${id}`;
  }
}

export const oilDevelopmentUrls = new OilDevelopmentUrls();
