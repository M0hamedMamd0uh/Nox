import React, { useEffect, useState } from "react";
import "./Home.scss";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ThreeCircles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrending } from "../Redux/trending";
import $ from "jquery";
import { getAllPopular } from "../Redux/popular";
import { getFreeToWatch } from "../Redux/freetowatch";
import { getLatestTrailer } from "../Redux/latestTrailers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FilmBox from "../FilmBox/FilmBox";
import { Helmet } from "react-helmet";
export default function Home() {
  let options = {
    margin: 15,
    responsiveClass: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      500: {
        items: 3,
      },
      700: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 7,
      },
    },
  };

  const [searchValue, setSearchValue] = useState(null);
  const nav = useNavigate();

  let optionLatestTrailers = {
    margin: 10,
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1400: {
        items: 4,
      },
    },
  };
  const dispatch = useDispatch();

  const { allTrendingData, trendingIsLoading } = useSelector(
    (store) => store.trending
  );
  const { allPopularData, popularIsLoading } = useSelector(
    (store) => store.popular
  );
  const { allFreeToWatch, freeToWatchIsLoading } = useSelector(
    (store) => store.freetowatch
  );
  const { allLatestTrailerData, latestTrailerIsLoading } = useSelector(
    (store) => store.latestTrailer
  );

  useEffect(() => {
    dispatch(getAllTrending());
    dispatch(getAllPopular());
    dispatch(getLatestTrailer());
    dispatch(getFreeToWatch());
  }, [dispatch]);

  async function chooseTrendingSection(time) {
    if (time === "today" && !$("#dayTrending").hasClass("active")) {
      $("#dayTrending").addClass("active");
      $("#weekTrending").removeClass("active");
      dispatch(getAllTrending("day"));
    } else if (time === "week" && !$("#weekTrending").hasClass("active")) {
      $("#dayTrending").removeClass("active");
      $("#weekTrending").addClass("active");
      dispatch(getAllTrending("week"));
    }
  }

  function choosePopularSection(type) {
    if (type === "movie" && !$("#moviePopular").hasClass("active")) {
      $("#moviePopular").addClass("active");
      $("#seriesPopular").removeClass("active");
      dispatch(getAllPopular("movie"));
    } else if (type === "tv" && !$("#seriesPopular").hasClass("active")) {
      $("#moviePopular").removeClass("active");
      $("#seriesPopular").addClass("active");
      dispatch(getAllPopular("tv"));
    }
  }

  function chooseFreeToWatchSection(type) {
    if (type === "movie" && !$("#freeMovie").hasClass("active")) {
      $("#freeMovie").addClass("active");
      $("#freeSeries").removeClass("active");
      dispatch(getFreeToWatch("discover/movie"));
    } else if (type === "tv" && !$("#freeSeries").hasClass("active")) {
      $("#freeMovie").removeClass("active");
      $("#freeSeries").addClass("active");
      dispatch(getFreeToWatch("discover/tv"));
    }
  }
  function chooseLatestTrailersSection(type) {
    if (type === "movie" && !$("#movieTrailers").hasClass("active")) {
      $("#movieTrailers").addClass("active");
      $("#seriesTrailers").removeClass("active");
      dispatch(getLatestTrailer("movie/now_playing"));
    } else if (type === "tv" && !$("#seriesTrailers").hasClass("active")) {
      $("#movieTrailers").removeClass("active");
      $("#seriesTrailers").addClass("active");
      dispatch(getLatestTrailer("tv/top_rated"));
    }
  }

  let configAPI = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
    },
  };
  async function getTrailerDetail(id) {
    // for know which section selected [movie | tv]
    let type = $("#movieTrailers").hasClass("active") ? "movie" : "tv";

    // for get all trailers of movie or tv show and select the official trailer and show it
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
        configAPI
      );

      for (let i in data.results) {
        if (data.results[i].type === "Trailer") {
          $("#trailer-name").html(data.results[i].name);
          $("#iframeID").attr(
            "src",
            `https://www.youtube.com/embed/${data.results[i].key}?autoplay=1`
          );
          $("#youtube-video").css("display", "flex");
          return;
        }
      }
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }

  // for close youtube window
  $("#closePopUp").on("click", function () {
    $("#youtube-video").css("display", "none");
    $("#iframeID").attr("src", " ");
  });

  function changeBackground(path) {
    let background = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${path}`;

    $(".latest-trailers ").css({
      background: `
    linear-gradient(
      to right,
      rgba(3, 37, 65, 0.7),
      rgba(3, 37, 65, 0.7)
    ),
    url(${background})`,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue === null || searchValue === "") return;
    $(".navbar-collapse").removeClass("show");

    nav(`search/${searchValue}`);
  }

  function getSearchValue() {
    setSearchValue($("#mainSearchValue").val());
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* start welcome section */}
      <div className="container-xxl p-0">
        <div
          className="welcome-section"
          id="welcome-section"
          style={{
            backgroundImage:
              localStorage.getItem("randomImage") !== null
                ? `linear-gradient(to right,rgba(3, 37, 65, 0.7),rgba(3, 37, 65, 0.7)   ),url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${localStorage.getItem(
                    "randomImage"
                  )})`
                : "linear-gradient(to right,rgba(3, 37, 65, 0.7),rgba(3, 37, 65, 0.7)",
          }}
        >
          <div className="content">
            <h2>Welcome.</h2>
            <h2>
              Millions of movies, TV shows and people to discover. Explore now.
            </h2>
            <div className="search-input">
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  autoComplete="off"
                  type="text"
                  id="mainSearchValue"
                  className="form-control"
                  placeholder="Search for a movie, tv show, person....."
                  onInput={() => getSearchValue("smallScreen")}
                  value={searchValue === null ? "" : searchValue}
                />
                <button>Search</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* end welcome section */}

      {/* Start Trending  */}
      <div className="container-xxl p-0">
        <div className="trending py-5">
          <div className="head d-flex gap-4 align-items-center">
            <h3 className="m-0">Trending</h3>
            <div className="buttons-switch d-flex align-items-center">
              <h3 className="m-0 active" id="dayTrending">
                <span onClick={() => chooseTrendingSection(`today`)}>
                  Today
                </span>
              </h3>
              <h3 className="m-0" id="weekTrending">
                <span onClick={() => chooseTrendingSection("week")}>
                  This Week
                </span>
              </h3>
            </div>
          </div>
          <div className="trending-showData py-4">
            {trendingIsLoading ? (
              <div className="d-flex justify-content-center align-items-center ">
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
              <OwlCarousel className="owl-theme" {...options}>
                {allTrendingData?.map((item, idx) => {
                  return (
                    <Link
                      to={`details/${item.media_type}/${item.id}`}
                      className="text-decoration-none text-black"
                      key={idx}
                    >
                      <div className="item">
                        <FilmBox item={item} />
                      </div>
                    </Link>
                  );
                })}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
      {/* End Trending  */}

      {/* Start Latest Trailers  */}
      <div className="container-xxl p-0">
        <div
          className="latest-trailers pt-5"
          style={{
            backgroundImage:
              allLatestTrailerData.length > 0
                ? `linear-gradient(to right,rgba(3, 37, 65, 0.7),rgba(3, 37, 65, 0.7)   ),url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${allLatestTrailerData[0].backdrop_path})`
                : "linear-gradient(to right,rgba(3, 37, 65, 0.7),rgba(3, 37, 65, 0.7)",
          }}
        >
          <div className="head d-flex gap-4 align-items-center">
            <h3 className="m-0">Latest Trailers</h3>
            <div className="buttons-switch d-flex align-items-center">
              <h3 className="m-0 active" id="movieTrailers">
                <span onClick={() => chooseLatestTrailersSection(`movie`)}>
                  Movie
                </span>
              </h3>
              <h3 className="m-0" id="seriesTrailers">
                <span onClick={() => chooseLatestTrailersSection(`tv`)}>
                  Series
                </span>
              </h3>
            </div>
          </div>

          <div
            className="latest-trailers-showData py-5 d-flex owl-carousel owl-theme"
            id="latest-trailers"
          >
            {latestTrailerIsLoading ? (
              <div className="d-flex justify-content-center align-items-center ">
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
              <OwlCarousel className="owl-theme" {...optionLatestTrailers}>
                {allLatestTrailerData?.map((item, idx) => {
                  return (
                    <div className="item " key={idx}>
                      <div
                        className="box"
                        title={
                          item.title === undefined ? item.name : item.title
                        }
                        onMouseEnter={() =>
                          changeBackground(item.backdrop_path)
                        }
                      >
                        <div className="video-logo">
                          <img
                            src={
                              item.backdrop_path === null
                                ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`
                                : `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}`
                            }
                            alt="latest trailers"
                            className="w-100 test"
                          />
                          <i
                            className="fa-solid fa-play"
                            onClick={() => getTrailerDetail(item.id)}
                          ></i>
                        </div>
                        <div className="details mt-2 text-center">
                          <h6 className="my-1" id="670292">
                            {item.title === undefined ? item.name : item.title}
                          </h6>
                          {/* <span className="lead fs-6" id="trailerNameSpan">
                            Final Trailer
                          </span> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            )}
          </div>

          <div className="youtube-video" id="youtube-video">
            <div className="video-container">
              <div>
                <span className="lead m-0" id="trailer-name"></span>
                <i className="fa-solid fa-xmark" id="closePopUp"></i>
              </div>

              <iframe
                id="iframeID"
                width="1118"
                height="628"
                src=""
                title="THE FLASH - FINAL TRAILER"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* end Latest Trailers  */}

      {/* Start What's Popular  */}

      <div className="container-xxl p-0">
        <div className="trending popular pt-5 pb-0">
          <div className="head d-flex gap-4 align-items-center">
            <h3 className="m-0">What's Popular</h3>
            <div className="buttons-switch d-flex align-items-center">
              <h3 className="m-0 active" id="moviePopular">
                <span onClick={() => choosePopularSection(`movie`)}>Movie</span>
              </h3>
              <h3 className="m-0" id="seriesPopular">
                <span onClick={() => choosePopularSection(`tv`)}>TV</span>
              </h3>
            </div>
          </div>
          <div
            className="trending-showData py-4 d-flex owl-carousel owl-theme"
            id="popular"
          >
            {popularIsLoading ? (
              <div className="d-flex justify-content-center align-items-center ">
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
              <OwlCarousel className="owl-theme" {...options}>
                {allPopularData?.map((item, idx) => {
                  return (
                    <Link
                      to={`details/${
                        $("#moviePopular").hasClass("active") ? "movie" : "tv"
                      }/${item.id}`}
                      className="text-decoration-none text-black"
                      key={idx}
                    >
                      <div className="item">
                        <FilmBox item={item} />
                      </div>
                    </Link>
                  );
                })}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>

      {/* End What's Popular  */}

      {/* Start Free To Watch   */}
      <div className="container-xxl p-0 layer">
        <div
          className="trending freeWatch pt-5 pb-0"
          style={{
            backgroundImage:
              allFreeToWatch.length > 0
                ? `linear-gradient(to right,rgba(3, 37, 65, 0.7),rgba(3, 37, 65, 0.7)   ),url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${allFreeToWatch[0].poster_path})`
                : "linear-gradient(to right,rgba(3, 37, 65, 0.7),rgba(3, 37, 65, 0.7)",
          }}
        >
          <div className="freeWatchHead d-flex gap-4 align-items-center">
            <h3 className="m-0">Free To Watch</h3>
            <div className="buttons-switch d-flex align-items-center">
              <h3 className="m-0 active" id="freeMovie">
                <span onClick={() => chooseFreeToWatchSection(`movie`)}>
                  Movies
                </span>
              </h3>
              <h3 className="m-0" id="freeSeries">
                <span onClick={() => chooseFreeToWatchSection(`tv`)}>TV</span>
              </h3>
            </div>
          </div>
          <div
            className="trending-showData py-4 d-flex owl-carousel owl-theme"
            id="freeWatch"
          >
            {freeToWatchIsLoading ? (
              <div className="d-flex justify-content-center align-items-center ">
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
              <OwlCarousel  className="owl-theme" {...options}>
                {allFreeToWatch?.map((item, idx) => {
                  return (
                    <Link
                      to={`details/${
                        $("#freeMovie").hasClass("active") ? "movie" : "tv"
                      }/${item.id}`}
                      className="text-decoration-none text-white"
                      key={idx}
                    >
                      <div className="item">
                        <FilmBox item={item} cat="freeToWatch" />
                      </div>
                    </Link>
                  );
                })}
              </OwlCarousel >
            )}
          </div>
        </div>
      </div>
      {/* End Free To Watch   */}
    </>
  );
}
