import { connectMovies } from './connect.js';
import BaseApi from './BaseApi.js';

class MoviesApi extends BaseApi {
  constructor() {
    super(connectMovies);
  }
  getAllMovies() {
    return super._requestWithoutToken(
      '/',
      {
        method: "GET"
      }
    )
  }
}

const moviesApi = new MoviesApi(connectMovies);

export default moviesApi;