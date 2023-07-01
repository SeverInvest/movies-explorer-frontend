// 'use strict';
import { connect } from './connect.js';
import BaseApi from './BaseApi.js';

class MainApi extends BaseApi {
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

  getAllVideos() {
    return super._requestWithToken(
      '/videos',
      {
        method: "GET"
      }
    )
  }

  getAllSavedMovies() {
    return super._requestWithToken(
      '/movies',
      {
        method: "GET"
      }
    )
  }

  saveMovie(data) {
    return super._requestWithToken(
      '/movies',
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    )
  }

  deleteMovie(movieId) {
    return super._requestWithToken(
      `/movies/${movieId}`,
      {
        method: "DELETE"
      }
    )
  }
}

const mainApi = new MainApi(connect);

export default mainApi;