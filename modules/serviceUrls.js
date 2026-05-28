class ServiceUrls {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  getServices() {
    return `${this.baseUrl}/oil_development`;
  }

  getServiceById(id) {
    return `${this.baseUrl}/oil_development/${id}`;
  }

  createService() {
    return `${this.baseUrl}/oil_development`;
  }

  deleteServiceById(id) {
    return `${this.baseUrl}/oil_development/${id}`;
  }

  updateServiceById(id) {
    return `${this.baseUrl}/oil_development/${id}`;
  }
}

export const serviceUrls = new ServiceUrls();
