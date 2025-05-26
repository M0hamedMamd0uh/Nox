import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";
export default function Topratedtv() {
  return (
    <>
      <Helmet>
        <title>Top Rated TV Shows</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Top Rated TV Shows</h2>
        <ShowCategoryDetails category="top_rated" type="tv" />
      </div>
    </>
  );
}
