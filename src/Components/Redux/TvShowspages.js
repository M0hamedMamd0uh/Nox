import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getTvShowsPage = createAsyncThunk(
  "TvShowsPages/getTvShowsPages",
  async function ({ searchValue, page }) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${searchValue}&include_adult=false&language=en-US&page=${page}`,
        configAPI
      );

      return data;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const tvShowsPagesSlice = createSlice({
  name: "TvShowsPages",
  initialState: {
    tvShowsPageData: [],
    tvShowsPageIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getTvShowsPage.fulfilled, function (prevState, action) {
      prevState.tvShowsPageIsLoading = false;
      prevState.tvShowsPageData = action.payload;
    });
    builder.addCase(getTvShowsPage.pending, function (prevState) {
      prevState.tvShowsPageIsLoading = true;
    });
    builder.addCase(getTvShowsPage.rejected, function (prevState) {
      prevState.tvShowsPageIsLoading = false;
    });
  },
});

export let tvShowsPagesReducer = tvShowsPagesSlice.reducer;
