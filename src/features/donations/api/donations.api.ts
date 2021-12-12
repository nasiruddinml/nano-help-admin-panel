import { AxiosResponse } from "axios";

import { api } from "@app/api/api";

import {
  GetDonationsResponseDef,
  GetDonationsParamDef,
  GetDonationByIdResponseDef,
} from "../types/donations.types";

export const getDonations = (
  params?: GetDonationsParamDef
): Promise<AxiosResponse<GetDonationsResponseDef>> => {
  // return api.get("/donation", { params });
  return api.get("https://mocki.io/v1/09ecb77d-e91c-4c5f-8e78-97aaba3f9bb0", {
    params,
  });
};

export const getDonationById = (
  id: number
): Promise<AxiosResponse<GetDonationByIdResponseDef>> => {
  return api.get(`/donation/${id}`);
};
