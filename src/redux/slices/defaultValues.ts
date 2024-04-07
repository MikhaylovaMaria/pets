import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCities = createAsyncThunk("Cities/fetchCities", async () => {
  const { data } = await axios.get("/cities");
  return data;
});

interface City {
  cityId: string;
  cityName: string;
  cityCenter: [];
}

interface CityState {
  cities: City[] | null;
  status: string;
}

const initialState: CityState = {
  cities: [],
  status: "loading",
};

const defaultValuesSlice = createSlice({
  name: "defaultValues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state: CityState) => {
        state.cities = [];
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state: CityState, action) => {
        state.cities = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCities.rejected, (state) => {
        state.cities = [];
        state.status = "error cities";
      });
  },
});

export const citiesAll = (state: { defaultValues: CityState }) =>
  state.defaultValues.cities;

export const cityNameById = createSelector(
  [citiesAll, (_, cityId: string) => cityId],
  (cities, cityId) => {
    const city = cities?.find((c) => c.cityId === cityId);
    return city ? city.cityName : "";
  }
);

export const defaultReducer = defaultValuesSlice.reducer;
