import { configureStore } from "@reduxjs/toolkit";
import { trendingReducer } from "./trending";
import { popularReducer } from "./popular";
import { FreeToWatchReducer } from "./freetowatch";
import { latestTrailerReducer } from "./latestTrailers";
import { categoryReducer } from "./categories";
import { getAllDetailsReducer } from "./getDetails";
import { allSearchReducer } from "./search";
import axios from "axios";
import { mediaReducer } from "./media";
import { videosReducer } from "./videos";
import { MoviesPageReducer } from "./moviesPages";
import { tvShowsPagesReducer } from "./TvShowspages";
import { personPagesReducer } from "./personPages";

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    popular: popularReducer,
    freetowatch: FreeToWatchReducer,
    latestTrailer: latestTrailerReducer,
    categories: categoryReducer,
    details: getAllDetailsReducer,
    allSearch: allSearchReducer,
    media: mediaReducer,
    videos: videosReducer,
    moviesPages: MoviesPageReducer,
    tvShowsPages: tvShowsPagesReducer,
    personPages: personPagesReducer,
  },
});
let configAPI = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
  },
};
(async function () {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
      configAPI
    );
    localStorage.setItem(
      "randomImage",
      data.results[Math.floor(Math.random() * 19)].backdrop_path === null
        ? data.results[Math.floor(Math.random() * 19)].poster_path
        : data.results[Math.floor(Math.random() * 19)].backdrop_path
    );
  } catch (error) {
    console.log("Error to Fetch Data");
  }
})();
