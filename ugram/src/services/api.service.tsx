import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080/ugram",
  responseType: "json",
  headers: {
    authorization: "xxxxxxxxxx",
    contentType: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  },
});
