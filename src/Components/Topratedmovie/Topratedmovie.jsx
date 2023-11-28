import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";

export default function Topratedmovie() {
  return (
    <>
      <Helmet>
        <title>Top Rated Movies</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Top Rated Movies</h2>
        <ShowCategoryDetails category="top_rated" type="movie" />
      </div>
    </>
  );
}
