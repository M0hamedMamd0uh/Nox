import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getMoviesPage = createAsyncThunk(
  "moviesPages/getMoviesPage",
  async function ({ searchValue, page }) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=${page}`,
        configAPI
      );

      
    
      return data;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const moviesPageSlice = createSlice({
  name: "moviesPages",
  initialState: {
    moviesPageData: [],
    moviesPageIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getMoviesPage.fulfilled, function (prevState, action) {
      prevState.moviesPageIsLoading = false;
      prevState.moviesPageData = action.payload;
    });
    builder.addCase(getMoviesPage.pending, function (prevState) {
      prevState.moviesPageIsLoading = true;
    });
    builder.addCase(getMoviesPage.rejected, function (prevState) {
      prevState.moviesPageIsLoading = false;
    });
  },
});

export let MoviesPageReducer = moviesPageSlice.reducer;
