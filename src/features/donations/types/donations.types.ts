import { ResponsePaginationDef } from "@app/types/pagination.types";

/* eslint-disable camelcase */
export type DonationDef = {
  id: number;
  first_name: string;
  last_name: string;
  reason: string;
  amount: number;
  status: string;
  region: string;
  total_approval: number;
  document_url: string | string[] | null;
  created_at: string;
  updated_at: string;
};

export type GetDonationsResponseDef = {
  data: DonationDef[];
} & ResponsePaginationDef;

export type GetDonationsParamDef = {
  page?: ResponsePaginationDef["page"];
  per_page?: ResponsePaginationDef["per_page"];
};

export type GetDonationByIdResponseDef = {
  data: DonationDef;
};
