import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://social-network-dovecote.herokuapp.com/api/",
  timeout: 60 * 1000,
  responseType: "json",
});
