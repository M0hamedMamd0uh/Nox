import React from "react";
import $ from "jquery";
export default function FilmBox({ cat, item }) {
  function dateFormat(item) {
    let time;
    if (item.release_date === undefined) {
      time = item.first_air_date;
    } else {
      time = item.release_date;
    }

    let date = new Date(time);
    let dateToString = date.toString().split(" ");
    let finalDate = `${dateToString[1]} ${dateToString[2]}, ${dateToString[3]}`;

    if (finalDate === "Date undefined, undefined") return "";
    else return finalDate;
  }

  function changeBackground(path) {
    if (cat === "freeToWatch") {
      $(".freeWatch ").css({
        background: `
    linear-gradient(
      to right,
      rgba(3, 37, 65, 0.7),
      rgba(3, 37, 65, 0.7)
    ),
    url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${path})`,
      });
    }
  }
  return (
    <>
      <div
        className="box"
        title={item.title === undefined ? item.name : item.title}
        onMouseEnter={() => changeBackground(item.poster_path)}
      >
        <div className="img-box">
          <div>
            <img
              src={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                    item.poster_path
                  : require("../../Images/vNfL4DYnonltukBrrgMmw94zMYL.png")
              }
              alt=""
              className="w-100 "
              id={`poster` + item.id}
            />
          </div>
          <div className="rate-container">
            <div className="outer-border">
              <div
                className="progress"
                style={{
                  background:
                    Math.round(item.vote_average * 10) >= 70
                      ? `conic-gradient(#1da161 ${
                          item.vote_average * 10 * 3.6
                        }deg, #1da1618c 0%)`
                      : `conic-gradient(#d2d531 ${
                          item.vote_average * 10 * 3.6
                        }deg, #423d0f 0%)`,
                }}
              >
                <span className="rate">
                  {Math.round(item.vote_average * 10)} <sup>%</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="details mt-4 text-black">
          <h6 className="categoryTitle">
            {item.title === undefined ? item.name : item.title}
          </h6>
          <span className="lead fs-6">{dateFormat(item)}</span>
        </div>
      </div>
    </>
  );
}
