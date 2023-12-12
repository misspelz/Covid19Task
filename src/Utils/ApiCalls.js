import axios from "axios";
import { baseUrl } from "./ApiConfig";

export const ListOfRegionsApi = (rowsPerPage) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/regions`,
    params: {
      per_page: rowsPerPage,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // Handle errors
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const ListOfProvincesApi = (isoCode) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/provinces?iso=${isoCode}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};

export const ListOfReportsApi = (rowsPerPage) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseUrl}/reports`,
    params: {
      per_page: rowsPerPage,
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // Handle errors
      console.log("error", error);
      if (error.response.data.error) {
        throw new Error(error.response.data.error);
      } else if (error.response.status) {
        throw new Error(error.response.status);
      }
    });
};
