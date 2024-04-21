import axios from "axios";
import BASE_API_URL from "./url";
import { Redirect } from "./types";

const API_URL = BASE_API_URL + "/users";

export function getTokens() {
  return axios
    .get<{}, { success: boolean; data: any }>(API_URL + "/oauthtokens")
    .then(({ data: { success, data } }) => {
      if (success) {
        return data;
      } else return false;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export function setToken(data: { [key: string]: string }) {
  return axios
    .post<
      { code: string; state: string; error?: string },
      { success: boolean; message?: string; redirect?: string }
    >(API_URL, data)
    .then(({ success, message }) => {
      if (!success) console.error(message);
      return { success, message };
    })
    .catch((error) => {
      console.error(error);
      return { success: false, message: "Failed to connect." };
    });
}
