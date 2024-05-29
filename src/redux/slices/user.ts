import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, {
  createSubscription,
  deleteSubscription,
  getUserInfo,
  getUsersFriends,
} from "../../axios";

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

export interface UserFriendsParams {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string | undefined;
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

interface UserState {
  userData: User | null;
  userFriends: UserFriendsParams[];
  status: string;
}

const initialState: UserState = {
  userData: null,
  status: "loading",
  userFriends: [],
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (params: loginParam) => {
    const { data } = await axios.post("auth/login", params);
    return data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUserData",
  async (userId: string) => {
    const { data } = await getUserInfo(userId);
    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async (params: registerParam) => {
    const { data } = await axios.post("auth/register", params);
    return data;
  }
);

export const fetchUserFriends = createAsyncThunk(
  "user/fetchUserFriends",
  async (userId: string) => {
    const { data } = await getUsersFriends(userId);
    return data;
  }
);

type SubscriptionProps = {
  authorId: string;
  friendId: string;
  user: UserFriendsParams;
};

export const fetchCreateSubscription = createAsyncThunk(
  "user/fetchSubscription",
  async (args: SubscriptionProps) => {
    const { authorId, friendId } = args;
    await createSubscription(authorId, friendId);
  }
);

export const fetchDeleteSubscription = createAsyncThunk(
  "user/fetchDeleteSubscription",
  async (args: SubscriptionProps) => {
    const { authorId, friendId } = args;
    await deleteSubscription(authorId, friendId);
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
      })
      .addCase(fetchUserFriends.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserFriends.fulfilled, (state, action) => {
        state.userFriends = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCreateSubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateSubscription.fulfilled, (state, action) => {
        state.userFriends.push(action.meta.arg.user);
        state.status = "loaded";
      })
      .addCase(fetchDeleteSubscription.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeleteSubscription.fulfilled, (state, action) => {
        state.userFriends = state.userFriends.filter(
          (u) => u.userId !== action.meta.arg.user.userId
        );

        state.status = "loaded";
      });
  },
});

export const selectisAuth = (state: { user: UserState }) => state.user.userData;
export const currentUserId = (state: { user: UserState }) =>
  state.user.userData?.userId;

export const getCurrentUserData = (state: { user: UserState }) =>
  state.user.userData;

export const getUserFriends = (state: { user: UserState }) =>
  state.user.userFriends;

export const userDataStatus = (state: { user: UserState }) => state.user.status;

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
