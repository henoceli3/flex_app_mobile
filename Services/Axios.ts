import axios from "axios";
import { Endpoint } from "./Endpoint";

export const RqAxios = axios.create({
  baseURL: Endpoint.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
