// for stateless user-related requests

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
  axios
    .post<
      { code: string; state: string; error?: string },
      { success: boolean; message?: string; redirect?: string }
    >(API_URL, data)
    .then(({ success, redirect, message }) => {
      if (!success) throw Error(message);

      switch (redirect) {
        case Redirect.onboarding:
          // TODO redirect..
          break;
        case Redirect.settings:
          // TODO
          break;
      }
    })
    .catch((error) => {
      console.error(error);
      // TODO show error popup here
    });
}
