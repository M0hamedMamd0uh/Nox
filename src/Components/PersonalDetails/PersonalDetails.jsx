import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllDetails } from "../Redux/getDetails";
import { ThreeCircles } from "react-loader-spinner";
import OwlCarousel from "react-owl-carousel";
import FilmBox from "../FilmBox/FilmBox";
import { Helmet } from "react-helmet";

export default function PersonalDetails() {
  const { category, id } = useParams();

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

      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };
  const dispatch = useDispatch();

  const { allDetails, allDetailsIsLoading } = useSelector(
    (store) => store.details
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllDetails({ category: "person", id: id }));
  }, [dispatch, category, id]);

  function getAge() {
    let date = new Date();
    let birthDate = new Date(allDetails?.birthday);
    let diffDate = Math.round((date - birthDate) / 1000 / 60 / 60 / 24 / 365);
    return diffDate;
  }

  return (
    <>
      <Helmet>
        <title>
          {allDetails.original_title === undefined
            ? allDetails.name
            : allDetails.original_title}
        </title>
      </Helmet>
      <div className="container">
        {allDetailsIsLoading ? (
          <div className="d-flex justify-content-center align-items-center  w-100">
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
          <div className="box py-5">
            <div className="main-content row g-4" id="movieDetails">
              <div className="col-12 col-md-5 col-xl-3">
                <div className="image">
                  <img
                    src={
                      allDetails.profile_path
                        ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2` +
                          allDetails.profile_path
                        : require("../../Images/vNfL4DYnonltukBrrgMmw94zMYL.png")
                    }
                    alt=""
                    className="w-100 rounded-2 "
                  />
                </div>
                <div className="titleInSmallScreen  pt-4 ">
                  <h1 className="mb-0 fw-bold ">
                    {allDetails.original_title === undefined
                      ? allDetails.name
                      : allDetails.original_title}
                  </h1>
                </div>
                <h4 className="fw-bold mt-5">Personal Info</h4>
                <h6 className="my-3">
                  <p className="fw-medium mb-1">Known For</p>
                  <p className="fw-light">
                    {allDetails.known_for_department === null
                      ? "Unknown"
                      : allDetails.known_for_department}
                  </p>
                </h6>
                <h6 className="my-3">
                  <p className="fw-medium mb-1">Birthday</p>
                  <p className="fw-light">
                    {allDetails.birthday === null
                      ? "Unknown"
                      : `${allDetails.birthday} ( ${getAge()} years old )`}
                  </p>
                </h6>
                <h6 className="my-3">
                  <p className="fw-medium mb-1">Place Of Birth</p>
                  <p className="fw-light">
                    {allDetails.place_of_birth === null
                      ? "Unknown"
                      : allDetails.place_of_birth}
                  </p>
                </h6>
              </div>
              <div className="col-12 col-md-7 col-xl-9">
                <div className="content">
                  <div className="title titleInLargeScreen">
                    <h2 className="mb-4 fw-bold">
                      {allDetails.original_title === undefined
                        ? allDetails.name
                        : allDetails.original_title}
                    </h2>
                  </div>

                  <div className="overview">
                    <h5>Biography : </h5>
                    <p className="text-muted formatText">
                      {allDetails.biography === ""
                        ? "Unknown"
                        : allDetails.biography}
                    </p>
                  </div>

                  <div className="casts">
                    <h5 className="mt-5 mb-3">Known For</h5>
                    <OwlCarousel className="owl-theme" {...options}>
                      {allDetails.credits?.cast.length > 0 ? (
                        <>
                          {allDetails.credits?.cast.map((item, idx) => {
                            return (
                              <Link
                                to={`/details/movie/${item.id}`}
                                className="text-decoration-none text-white"
                                key={idx}
                              >
                                <FilmBox item={item} />
                              </Link>
                            );
                            // return <h2>{item.title}</h2>;
                          })}
                        </>
                      ) : (
                        "Unknown"
                      )}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
