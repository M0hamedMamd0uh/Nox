import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getCategory = createAsyncThunk(
  "categories/getCategory",
  async function ({movieOrTvOrperson,category,page}) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${movieOrTvOrperson}/${category}?language=en-US&page=${page}`,
        configAPI
      );

      return data;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    allCategoryData: [],
    categoryIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getCategory.fulfilled, function (prevState, action) {
      prevState.categoryIsLoading = false;
      prevState.allCategoryData = action.payload;
    });
    builder.addCase(getCategory.pending, function (prevState) {
      prevState.categoryIsLoading = true;
    });
    builder.addCase(getCategory.rejected, function (prevState) {
      prevState.categoryIsLoading = false;
    });
  },
});

export let categoryReducer = categorySlice.reducer;
