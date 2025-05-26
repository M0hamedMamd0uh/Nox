import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";
export default function Airingtodaytv() {
  return (
    <>
      {" "}
      <Helmet>
        <title>TV Shows Airing Today</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3"> TV Shows Airing Today</h2>
        <ShowCategoryDetails category="airing_today" type="tv" />
      </div>
    </>
  );
}
