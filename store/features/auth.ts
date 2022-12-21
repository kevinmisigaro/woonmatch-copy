import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "../../interfaces";
import { xhrRequest } from "../../network/network";

interface AuthState {
  token?: string;
  user?: User;
  loading: boolean;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" && localStorage.getItem("token"),
  user:
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user")),
  loading: false,
};

export const fetchRefreshToken = createAsyncThunk(
  "auth/fetchRefreshToken",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await xhrRequest("GET", {
        endPoint: "/refresh",
        withCredentials: true,
      });
      dispatch(fetchUser());
      return response.data;
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    data: { mail: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await xhrRequest<boolean>("POST", {
        endPoint: "/login",
        data,
      });
      dispatch(fetchRefreshToken());
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await xhrRequest("GET", { endPoint: "/logout" });
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await xhrRequest("GET", { endPoint: "/user/steps/naw" });
      return response.data;
    } catch (error: any) {
      const { status, data } = error.response;
      return rejectWithValue({ status, data });
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // login cases
    builder.addCase(login.pending, (auth) => {
      auth.loading = true;
    });
    builder.addCase(login.rejected, (auth) => {
      auth.loading = false;
    });

    // fetchResfreshToken cases
    builder.addCase(fetchRefreshToken.fulfilled, (auth, action) => {
      auth.token = action.payload;
      localStorage.setItem("token", auth.token);
    });
    builder.addCase(fetchRefreshToken.rejected, (auth) => {
      auth.loading = false;
    });

    // logout cases
    builder.addCase(logout.fulfilled, (auth) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      auth.token = null;
      auth.user = null;
    });

    // fetchUser cases
    builder.addCase(fetchUser.fulfilled, (auth, action) => {
      auth.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      auth.loading = false;
    });
    builder.addCase(fetchUser.rejected, (auth) => {
      auth.loading = false;
    });
  },
});

export default slice.reducer;
