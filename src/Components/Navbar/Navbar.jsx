import React, { useEffect, useState } from "react";
import logo from "../../Images/movie-camera.png";
import $ from "jquery";
import "./Navbar.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState(null);
  const nav = useNavigate();

  function stepTwo() {
    // for set default properties in larger screen
    $(window).on("resize", function () {
      if (this.innerWidth >= 992) {
        setMovieLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        setTvShowsLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        setPeopleLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
      }
    });
  }

  function stepThree() {
    // navbar show and disapper
    let prevScrollPos = window.pageYOffset;
    $(window).scroll(function () {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        // user has scrolled up
        $(".navbar").css("top", 0);
        // $(".navbar").css("opacity", 1);
      } else {
        // user has scrolled down

        // for make navbar-collapse wait .5s before disappear and then make it close
        setTimeout(() => {
          $(".navbar-collapse").removeClass("show");
        }, 500);
        $(".navbar").css("top", `-${$(".navbar").innerHeight()}px`);
        // $(".navbar").css("opacity", 0);
      }

      // update previous scroll position
      prevScrollPos = currentScrollPos;
    });
  }

  function closeNavbar(path) {
    $(".navbar-collapse").removeClass("show");

    setMovieLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
    setTvShowsLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
    setPeopleLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });

    nav(path);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (searchValue === null || searchValue === "") return;

    $(".navbar-collapse").removeClass("show");

    setMovieLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
    setTvShowsLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
    setPeopleLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });

    setSearchValue("");

    nav(`search/${searchValue}`);
  }

  function getSearchValue(screenType) {
    if (screenType === "largeScreen") {
      setSearchValue($("#searchValue").val());
    } else {
      setSearchValue($("#searchValueSmallScreen").val());
    }
  }

  function openAndCloseSearch(status) {
    if (status === "close") {
      $(".search-icon").removeClass("d-inline-block");
      $(".search-icon").addClass("d-none");

      $(".close-icon").removeClass("d-none");
      $(".close-icon").addClass("d-inline-block");

      // show search input
      $(".searchBox").removeClass("d-none");
      $(".searchBox").addClass("d-inline-block");

      $(".searchBox input").focus();
    } else {
      $(".search-icon").removeClass("d-none");
      $(".search-icon").addClass("d-inline-block");

      $(".close-icon").removeClass("d-inline-block");
      $(".close-icon").addClass("d-none");

      // disappear search input
      $(".searchBox").removeClass("d-inline-block");
      $(".searchBox").addClass("d-none");
    }
  }

  function clearAll() {
    $(".searchBox input").val("");
    $(".searchBoxLink input").val("");
  }

  const [movieLink, setMovieLink] = useState({
    display: "none",
    position: "absolute",
    width: "170px",
  });
  const [tvShowsLink, setTvShowsLink] = useState({
    display: "none",
    position: "absolute",
    width: "170px",
  });
  const [peopleLink, setPeopleLink] = useState({
    display: "none",
    position: "absolute",
    width: "170px",
  });
  function linkClicked(type) {
    if ($(window).outerWidth(true) < 992) {
      if (type === "movie") {
        setTvShowsLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        setPeopleLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        if (movieLink.display === "none") {
          setMovieLink({
            display: "block",
            position: "relative",
            width: "100%",
          });
        } else {
          setMovieLink({
            display: "none",
            position: "absolute",
            width: "170px",
          });
        }
      } else if (type === "tv") {
        setMovieLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        setPeopleLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        if (tvShowsLink.display === "none") {
          setTvShowsLink({
            display: "block",
            position: "relative",
            width: "100%",
          });
        } else {
          setTvShowsLink({
            display: "none",
            position: "absolute",
            width: "170px",
          });
        }
      } else {
        setMovieLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        setTvShowsLink({
          display: "none",
          position: "absolute",
          width: "170px",
        });
        if (peopleLink.display === "none") {
          setPeopleLink({
            display: "block",
            position: "relative",
            width: "100%",
          });
        } else {
          setPeopleLink({
            display: "none",
            position: "absolute",
            width: "170px",
          });
        }
      }
    } else {
      setMovieLink({
        display: "none",
        position: "absolute",
        width: "170px",
      });
      setTvShowsLink({
        display: "none",
        position: "absolute",
        width: "170px",
      });
      setPeopleLink({
        display: "none",
        position: "absolute",
        width: "170px",
      });
    }
  }
  useEffect(() => {
    stepTwo();
    stepThree();
    setMovieLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
    setTvShowsLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
    setPeopleLink({
      display: "none",
      position: "absolute",
      width: "170px",
    });
  }, [pathname]);
  return (
    <>
      <nav className="navbar navbar-expand-lg p-0">
        <div className="nav-container container-fluid container-xxl">
          <span className=" navbar-brand" onClick={() => closeNavbar("/")}>
            <img src={logo} alt="logo icon" />
            <span className="ms-1 fw-semibold">NOX</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item section-link">
                <a
                  className="nav-link"
                  aria-current="page"
                  onClick={() => linkClicked("movie")}
                >
                  Movies
                </a>
                <ul
                  className="list-unstyled section-dropdown "
                  style={{
                    display: movieLink.display,
                    position: movieLink.position,
                    width: movieLink.width,
                  }}
                >
                  <li className="lead">
                    <span onClick={() => closeNavbar("/popularMovie")}>
                      Popular
                    </span>
                  </li>
                  <li className="lead">
                    <span onClick={() => closeNavbar("/nowPlayingMovie")}>
                      Now Playing
                    </span>
                  </li>
                  <li className="lead">
                    <span
                      to="/upComingMovie"
                      onClick={() => closeNavbar("/upComingMovie")}
                    >
                      Upcoming
                    </span>
                  </li>
                  <li className="lead">
                    <span onClick={() => closeNavbar("/topRatedMovie")}>
                      Top Rated
                    </span>
                  </li>
                </ul>
              </li>
              <li className="nav-item section-link">
                <a className="nav-link" onClick={() => linkClicked("tv")}>
                  TV Shows
                </a>
                <ul
                  className="list-unstyled section-dropdown"
                  style={{
                    display: tvShowsLink.display,
                    position: tvShowsLink.position,
                    width: tvShowsLink.width,
                  }}
                >
                  <li className="lead">
                    <span onClick={() => closeNavbar("/popularTv")}>
                      Popular
                    </span>
                  </li>
                  <li className="lead">
                    <span onClick={() => closeNavbar("/airingTodayTv")}>
                      Airing Today
                    </span>
                  </li>
                  <li className="lead">
                    <span onClick={() => closeNavbar("/onTV")}>On TV</span>
                  </li>
                  <li className="lead">
                    <span onClick={() => closeNavbar("/topRatedTv")}>
                      Top Rated
                    </span>
                  </li>
                </ul>
              </li>
              <li className="nav-item section-link">
                <a className="nav-link" onClick={() => linkClicked("people")}>
                  People
                </a>
                <ul
                  className="list-unstyled section-dropdown"
                  style={{
                    display: peopleLink.display,
                    position: peopleLink.position,
                    width: peopleLink.width,
                  }}
                >
                  <li className="lead">
                    <span onClick={() => closeNavbar("/popularPeople")}>
                      Popular People
                    </span>
                  </li>
                </ul>
              </li>
              <li className="nav-item section-link search-open-close-Icons">
                <a className="nav-link">
                  <i
                    className="search-icon fa-solid fa-magnifying-glass text-white fs-6"
                    onClick={() => openAndCloseSearch("close")}
                  ></i>
                  <i
                    className="close-icon fa-solid fa-xmark text-white d-none fs-5"
                    onClick={() => openAndCloseSearch("open")}
                  ></i>
                </a>
              </li>
              <li className="searchBoxSmallScreen d-none nav-item section-link ">
                <div className="searchBoxLink  bg-white  w-100 ">
                  <div className="container-fluid container-xxl">
                    <div className="content d-flex  align-items-center justify-content-start gap-3">
                      <i className="fa-solid fa-magnifying-glass "></i>

                      <form
                        className="flex-grow-1"
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <input
                          autoComplete="off"
                          type="text"
                          id="searchValueSmallScreen"
                          placeholder="Search for a movie, tv show, person..."
                          className="form-control border-0 "
                          onInput={() => getSearchValue("smallScreen")}
                          value={searchValue === null ? "" : searchValue}
                        />
                      </form>

                      <i
                        className="clearAll fa-solid fa-xmark border border-1 p-1 "
                        onClick={() => clearAll()}
                      ></i>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="searchBox bg-white position-absolute w-100 d-none">
          <div className="container-fluid container-xxl">
            <div className="content d-flex  align-items-center justify-content-start gap-3">
              <i className="fa-solid fa-magnifying-glass "></i>

              <form className="flex-grow-1" onSubmit={(e) => handleSubmit(e)}>
                <input
                  autoComplete="off"
                  type="text"
                  id="searchValue"
                  placeholder="Search for a movie, tv show, person..."
                  className="form-control border-0 "
                  onInput={() => getSearchValue("largeScreen")}
                  value={searchValue === null ? "" : searchValue}
                />
              </form>

              <i
                className="clearAll fa-solid fa-xmark border border-1 p-1 "
                onClick={() => clearAll()}
              ></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
