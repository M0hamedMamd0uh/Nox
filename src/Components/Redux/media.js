import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getMedia = createAsyncThunk(
  "media/getMedia",
  async function ({category, id}) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/images`,
        configAPI
      );
      return data;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    allMedia: [],
    mediaIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getMedia.fulfilled, function (prevState, action) {
      prevState.mediaIsLoading = false;
      prevState.allMedia = action.payload;
    });
    builder.addCase(getMedia.pending, function (prevState) {
      prevState.mediaIsLoading = true;
    });
    builder.addCase(getMedia.rejected, function (prevState) {
      prevState.mediaIsLoading = false;
    });
  },
});

export let mediaReducer = mediaSlice.reducer;
