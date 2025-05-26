import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getLatestTrailer = createAsyncThunk(
  "latestTrailer/getLatestTrailer",
  async function (type = "movie/now_playing") {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}?language=en-US&page=1`,
        configAPI
      );

      return data.results;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const latestTrailerSlice = createSlice({
  name: "latestTrailer",
  initialState: {
    allLatestTrailerData: [],
    latestTrailerIsLoading: false,
    allTrailers: [],
  },
  extraReducers: function (builder) {
    builder.addCase(getLatestTrailer.fulfilled, function (prevState, action) {
      prevState.latestTrailerIsLoading = false;
      prevState.allLatestTrailerData = action.payload;
    });
    builder.addCase(getLatestTrailer.pending, function (prevState) {
      prevState.latestTrailerIsLoading = true;
    });
    builder.addCase(getLatestTrailer.rejected, function (prevState) {
      prevState.latestTrailerIsLoading = false;
    });
  },
});

export let latestTrailerReducer = latestTrailerSlice.reducer;
