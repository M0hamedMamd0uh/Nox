import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getPersonPage = createAsyncThunk(
  "personPages/getPersonPages",
  async function ({ searchValue, page }) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/person?query=${searchValue}&include_adult=false&language=en-US&page=${page}`,
        configAPI
      );

      return data;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const personPagesSlice = createSlice({
  name: "personPages",
  initialState: {
    personPageData: [],
    personPageIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getPersonPage.fulfilled, function (prevState, action) {
      prevState.personPageIsLoading = false;
      prevState.personPageData = action.payload;
    });
    builder.addCase(getPersonPage.pending, function (prevState) {
      prevState.personPageIsLoading = true;
    });
    builder.addCase(getPersonPage.rejected, function (prevState) {
      prevState.personPageIsLoading = false;
    });
  },
});

export let personPagesReducer = personPagesSlice.reducer;
