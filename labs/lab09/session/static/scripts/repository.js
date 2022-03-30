export class Repository {
  async readAccounts(type) {
    const response = await fetch(
      this.#urlPathQuery(`/api/accounts`, { type: type }), { method: "GET" },
    );

    const data = await response.json();
    return data;
  }

  async createAccount(body) {
    const response = await fetch(
      this.#urlPathQuery(`/api/accounts`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body),
      },
    );

    // if (response.ok) { }
    // if (response.status === 201) { }

    const data = await response.json();
    return data;
  }

  async readAccount(id) {
    const response = await fetch(
      this.#urlPathQuery(`/api/account/${id}`), { method: 'GET' },
    );

    const data = await response.json();
    return data;
  }

  async updateAccount(body) {
    const response = await fetch(
      this.#urlPathQuery(`/api/accounts`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(body),
      },
    );

    // if (response.ok) { }
    // if (response.status === 201) { }

    const data = await response.json();
    return data;
  }

  async deleteAccount(id) {
    const response = await fetch(
      this.#urlPathQuery(`/api/accounts/${id}`), { method: "DELETE" },
    );

    // the response has no body
    // const data = await response.json();
    return response;
  }

  #urlPathQuery(path, query) {
    const url = new URL([location.protocol, "//", location.host, path].join(""));
    url.search = new URLSearchParams(query);
    return url.toString();
  }
}
