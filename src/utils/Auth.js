// 'use strict';
import connect from './connect.js';
import BaseApi from './BaseApi.js';

class Auth extends BaseApi {
  constructor() {
    super(connect);
  }

  register(name, email, password) {
    return super._requestWithoutToken(
      '/signup',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      }
    )
  };

  authorize(email, password) {
    return super._requestWithoutToken(
      '/signin',
      {
        method: 'POST',
        body: JSON.stringify({ email, password })
      }
    )
  };

  getUser() {
    return super._requestWithToken(
      '/users/me',
      {
        method: "GET"
      }
    )
  }

    setUserInfo(info) {
    return super._requestWithToken(
      '/users/me',
      {
        method: 'PATCH',
        body: JSON.stringify(info)
      }
    )
  }

}

const auth = new Auth(connect);

export default auth;