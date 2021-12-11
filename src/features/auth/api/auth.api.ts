import { AxiosResponse } from "axios";

import { api } from "@app/api/api";

import { AuthEndpointsEnum } from "../constants/auth.endpoints";
import { LoginRequestDef, SignupRequestDef } from "../types/auth.types";

export const authLogin = (data: LoginRequestDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.LOGIN, data);
};

export const authSignup = (data: SignupRequestDef): Promise<AxiosResponse> => {
  return api.post(AuthEndpointsEnum.SIGNUP, data);
};

export const authGetMe = (): Promise<AxiosResponse> => {
  // TODO: change when AUTH method is changed =>
  // Using a fixed user to emulate a get current user call
  return api.get(`${AuthEndpointsEnum.USERS}/2`);
};
