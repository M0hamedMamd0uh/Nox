import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getAllPopular = createAsyncThunk(
  "popular/getPopular",
  async function (type = "movie") {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`,
        configAPI
      );
      return data.results;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    allPopularData: [],
    popularIsLoading: false,
    // randomBackground: null,
  },
  extraReducers: function (builder) {
    builder.addCase(getAllPopular.fulfilled, function (prevState, action) {
      prevState.popularIsLoading = false;
      prevState.allPopularData = action.payload;
    });
    builder.addCase(getAllPopular.pending, function (prevState) {
      prevState.popularIsLoading = true;
    });
    builder.addCase(getAllPopular.rejected, function (prevState) {
      prevState.popularIsLoading = false;
    });
  },
});

export let popularReducer = popularSlice.reducer;
