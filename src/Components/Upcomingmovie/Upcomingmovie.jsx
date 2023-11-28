//
import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";
export default function Upcomingmovie() {
  return (
    <>
      <Helmet>
        <title>Upcoming Movies</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Upcoming Movies</h2>
        <ShowCategoryDetails category="upcoming" type="movie" />
      </div>
    </>
  );
}
