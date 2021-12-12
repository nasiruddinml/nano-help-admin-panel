import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { mapPagination } from "@app/helpers/table.helper";
import { TablePaginationDef } from "@app/types/pagination.types";

import * as donationsApi from "../api/donations.api";
import { GetDonationsParamDef, DonationDef } from "../types/donations.types";

export const DONATIONS_FEATURE_KEY = "donations";

interface SliceState {
  donations: DonationDef[];
  donation: DonationDef | null;
  pagination: TablePaginationDef;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: SliceState = {
  donations: [],
  donation: null,
  pagination: {
    current: 1,
    pageSize: 20,
    total: 0,
  },
  loading: false,
  error: null,
};

export const getDonations = createAsyncThunk(
  "donations/getDonations",
  async (params: GetDonationsParamDef, { rejectWithValue }) => {
    try {
      const response = await donationsApi.getDonations(params);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDonationById = createAsyncThunk(
  "donations/getDonationById",
  async (id: DonationDef["id"], { rejectWithValue }) => {
    try {
      const response = await donationsApi.getDonationById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const donationsSlice = createSlice({
  name: DONATIONS_FEATURE_KEY,
  initialState,
  reducers: {
    clearDonation: state => {
      state.donation = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    /** GET DONATIONS */
    builder.addCase(getDonations.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDonations.fulfilled, (state, action) => {
      state.loading = false;
      state.donations = action.payload.data;
      state.pagination = mapPagination(action.payload);
    });
    builder.addCase(getDonations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    /** GET DONATION */
    builder.addCase(getDonationById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getDonationById.fulfilled, (state, action) => {
      state.loading = false;
      state.donation = action.payload.data;
    });
    builder.addCase(getDonationById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearDonation } = donationsSlice.actions;
export const donationReducer = donationsSlice.reducer;
