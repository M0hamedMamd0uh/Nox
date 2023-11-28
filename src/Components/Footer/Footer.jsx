import React from "react";
import "./Footer.scss";
import blueSquare from "../../Images/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";

export default function Footer() {
  return (
    <>
      <div className="footer pt-5 mt-5 ">
        <div className="container">
          <div className="content d-flex">
            <div className="box d-flex">
              <img src={blueSquare} alt="footer logo" />
            </div>
            <div className="box">
              <h5>THE BASICS</h5>
              <h6>About TMDB</h6>
              <h6>Contact Us</h6>
              <h6>Support Forums</h6>
              <h6>API</h6>
              <h6>System Status</h6>
            </div>
            <div className="box">
              <h5>GET INVOLVED</h5>
              <h6>Contribution Bible</h6>
              <h6>Add New Movie</h6>
              <h6>Add New TV Show</h6>
            </div>
            <div className="box">
              <h5>COMMUNITY</h5>
              <h6>Guidelines</h6>
              <h6>Discussions</h6>
              <h6>Leaderboard</h6>
              <h6>Twitter</h6>
            </div>
            <div className="box">
              <h5>LEGAL</h5>
              <h6>Terms of Use</h6>
              <h6>API Terms of Use</h6>
              <h6>Privacy Policy</h6>
              <h6>DMCA Takedown Request</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
