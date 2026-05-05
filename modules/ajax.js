class Ajax {
  /**
   * GET запрос
   * @param {string} url - Адрес запроса
   * @returns {Promise<any>}
   */
  async get(url) {
    try {
      const response = await fetch(url);
      return await this._handleResponse(response);
    } catch (e) {
      console.error("Fetch error:", e);
      throw e;
    }
  }

  /**
   * POST запрос
   * @param {string} url - Адрес запроса
   * @param {object} data - Данные для отправки
   * @returns {Promise<any>}
   */
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await this._handleResponse(response);
    } catch (e) {
      console.error("Fetch error:", e);
      throw e;
    }
  }

  /**
   * PATCH запрос
   * @param {string} url - Адрес запроса
   * @param {object} data - Данные для обновления
   * @returns {Promise<any>}
   */
  async patch(url, data) {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await this._handleResponse(response);
    } catch (e) {
      console.error("Fetch error:", e);
      throw e;
    }
  }

  /**
   * DELETE запрос
   * @param {string} url - Адрес запроса
   * @returns {Promise<any>}
   */
  async delete(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      return await this._handleResponse(response);
    } catch (e) {
      console.error("Fetch error:", e);
      throw e;
    }
  }

  /**
   * Обработчик ответа (приватный метод)
   * @param {Response} response - Объект ответа fetch
   * @returns {Promise<any>}
   */
  async _handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    try {
      return await response.json();
    } catch (e) {
      // Если контент пустой или не JSON, но статус успешный (например, 204 No Content)
      if (response.status === 204 || response.status === 200) {
        return null;
      }
      throw e;
    }
  }
}

export const ajax = new Ajax();
