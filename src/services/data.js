import axios from "axios";

const basePath = import.meta.env.VITE_API_URL || "http://localhost:8000/";

const api = axios.create({
  baseURL: basePath + "api",
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("visor2030-token") || ""}`,
  // },
});

// add the auth header only if there is a token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("visor2030-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// if the response is 401, redirect to login
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // remove the token
      localStorage.removeItem("visor2030-token");
      // redirect to login
      window.location.href = "#/login";
    }
    return Promise.reject(error);
  },
);

const data = {};

const urls = {
  indicators: "/indicators",
  indicator: "/indicator",
  labels: "/labels-hierarchy?language=ca",
  postLabels: "/labels-import?language=ca",
  postIndicator: "/indicators/:id",
  login: "/login",
};

function queryParamsToString(params) {
  // map some names
  // id becomes municipality.id
  // indicatorId becomes indicator.indicator_id
  const mapped = {
    id: "municipality.id",
    indicatorId: "indicator.id",
  };

  // return as a query string with the mapped names
  return Object.keys(params)
    .map((key) => `${mapped[key] || key}=${params[key]}`)
    .join("&");
}

export default {
  async getIndicators(params = {}, query) {
    console.log("getIndicators", params, query);

    const pageData = await api(
      urls.indicators, // + "?" + queryParamsToString(params)
    );

    return pageData.data;
  },

  async getIndicator(params = {}, query) {
    console.log("getIndicator", params, query);

    const pageData = await api(urls.indicators + "/" + params.id);

    return pageData.data;
  },

  async getLabels(params = {}, query) {
    const pageData = await api(urls.labels);

    return pageData.data;
  },

  async postLabels(_, __, data) {
    const response = await api.post(urls.postLabels, data);
    return response.data;
  },

  async postETL(id) {
    const response = await api.post(`/etl/${id}`);
    return response.data;
  },

  async postIndicator(_, __, data) {
    // replace the id in the url
    const url = urls.postIndicator.replace(":id", data.id);

    // remove id from data
    delete data.id;

    // backend is symfony, we need Supported MIME types are \"application/merge-patch+json
    // const response = await api.patch(url, data);
    const response = await api({
      method: "patch",
      url,
      data,
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
    });
    return response.data;
  },

  async login(data) {
    const url = urls.login.replace();

    const response = await api({
      method: "post",
      url,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("login response", response);
    return response;
  },
};
