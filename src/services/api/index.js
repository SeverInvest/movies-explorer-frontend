// 'use strict';
import axios from "axios";
import { connect } from '../../utils/connect';
// import BaseApi from './BaseApi.js';

const api = axios.create({
  baseURL: connect.baseUrl,
  headers: connect.headers,
});

api.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem("jwt");
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
