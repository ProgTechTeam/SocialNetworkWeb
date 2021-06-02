import axios from "axios";

export const HTTP = axios.create({
  baseURL: "/api/",
  timeout: 60 * 1000,
  responseType: "json",
  headers: { Authorization: "Bearer api_biqlXEIirVuVLTFzKZtulDnXvsWwgEVzEE" },
});

export const TOXIC_API_HTTP = axios.create({
  baseURL: "/api/",
  timeout: 60 * 1000,
  responseType: "json",
  headers: { Authorization: "Bearer api_biqlXEIirVuVLTFzKZtulDnXvsWwgEVzEE" },
});
