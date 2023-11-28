import { Helmet } from "react-helmet";
import ShowCategoryDetails from "../ShowCategoryDetails/ShowCategoryDetails";
export default function Ontv() {
  return (
    <>
      <Helmet>
        <title>Currently Airing TV Shows</title>
      </Helmet>
      <div className="container py-4 ">
        <h2 className="px-3">Currently Airing TV Shows</h2>
        <ShowCategoryDetails category="on_the_air" type="tv" />
      </div>
    </>
  );
}
