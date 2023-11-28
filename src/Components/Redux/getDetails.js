import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getAllDetails = createAsyncThunk(
  "getDetails/getAllDetails",
  async function ({ category, id }) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}?append_to_response=credits&language=en-US`,
        configAPI
      );

      return data;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const allDetailsSlice = createSlice({
  name: "getDetails",
  initialState: {
    allDetails: [],
    allDetailsIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getAllDetails.fulfilled, function (prevState, action) {
      prevState.allDetailsIsLoading = false;
      prevState.allDetails = action.payload;
    });
    builder.addCase(getAllDetails.pending, function (prevState) {
      prevState.allDetailsIsLoading = true;
    });
    builder.addCase(getAllDetails.rejected, function (prevState) {
      prevState.allDetailsIsLoading = false;
    });
  },
});

export let getAllDetailsReducer = allDetailsSlice.reducer;
