import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://social-network-dovecote.herokuapp.com/api/",
  timeout: 60 * 1000,
  responseType: "json",
});
