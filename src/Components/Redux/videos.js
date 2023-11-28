import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};

export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async function ({ category, id }) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/videos`,
        configAPI
      );
      return data.results;
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }
);

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    allVideos: [],
    videosIsLoading: false,
  },
  extraReducers: function (builder) {
    builder.addCase(getVideos.fulfilled, function (prevState, action) {
      prevState.videosIsLoading = false;
      prevState.allVideos = action.payload;
    });
    builder.addCase(getVideos.pending, function (prevState) {
      prevState.videosIsLoading = true;
    });
    builder.addCase(getVideos.rejected, function (prevState) {
      prevState.videosIsLoading = false;
    });
  },
});

export let videosReducer = videosSlice.reducer;
