import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getFreeToWatch = createAsyncThunk(
  "freetowatch/getFreeToWatch",
  async function (type = "discover/movie") {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}?include_adult=false&include_video=false&language=en-US&page=1&watch_region=US&with_watch_monetization_types=free`,
        configAPI
      );
      return data.results;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const freeToWatchSlice = createSlice({
  name: "freetowatch",
  initialState: {
    allFreeToWatch: [],
    freeToWatchIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getFreeToWatch.fulfilled, function (prevState, action) {
      prevState.freeToWatchIsLoading = false;
      prevState.allFreeToWatch = action.payload;
    });
    builder.addCase(getFreeToWatch.pending, function (prevState) {
      prevState.freeToWatchIsLoading = true;
    });
    builder.addCase(getFreeToWatch.rejected, function (prevState) {
      prevState.freeToWatchIsLoading = false;
    });
  },
});

export let FreeToWatchReducer = freeToWatchSlice.reducer;
