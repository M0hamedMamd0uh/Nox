import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";

export default function Nowplayingmovie() {
  return (
    <>
      <Helmet>
        <title>Now Playing Movies</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Now Playing Movies</h2>
        <ShowCategoryDetails category="now_playing" type="movie" />
      </div>
    </>
  );
}
