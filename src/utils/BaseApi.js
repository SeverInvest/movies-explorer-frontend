// 'use strict';

export default class BaselApi {
  constructor(connect) {
    this._baseUrl = connect.baseUrl;
    this._headers = connect.headers;
}
  _checkResponse(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  _requestWithToken(url, options) {
    const token = localStorage.getItem('jwt');
    return fetch(
      `${this._baseUrl}${url}`,
      Object.assign(options, { headers: { ...this._headers, "Authorization": `Bearer ${token}`, } })
    )
      .then(this._checkResponse)
  }

  _requestWithoutToken(url, options) {
    return fetch(
      `${this._baseUrl}${url}`,
      Object.assign(options, { headers: this._headers })
    )
      .then(this._checkResponse)
  }
}
