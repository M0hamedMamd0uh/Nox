import React, { useEffect, useState } from "react";
import "./ShowDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDetails } from "../Redux/getDetails";
import { ThreeCircles } from "react-loader-spinner";
import $ from "jquery";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import FilmBox from "../FilmBox/FilmBox";
import { Helmet } from "react-helmet";
import { getMedia } from "../Redux/media";
import { getVideos } from "../Redux/videos";
export default function ShowDetails() {
  const { category, id } = useParams();

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

  let options = {
    margin: 15,
    // responsiveClassName: true,
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

  const dispatch = useDispatch();

  const { allDetails, allDetailsIsLoading } = useSelector(
    (store) => store.details
  );
  const { allMedia, mediaIsLoading } = useSelector((store) => store.media);
  const { allVideos, videosIsLoading } = useSelector((store) => store.videos);

  const [recommendations, setRecommendations] = useState([]);
  async function getRecommendations() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/recommendations?language=en-US&page=1`,
        configAPI
      );

      setRecommendations(data.results);
    } catch (error) {
      console.log("Error to Fetch Data");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getRecommendations();
    dispatch(getAllDetails({ category: category, id: id }));
    dispatch(getMedia({ category: category, id: id }));
    dispatch(getVideos({ category: category, id: id }));
  }, [dispatch, category, id]);

  function returnYear() {
    let year;

    if (allDetails.release_date) {
      year = allDetails.release_date;
    } else {
      year = allDetails.first_air_date;
    }

    let date = new Date(year);

    return date.getFullYear();
  }

  let configAPI = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDRlNmMyMWM4ZDY3Yzc5OWQ4NzQwYjBlYmI0MmQ0NSIsInN1YiI6IjY0Yzk3NDQ1ZGQ4M2ZhMDBjNTE3OGQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SdzR_cSB5_u6hJWLA1NIzrJlgupFfcwVlS3xvjBobGQ",
    },
  };
  async function getTrailerDetail() {
    if (allVideos?.length === 0) {
      $("#play-trailer").html("No Trailer Found ");
      setTimeout(() => {
        $("#play-trailer").remove();
      }, 2000);
      return;
    } else {
      let numsOfTrailers = 0;
      for (let i in allVideos) {
        if (allVideos[i].type === "Trailer") {
          numsOfTrailers++;
          $("#trailer-name").html(allVideos[i].name);
          $("#iframeID").attr(
            "src",
            `https://www.youtube.com/embed/${allVideos[i].key}?autoplay=1`
          );
          $("#youtube-video").css("display", "flex");
          return;
        }
      }

      if (numsOfTrailers === 0) {
        $("#trailer-name").html(allVideos[0].name);
        $("#iframeID").attr(
          "src",
          `https://www.youtube.com/embed/${allVideos[0].key}?autoplay=1`
        );
        $("#youtube-video").css("display", "flex");
      }
    }
  }

  function showTrailer(item) {
    $("#trailer-name").html(item.name);
    $("#iframeID").attr(
      "src",
      `https://www.youtube.com/embed/${item.key}?autoplay=1`
    );
    $("#youtube-video").css("display", "flex");
  }

  // for close youtube window
  function closePopUpWindow() {
    $("#youtube-video").css("display", "none");
    $("#iframeID").attr("src", " ");
  }

  function getDirectors() {
    let allCrews =
      allDetails?.credits?.crew === undefined
        ? []
        : [...allDetails.credits.crew];

    // select a specific jobs for filter according to
    allCrews = allCrews.filter(
      (el) =>
        el.job === "Director" ||
        el.job === "Characters" ||
        el.job === "Story" ||
        el.job === "Screenplay" ||
        el.job === "Creator" ||
        el.job === "Writer"
    );

    let clone = [];

    // becouse the original array is read only
    for (let i = 0; i < allCrews.length; i++) {
      clone.push({
        id: allCrews[i].id,
        name: allCrews[i].name,
        job: allCrews[i].job,
        profile_path: allCrews[i].profile_path,
      });
    }

    // for filter the character job and concat job together
    for (let i = 0; i < clone.length; i++) {
      for (let x = i + 1; x < clone.length; x++) {
        if (clone[i].id === clone[x].id) {
          clone[i].job += `, ${clone[x].job}`;
          clone[x].id = "000";
        }
      }
    }

    let finalResult = clone.filter((el) => el.id !== "000");

    return finalResult;
  }

  return (
    <>
      {category === "movie" ? (
        <Helmet>
          <title>
            {allDetails.title === undefined
              ? allDetails.original_title
              : allDetails.title}
          </title>
        </Helmet>
      ) : (
        <Helmet>
          <title>
            {allDetails.name === undefined
              ? allDetails.original_name
              : allDetails.name}
          </title>
        </Helmet>
      )}

      {allDetailsIsLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100  vh-100">
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
        <div>
          <div
            className="details viewHeight"
            style={{
              background: allDetails.backdrop_path
                ? ` linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url(${`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces`}${
                    allDetails.backdrop_path
                  })`
                : `linear-gradient(
      to right,
      rgba(10, 70, 130, 0.7),
      rgba(0, 0, 0, 0.7)
    )`,
            }}
          >
            <div className="container-xxl p-0">
              <div className="box py-5">
                <div className="main-content row g-4" id="movieDetails">
                  <div className="col-sm-8 offset-sm-2 offset-md-0 col-md-5 col-lg-3">
                    <div className="image">
                      <img
                        src={
                          allDetails.poster_path
                            ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2` +
                              allDetails.poster_path
                            : ""
                        }
                        alt=""
                        className="w-100"
                      />
                    </div>
                  </div>
                  <div className="col-md-7 col-lg-9">
                    <div className="content">
                      <div className="title">
                        <h2>
                          {category === "movie"
                            ? allDetails.title === undefined
                              ? allDetails.original_title
                              : allDetails.title
                            : allDetails.name === undefined
                            ? allDetails.original_name
                            : allDetails.name}
                          <span> ({returnYear()})</span>
                        </h2>
                        <h6 className="parentBox">
                          {/* <span>R</span> */}
                          <span className="py-1 px-2">
                            {" "}
                            {allDetails.release_date === undefined
                              ? allDetails.first_air_date
                              : allDetails.release_date}
                            {/* {newGenres.toString().split(",").join(", ")}) */}
                          </span>
                          <span className="dot"> . </span>
                          {allDetails.genres?.map((el, idx) => {
                            return (
                              <span className="comma" key={idx}>
                                {" "}
                                {el.name}{" "}
                              </span>
                            );
                          })}
                          <span className="dot"> . </span>{" "}
                          <span>
                            {allDetails.runtime === undefined
                              ? ""
                              : `${parseInt(allDetails.runtime / 60)}h ${
                                  allDetails.runtime % 60
                                }m`}
                          </span>
                        </h6>
                      </div>
                      <div className="status">
                        <div>
                          <div className="rate-container">
                            <div className="outer-border">
                              <div
                                className="progress"
                                style={{
                                  background:
                                    Math.round(allDetails.vote_average * 10) >=
                                    70
                                      ? `conic-gradient(#1da161 ${
                                          allDetails.vote_average * 10 * 3.6
                                        }deg, #1da1618c 0%)`
                                      : `conic-gradient(#d2d531 ${
                                          allDetails.vote_average * 10 * 3.6
                                        }deg, #423d0f 0%)`,
                                }}
                              >
                                <span className="rate">
                                  {Math.round(allDetails.vote_average * 10)}
                                  <sup>%</sup>{" "}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="user-score">
                            <h4>User Score</h4>
                          </div>
                        </div>
                        <div className="icons d-flex align-items-center">
                          {/* <span>
                            {" "}
                            <i className="fa-solid fa-list-ul"></i>
                          </span>
                          <span>
                            {" "}
                            <i className="fa-solid fa-heart"></i>
                          </span>
                          <span>
                            {" "}
                            <i className="fa-solid fa-bookmark"></i>
                          </span>
                          <span>
                            <i className="fa-solid fa-star"></i>
                          </span> */}
                          <span
                            id="play-trailer"
                            onClick={() => getTrailerDetail()}
                          >
                            {" "}
                            <i className="fa-solid fa-play "></i> Play Trailer{" "}
                          </span>
                        </div>
                      </div>
                      <p className="quote">{allDetails.tagline}</p>
                      <div className="overview">
                        <h5>Overview</h5>
                        <p>{allDetails.overview}</p>
                      </div>
                      <div className="director" id="director">
                        {getDirectors().map((el, idx) => {
                          return (
                            <div key={idx}>
                              <h6>
                                <Link
                                  className="crewTitle"
                                  to={`/person/${el.id}`}
                                >
                                  {el.name}
                                </Link>
                              </h6>
                              <p>{el.job}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="youtube-video" id="youtube-video">
                <div className="video-container">
                  <div>
                    <span className="lead m-0" id="trailer-name"></span>
                    <i
                      className="fa-solid fa-xmark"
                      id="closePopUp"
                      onClick={() => closePopUpWindow()}
                    ></i>
                  </div>

                  <iframe
                    id="iframeID"
                    width="1118"
                    height="628"
                    src=""
                    title="THE FLASH - FINAL TRAILER"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="container py-5">
            <div className="cast mb-5">
              <h3 className="mb-3 ">Cast</h3>
              {allDetails.credits?.cast?.length === 0 ? (
                <h3 className="text-center">No Cast Found</h3>
              ) : (
                <OwlCarousel className="owl-theme" {...options}>
                  {allDetails.credits?.cast?.map((item, idx) => {
                    return (
                      <Link
                        to={`/person/${item.id}`}
                        className="text-decoration-none text-white"
                        key={idx}
                      >
                        <div
                          className="item"
                          title={
                            item.title === undefined ? item.name : item.title
                          }
                        >
                          <div className="box">
                            <div className="img-box">
                              <div>
                                <img
                                  src={
                                    item.profile_path
                                      ? "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                                        item.profile_path
                                      : require("../../Images/vNfL4DYnonltukBrrgMmw94zMYL.png")
                                  }
                                  alt=""
                                  className="w-100"
                                />
                              </div>
                            </div>
                            <div className="details mt-4 text-black">
                              <h6>
                                {item.title === undefined
                                  ? item.name
                                  : item.title}
                              </h6>
                              <span className="lead fs-6 ">
                                {item.character}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </OwlCarousel>
              )}
            </div>
            <div className="mb-5">
              <h3 className="mb-4">Recommendations</h3>
              {recommendations.length === 0 ? (
                <h3 className="text-center">Not Recommendations Found</h3>
              ) : (
                <OwlCarousel className="owl-theme" {...options}>
                  {recommendations?.map((item, idx) => {
                    return (
                      <Link
                        to={`/details/${item.media_type}/${item.id}`}
                        className="text-decoration-none text-white"
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
            <div>
              <h3 className="mb-4">Media</h3>

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="videos-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#videos-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="videos-tab-pane"
                    aria-selected="true"
                  >
                    Videos {allVideos?.length}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="backdrops-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#backdrops-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="backdrops-tab-pane"
                    aria-selected="false"
                  >
                    Backdrops {allMedia?.backdrops?.length}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="poster-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#poster-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="poster-tab-pane"
                    aria-selected="false"
                  >
                    Posters {allMedia?.posters?.length}
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active "
                  id="videos-tab-pane"
                  role="tabpanel"
                  aria-labelledby="videos-tab"
                  tabIndex="0"
                >
                  {allVideos?.length === 0 ? (
                    <div className="pt-5 text-center">
                      <h3>No videos found</h3>
                    </div>
                  ) : (
                    <>
                      {videosIsLoading ? (
                        <>
                          <div className="d-flex justify-content-center align-items-center w-100  ">
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
                        </>
                      ) : (
                        <>
                          <OwlCarousel
                            className="owl-theme"
                            {...optionLatestTrailers}
                          >
                            {allVideos?.map((item, idx) => {
                              return (
                                <div className="item pt-4" key={idx}>
                                  <div className="box media">
                                    <div className="video-logo">
                                      <img
                                        src={
                                          item.backdrop_path === null
                                            ? `https://img.youtube.com/vi/${item.key}/0.jpg`
                                            : `https://img.youtube.com/vi/${item.key}/0.jpg`
                                        }
                                        alt="latest trailers"
                                        className="w-100 test"
                                      />
                                      <i
                                        className="fa-solid fa-play"
                                        onClick={() => showTrailer(item)}
                                      ></i>
                                    </div>
                                    <div className="details mt-2 text-center">
                                      <h6 className="my-1">
                                        {item.title === undefined
                                          ? item.name
                                          : item.title}
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </OwlCarousel>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="backdrops-tab-pane"
                  role="tabpanel"
                  aria-labelledby="backdrops-tab"
                  tabIndex="0"
                >
                  {allMedia?.backdrops?.length === 0 ? (
                    <div className="pt-5 text-center">
                      <h3>No Backdrops found</h3>
                    </div>
                  ) : (
                    <>
                      {mediaIsLoading ? (
                        <>
                          <div className="d-flex justify-content-center align-items-center w-100  ">
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
                        </>
                      ) : (
                        <>
                          <OwlCarousel className="owl-theme pt-4" {...options}>
                            {allMedia?.backdrops?.map((item, idx) => {
                              return (
                                <div className="item" key={idx}>
                                  <div className="box media">
                                    <div className="img-box">
                                      <div>
                                        <img
                                          src={
                                            item.file_path
                                              ? "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                                                item.file_path
                                              : require("../../Images/vNfL4DYnonltukBrrgMmw94zMYL.png")
                                          }
                                          alt=""
                                          className="w-100"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </OwlCarousel>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div
                  className="tab-pane fade"
                  id="poster-tab-pane"
                  role="tabpanel"
                  aria-labelledby="poster-tab"
                  tabIndex="0"
                >
                  {allMedia?.posters?.length === 0 ? (
                    <div className="pt-5 text-center">
                      <h3>No Poster found</h3>
                    </div>
                  ) : (
                    <>
                      {mediaIsLoading ? (
                        <>
                          <div className="d-flex justify-content-center align-items-center w-100  ">
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
                        </>
                      ) : (
                        <>
                          <OwlCarousel className="owl-theme pt-4" {...options}>
                            {allMedia?.posters?.map((item, idx) => {
                              return (
                                <div className="item" key={idx}>
                                  <div className="box media">
                                    <div className="img-box">
                                      <div>
                                        <img
                                          src={
                                            item.file_path
                                              ? "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                                                item.file_path
                                              : require("../../Images/vNfL4DYnonltukBrrgMmw94zMYL.png")
                                          }
                                          alt=""
                                          className="w-100"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </OwlCarousel>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
