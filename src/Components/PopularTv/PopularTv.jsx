import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";
export default function PopularTv() {
  return (
    <>
      <Helmet>
        <title>Popular TV Shows</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Popular TV Shows</h2>
        <ShowCategoryDetails category="popular" type="tv" />
      </div>
    </>
  );
}
