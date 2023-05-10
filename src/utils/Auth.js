// 'use strict';
import connect from './connect.js';
import BaseApi from './BaseApi.js';

class Auth extends BaseApi {
  constructor() {
    super(connect);
  }

  register(email, password) {
    return super._requestWithoutToken(
      '/signup',
      {
        method: 'POST',
        body: JSON.stringify({ email, password })
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
}

const auth = new Auth(connect);

export default auth;