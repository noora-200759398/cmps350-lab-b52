class Repository {
  async readAccounts(type) {
    const response = await fetch(this.#urlPathQuery("/api/accounts", {
      type: type
    }), {
      method: 'GET'
    });

    if (response.status === 200) {
      return await response.json();
    }
  }

  async readAccount(id) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}`, {}), {
      method: "GET",
    });

    if (response.status === 200) {
      return await response.json();
    }
  }

  async createAccount(body) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/`, {}), {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      return await response.json();
    } else if (response.status === 409) {
      return await response.text();
    }
  }

  async updateAccount(id, body) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}`, {}), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      return await response.json();
    }
  }

  async deleteAccount(id) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}`, {}), {
      method: "DELETE",
    });

    if (response.status === 204) {
      return await response.text();
    }
  }

  async createTransaction(id, body) {
    const response = await fetch(this.#urlPathQuery(`/api/accounts/${id}/transaction`, {}), {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      return await response.json();
    } else if (response.status === 409) {
      return await response.text();
    }
  }

  #urlPathQuery(path, query) {
    const url = new URL([location.protocol, "//", location.host, path].join(""));
    url.search = new URLSearchParams(query);
    return url.toString();
  }
}

export default new Repository();
