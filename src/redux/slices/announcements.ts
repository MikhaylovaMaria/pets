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

type coordsProps = {
  southWest: number[];
  northEast: number[];
};

export const fetchAnnouncements = createAsyncThunk(
  "Announcements/fetchAnnouncements",
  async (id: string) => {
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
    console.log(params);
    const { data } = await createAnnocement(params);
    return data;
  }
);

export const fetchAllAnnouncementFromMap = createAsyncThunk(
  "AnnouncementsAllFromMap/fetchAnnouncementsAllFromMap",
  async (args: coordsProps) => {
    const { southWest, northEast } = args;
    const { data } = await getAnnoncements(undefined, southWest, northEast);
    return data;
  }
);

interface AnnounmentTypes {
  announmentsInit: Announment[];
  allAnnounc: Announment[];
  announmentTypes: announcementType[];
  status: string;
}

const initialState: AnnounmentTypes = {
  announmentsInit: [],
  allAnnounc: [],
  announmentTypes: [],
  status: "loading",
};

const AnnounmentSlice = createSlice({
  name: "announcements",
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
      )
      .addCase(
        fetchAllAnnouncementFromMap.pending,
        (state: AnnounmentTypes) => {
          state.status = "loading";
        }
      )
      .addCase(
        fetchAllAnnouncementFromMap.fulfilled,
        (state: AnnounmentTypes, action) => {
          if (Array.isArray(action.payload)) {
            const newAnnouncements = action.payload.filter(
              (newAnnouncement: Announment) => {
                return !state.allAnnounc.some(
                  (existingAnnouncement) =>
                    existingAnnouncement.announcementId ===
                    newAnnouncement.announcementId
                );
              }
            );

            state.allAnnounc = [...state.allAnnounc, ...newAnnouncements];
          }

          state.status = "loaded";
        }
      );
  },
});

export const announcementTypeAll = (state: { announments: AnnounmentTypes }) =>
  state.announments.announmentTypes;

export const announcementsInCity = (state: { announments: AnnounmentTypes }) =>
  state.announments.announmentsInit;

export const getAnnFromMap = (state: { announments: AnnounmentTypes }) =>
  state.announments.allAnnounc;

export const getAnnUser = (state: { announments: AnnounmentTypes }) =>
  state.announments.announmentsInit;

export const announmentsReducer = AnnounmentSlice.reducer;
