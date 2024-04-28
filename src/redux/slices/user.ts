import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  avatar?: string;
  email: string;
  cityId: string;
  typeUser: string;
  createdAt: string;
}

interface UserState {
  userData: User | null;
  status: string;
}

type loginParam = {
  paramsLogin: {
    email: string;
    password: string;
  };
};

type registerParam = {
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  avatar: string;
  email: string;
  cityId: string;
  password: string;
};

const initialState: UserState = {
  userData: null,
  status: "loading",
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (params: loginParam) => {
    // console.log(params);
    const { data } = await axios.post("/login", params);
    return data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUserData",
  async () => {
    const { data } = await axios.get("/auth/me");
    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (params: registerParam) => {
    const { data } = await axios.post("/register", params);
    return data;
  }
);


const userSlice = createSlice({
  name: "CurrentUser",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state: UserState, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.userData = null;
        state.status = "error user";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state: UserState, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.userData = null;
        state.status = "error user";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.userData = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state: UserState, action) => {
        state.userData = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.userData = null;
        state.status = "error user";
      });
  },
});

export const selectisAuth = (state: { user: UserState }) => state.user.userData;
export const currentUserId = (state: { user: UserState }) =>
  state.user.userData?.userId;

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
