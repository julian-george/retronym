import axios from "axios";
import BASE_API_URL from "./url";
import { Redirect } from "./types";

const API_URL = BASE_API_URL + "/users";

export function getAccessCodes() {
  return axios
    .get<{}, { success: boolean; data: any }>(API_URL + "/oauthcodes")
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

export function setAccessCode(data: { [key: string]: string }) {
  return axios
    .post<
      { code: string; state: string; error?: string },
      { success: boolean; message?: string; redirect?: string }
    >(API_URL + "/setcode", data)
    .then(({ success, message }) => {
      if (!success) console.error(message);
      return { success, message };
    })
    .catch((error) => {
      console.error(error);
      return { success: false, message: "Failed to connect." };
    });
}
