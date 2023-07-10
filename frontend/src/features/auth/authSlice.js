import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService, registerService, getUserService } from "./authApi";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      return await registerService(credentials);
    } catch (err) {
      console.log(err);
      const message =
        err.response && err.response.data && err.response.data.errors;

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      return await loginService(credentials);
    } catch (err) {
      console.log(err);
      const message =
        err.response && err.response.data && err.response.data.errors;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkApi) => {
  try {
    return await getUserService();
  } catch (err) {
    console.log(err);
    const message =
      err.response && err.response.data && err.response.data.errors;
    return thunkApi.rejectWithValue(message);
  }
});

const INITIAL_STATE = {
  user: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorsMessage: [],
  successMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    reset(state) {
      state.errorsMessage = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.successMessage = "";
    },

    logout(state) {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.errorsMessage = [];
      state.successMessage = "";

      localStorage.removeItem("token");
    },
  },

  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorsMessage = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
