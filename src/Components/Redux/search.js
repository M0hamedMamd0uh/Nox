import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getSearchDetails = createAsyncThunk(
  "SearchDetails/getSearchDetails",
  async function ({type, value}) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?query=${value}&include_adult=false&language=en-US`,
        configAPI
      );

      return data.results;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const allSearchSlice = createSlice({
  name: "SearchDetails",
  initialState: {
    allSearchData: [],
    allSearchIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getSearchDetails.fulfilled, function (prevState, action) {
      prevState.allSearchIsLoading = false;
      prevState.allSearchData = action.payload;
    });
    builder.addCase(getSearchDetails.pending, function (prevState) {
      prevState.allSearchIsLoading = true;
    });
    builder.addCase(getSearchDetails.rejected, function (prevState) {
      prevState.allSearchIsLoading = false;
    });
  },
});

export let allSearchReducer = allSearchSlice.reducer;
