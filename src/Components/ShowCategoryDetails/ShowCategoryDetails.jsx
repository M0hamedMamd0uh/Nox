import React, { useEffect } from "react";
import { getCategory } from "../Redux/categories";
import { useDispatch, useSelector } from "react-redux";
import { ThreeCircles } from "react-loader-spinner";
import $ from "jquery";
import { Link } from "react-router-dom";
import FilmBox from "../FilmBox/FilmBox";
import "./ShowCategoryDetails.scss";

export default function ShowCategoryDetails({ type, category }) {
  const dispatch = useDispatch();
  const { allCategoryData, categoryIsLoading } = useSelector(
    (store) => store.categories
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getCategory({
        movieOrTvOrperson: type,
        category: category,
        page: 1,
      })
    );
  }, [dispatch, type, category]);

  function gotToPage(element) {
    if (element === "<<") {
      let el = $(".active .page-link")[0];
      let value = $(el).text();

      if (Number(value) === 1) {
        return;
      } else {
        try {
          el.innerHTML = Number(value) - 1;
          dispatch(
            getCategory({
              movieOrTvOrperson: type,
              category: category,
              page: Number(value) - 1,
            })
          );
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      let el = $(".active .page-link")[0];
      let value = $(el).text();

      if (Number(value) >= allCategoryData?.total_pages) return;

      try {
        el.innerHTML = Number(value) + 1;
        dispatch(
          getCategory({
            movieOrTvOrperson: type,
            category: category,
            page: Number(value) + 1,
          })
        );
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container py-3 ">
      <div className="row g-4 row-cols-xl-5 ">
        {categoryIsLoading ? (
          <div className="d-flex justify-content-center align-items-center w-100 ">
            <ThreeCircles
              height="60"
              width="60"
              color="#032541 "
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        ) : (
          allCategoryData?.results?.map((item, idx) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-lg" key={idx}>
              <Link
                to={`/details/${type}/${item.id}`}
                className="text-decoration-none text-white"
              >
                <FilmBox item={item} />
              </Link>
            </div>
          ))
        )}
        <nav aria-label="Page navigation example " className="w-100 pt-5">
          <ul className="pagination justify-content-center">
            <li className="page-item" onClick={() => gotToPage("<<")}>
              <span className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
            <li className="page-item active">
              <span className="page-link">1</span>
            </li>

            <li className="page-item" onClick={() => gotToPage(">>")}>
              <span className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>
          </ul>
        </nav>
        <span className="lead text-center w-100 d-inline-block">
          Total Pages : {allCategoryData?.total_pages}
        </span>
      </div>
    </div>
  );
}
