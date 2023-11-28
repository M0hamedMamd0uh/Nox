import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";

export default function PopularMovie() {
  return (
    <>
      <Helmet>
        <title>Popular Movies</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Popular Movies</h2>
        <ShowCategoryDetails category="popular" type="movie" />
      </div>
    </>
  );
}
