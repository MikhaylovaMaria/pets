import { Announment, announcementType } from "./../../types/types";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import {
  getAnnoncementTypes,
  getAnnoncements,
  createAnnocement,
} from "../../axios";

export const fetchAnnouncements = createAsyncThunk(
  "Announcements/fetchAnnouncements",
  async (id?: string) => {
    const { data } = await getAnnoncements(id);
    return data;
  }
);

export const fetchAnnouncementsTypes = createAsyncThunk(
  "AnnouncementTypes/fetchAnnouncementTypes",
  async () => {
    const { data } = await getAnnoncementTypes();
    return data;
  }
);

export const fetchAnnouncementCreate = createAsyncThunk(
  "AnnouncementsCreate/fetchAnnouncementsCreate",
  async (params: any) => {
    const { data } = await createAnnocement(params);
    return data;
  }
);

interface AnnounmentTypes {
  announmentsInit: Announment[] | null;
  announmentTypes: announcementType[];
  status: string;
}

const initialState: AnnounmentTypes = {
  announmentsInit: [],
  announmentTypes: [],
  status: "loading",
};

const AnnounmentSlice = createSlice({
  name: "defaultValues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state: AnnounmentTypes) => {
        state.announmentsInit = [];
        state.status = "loading";
      })
      .addCase(
        fetchAnnouncements.fulfilled,
        (state: AnnounmentTypes, action) => {
          state.announmentsInit = action.payload;
          state.status = "loaded";
        }
      )
      .addCase(fetchAnnouncements.rejected, (state) => {
        state.announmentsInit = [];
        state.status = "error announments";
      })
      .addCase(
        fetchAnnouncementsTypes.fulfilled,
        (state: AnnounmentTypes, action) => {
          state.announmentTypes = action.payload;
        }
      )
      .addCase(
        fetchAnnouncementCreate.fulfilled,
        (state: AnnounmentTypes, action) => {
          state.announmentsInit?.push(action.payload);
        }
      );
  },
});

export const announcementTypeAll = (state: { announments: AnnounmentTypes }) =>
  state.announments.announmentTypes;

export const announcementsInCity = (state: { announments: AnnounmentTypes }) =>
  state.announments.announmentsInit;

export const announmentsReducer = AnnounmentSlice.reducer;
