import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getAllTrending = createAsyncThunk(
  "trending/getTrending",
  async function (time = "day") {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/${time}?language=en-US`,
        configAPI
      );

      return data.results;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    allTrendingData: [],
    trendingIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getAllTrending.fulfilled, function (prevState, action) {
      prevState.trendingIsLoading = false;
      prevState.allTrendingData = action.payload;
    });
    builder.addCase(getAllTrending.pending, function (prevState) {
      prevState.trendingIsLoading = true;
    });
    builder.addCase(getAllTrending.rejected, function (prevState) {
      prevState.trendingIsLoading = false;
    });
  },
});

export let trendingReducer = trendingSlice.reducer;
