import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import FilmBox from "../FilmBox/FilmBox";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { getMoviesPage } from "../Redux/moviesPages";
import { getTvShowsPage } from "../Redux/TvShowspages";
import { getPersonPage } from "../Redux/personPages";
export default function Search() {
  const { searchValue } = useParams();
  const dispatch = useDispatch();

  const [movieValue, setmovieValue] = useState(1);
  const [tvShowsValue, setTvShowsValue] = useState(1);
  const [personValue, setPersonValue] = useState(1);

  //  for movie
  const { moviesPageData, moviesPageIsLoading } = useSelector(
    (store) => store.moviesPages
  );

  function gotToPageForMovies(element) {
    if (element === "<<") {
      let el = $(".activeLinkMovies .page-link")[0];
      let value = $(el).text();

      if (Number(value) === 1) {
        return;
      } else {
        setmovieValue(Number(value) - 1);
        try {
          dispatch(
            getMoviesPage({
              searchValue: searchValue,
              page: Number(value) - 1,
            })
          );
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      let el = $(".activeLinkMovies .page-link")[0];
      let value = $(el).text();

      if (Number(value) >= moviesPageData?.total_pages) return;

      try {
        setmovieValue(Number(value) + 1);
        dispatch(
          getMoviesPage({
            searchValue: searchValue,
            page: Number(value) + 1,
          })
        );
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // for tv shows

  const { tvShowsPageData, tvShowsPageIsLoading } = useSelector(
    (store) => store.tvShowsPages
  );

  function gotToPageForTvShows(element) {
    if (element === "<<") {
      let el = $(".activeLinkTvShows .page-link")[0];
      let value = $(el).text();

      if (Number(value) === 1) {
        return;
      } else {
        setTvShowsValue(Number(value) - 1);
        try {
          dispatch(
            getTvShowsPage({
              searchValue: searchValue,
              page: Number(value) - 1,
            })
          );
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      let el = $(".activeLinkTvShows .page-link")[0];
      let value = $(el).text();

      if (Number(value) >= tvShowsPageData?.total_pages) return;
        setTvShowsValue(Number(value) + 1);

      try {
        dispatch(
          getTvShowsPage({
            searchValue: searchValue,
            page: Number(value) + 1,
          })
        );
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  // for person

  const { personPageData, personPageIsLoading } = useSelector(
    (store) => store.personPages
  );

  function gotToPageForPerson(element) {
    if (element === "<<") {
      let el = $(".activeLinkPerson .page-link")[0];
      let value = $(el).text();

      if (Number(value) === 1) {
        return;
      } else {
        setPersonValue(Number(value) - 1);

        try {
          dispatch(
            getPersonPage({
              searchValue: searchValue,
              page: Number(value) - 1,
            })
          );
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      let el = $(".activeLinkPerson .page-link")[0];
      let value = $(el).text();

      if (Number(value) >= personPageData?.total_pages) return;
      setPersonValue(Number(value) + 1);

      try {
        dispatch(
          getPersonPage({
            searchValue: searchValue,
            page: Number(value) + 1,
          })
        );
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    dispatch(
      getMoviesPage({
        searchValue: searchValue,
        page: 1,
      })
    );

    dispatch(
      getTvShowsPage({
        searchValue: searchValue,
        page: 1,
      })
    );

    dispatch(
      getPersonPage({
        searchValue: searchValue,
        page: 1,
      })
    );
  }, [searchValue]);

  return (
    <>
      <div className="container py-5">
        <h3 className="pt-3">Search Results : {searchValue}</h3>

        <ul className="nav nav-tabs pt-4" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="movies-tab"
              data-bs-toggle="tab"
              data-bs-target="#movies-tab-pane"
              type="button"
              role="tab"
              aria-controls="movies-tab-pane"
              aria-selected="true"
            >
              Movies {moviesPageData?.total_results}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="tvShows-tab"
              data-bs-toggle="tab"
              data-bs-target="#tvShows-tab-pane"
              type="button"
              role="tab"
              aria-controls="tvShows-tab-pane"
              aria-selected="false"
            >
              TV Shows {tvShowsPageData?.total_results}
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="people-tab"
              data-bs-toggle="tab"
              data-bs-target="#people-tab-pane"
              type="button"
              role="tab"
              aria-controls="people-tab-pane"
              aria-selected="false"
            >
              People {personPageData?.total_results}
            </button>
          </li>
        </ul>
        <div className="tab-content pt-4" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="movies-tab-pane"
            role="tabpanel"
            aria-labelledby="movies-tab"
            tabIndex="0"
          >
            {moviesPageData?.results?.length === 0 ? (
              <div className="pt-5 text-center">
                <h3>No Results Found</h3>
              </div>
            ) : (
              <>
                {moviesPageIsLoading ? (
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
                  <>
                    <div className="row g-4 row-cols-xl-5">
                      {moviesPageData?.results?.map((item, idx) => {
                        return (
                          <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 col-lg"
                            key={idx}
                          >
                            <Link
                              to={`/details/movie/${item.id}`}
                              className="text-decoration-none text-white"
                            >
                              <FilmBox item={item} />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    <nav
                      aria-label="Page navigation example "
                      className="w-100 pt-5"
                    >
                      <ul className="pagination justify-content-center">
                        <li
                          className="page-item"
                          onClick={() => gotToPageForMovies("<<")}
                        >
                          <span className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </span>
                        </li>
                        <li className="page-item activeLinkMovies active">
                          <span className="page-link">{movieValue}</span>
                        </li>

                        <li
                          className="page-item"
                          onClick={() => gotToPageForMovies(">>")}
                        >
                          <span className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </span>
                        </li>
                      </ul>
                    </nav>
                    <span className="lead text-center w-100 d-inline-block">
                      Total Pages : {moviesPageData?.total_pages}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="tvShows-tab-pane"
            role="tabpanel"
            aria-labelledby="tvShows-tab"
            tabIndex="0"
          >
            {tvShowsPageData?.results?.length === 0 ? (
              <div className="pt-5 text-center">
                <h3>No Results Found</h3>
              </div>
            ) : (
              <>
                {tvShowsPageIsLoading ? (
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
                  <>
                    <div className="row g-4 row-cols-xl-5">
                      {tvShowsPageData?.results?.map((item, idx) => {
                        return (
                          <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 col-lg"
                            key={idx}
                          >
                            <Link
                              to={`/details/tv/${item.id}`}
                              className="text-decoration-none text-white"
                            >
                              <FilmBox item={item} />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    <nav
                      aria-label="Page navigation example "
                      className="w-100 pt-5"
                    >
                      <ul className="pagination justify-content-center">
                        <li
                          className="page-item"
                          onClick={() => gotToPageForTvShows("<<")}
                        >
                          <span className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </span>
                        </li>
                        <li className="page-item activeLinkTvShows active">
                          <span className="page-link">{tvShowsValue}</span>
                        </li>

                        <li
                          className="page-item"
                          onClick={() => gotToPageForTvShows(">>")}
                        >
                          <span className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </span>
                        </li>
                      </ul>
                    </nav>
                    <span className="lead text-center w-100 d-inline-block">
                      Total Pages : {tvShowsPageData?.total_pages}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="people-tab-pane"
            role="tabpanel"
            aria-labelledby="people-tab"
            tabIndex="0"
          >
            {personPageData?.results?.length === 0 ? (
              <div className="pt-5 text-center">
                <h3>No Results Found</h3>
              </div>
            ) : (
              <>
                {personPageIsLoading ? (
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
                  <>
                    <div className="row g-4 row-cols-xl-5">
                      {personPageData?.results?.map((item, idx) => {
                        return (
                          <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 col-lg"
                            key={idx}
                          >
                            <Link
                              to={`/person/${item.id}`}
                              className="text-decoration-none text-white"
                            >
                              <div className="box">
                                <div className="img-box">
                                  <div>
                                    <img
                                      src={
                                        item.profile_path !== null
                                          ? "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                                            item.profile_path
                                          : require("../../Images/vNfL4DYnonltukBrrgMmw94zMYL.png")
                                      }
                                      alt=""
                                      className="w-100"
                                    />
                                  </div>
                                </div>
                                <div className="details mt-4 text-dark text-center">
                                  <h6>
                                    {item.title === undefined
                                      ? item.name
                                      : item.title}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    <nav
                      aria-label="Page navigation example "
                      className="w-100 pt-5"
                    >
                      <ul className="pagination justify-content-center">
                        <li
                          className="page-item"
                          onClick={() => gotToPageForPerson("<<")}
                        >
                          <span className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </span>
                        </li>
                        <li className="page-item activeLinkPerson active">
                          <span className="page-link">{personValue}</span>
                        </li>

                        <li
                          className="page-item"
                          onClick={() => gotToPageForPerson(">>")}
                        >
                          <span className="page-link" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </span>
                        </li>
                      </ul>
                    </nav>
                    <span className="lead text-center w-100 d-inline-block">
                      Total Pages : {personPageData?.total_pages}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
