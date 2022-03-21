import React from "react";
import "../styles/SportMenu.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import SpandanLogo from "../assets/spandan-removebg.png";
import { isAdmin } from "./Login";

const rules = {
  "Tennis Doubles":
    "https://drive.google.com/file/d/1aC5w_6sw0bL8rcIVruFebCHYtOHy008a/view?usp=sharing",
  Football:
    "https://drive.google.com/file/d/1IjPWc6wYq0zMhdSyRZQkMoHZEJbk8ZlL/view?usp=sharing",
  "Badminton Men Doubles":
    "https://drive.google.com/file/d/1OtDPDps_mqGYts_E7ngqX9i2C8Weqbqn/view?usp=sharing",
  "Badminton  Women Doubles":
    "https://drive.google.com/file/d/1OtDPDps_mqGYts_E7ngqX9i2C8Weqbqn/view?usp=sharing",
  "Badminton Mixed Doubles":
    "https://drive.google.com/file/d/1OtDPDps_mqGYts_E7ngqX9i2C8Weqbqn/view?usp=sharing",
  "Basketball 3v3":
    "https://drive.google.com/file/d/1u2O2DPWpgK7qgMCq957guqrVs4D0neBx/view?usp=sharing",
  "Basketball 5v5":
    "https://drive.google.com/file/d/1u2O2DPWpgK7qgMCq957guqrVs4D0neBx/view?usp=sharing",
  Cricket:
    "https://drive.google.com/file/d/1jmFnQa1qP2F0Jn3thcBDl0VG-43P8Ku1/view?usp=sharing",
  "Table Tennis Doubles":
    "https://drive.google.com/file/d/1gMRfBI25FdmRAY5_C-oUYJDCELeCjsxO/view?usp=sharing",
  Volleyball:
    "https://drive.google.com/file/d/1kAh0qqTXKnfCNOHx86Ii2iHqxb878rRH/view?usp=sharing",
  "Tug Of War":
    "https://drive.google.com/file/d/13gGeZoXTlmb_w3THDWXe9peqoupsvrwZ/view?usp=sharing",
  Carrom:
    "https://drive.google.com/file/d/1bmPhv8UgXv7gIaI_Zo_M3Ux0M7ztHUFI/view?usp=sharing",
  "Gully Cricket":
    "https://drive.google.com/file/d/1j56JcpU6xU9zBbiZmaAE_KhrcTEz4RAI/view?usp=sharing",
  Foosball:
    "https://drive.google.com/file/d/17zz6mqgNApEVZbAe6chmiId3138u4tao/view?usp=sharing",
  "Badminton Singles":
    "https://drive.google.com/file/d/1OtDPDps_mqGYts_E7ngqX9i2C8Weqbqn/view?usp=sharing",
  "Table Tennis Singles":
    "https://drive.google.com/file/d/1gMRfBI25FdmRAY5_C-oUYJDCELeCjsxO/view?usp=sharing",
  Chess:
    "https://drive.google.com/file/d/1HnxWtexlRo1WnlJT9H-h-JCZop7X-tct/view?usp=sharing",

  //**** */
  "Tennis Singles":
    "https://drive.google.com/file/d/1aC5w_6sw0bL8rcIVruFebCHYtOHy008a/view?usp=sharing",
  "Badminton Men Singles":
    "https://drive.google.com/file/d/1OtDPDps_mqGYts_E7ngqX9i2C8Weqbqn/view?usp=sharing",
  "Badminton Women Singles":
    "https://drive.google.com/file/d/1OtDPDps_mqGYts_E7ngqX9i2C8Weqbqn/view?usp=sharing",
  "T.T. Men Singles":
    "https://drive.google.com/file/d/1gMRfBI25FdmRAY5_C-oUYJDCELeCjsxO/view?usp=sharing",
  "T.T. Women Singles":
    "https://drive.google.com/file/d/1gMRfBI25FdmRAY5_C-oUYJDCELeCjsxO/view?usp=sharing",
  Chess:
    "https://drive.google.com/file/d/1HnxWtexlRo1WnlJT9H-h-JCZop7X-tct/view?usp=sharing",
  "Gym Event": "",
  //**** */
  Valorant:
    "https://drive.google.com/file/d/1oDOXsV5jre809qsmrg_6qg6Fb0eYvGBm/view?usp=sharing",
  FIFA: "https://drive.google.com/file/d/1HTy4VFEgpXi6AL-9xbQ2HPwNQqjpWBgK/view?usp=sharing",
  CSGO: "https://drive.google.com/file/d/18qIFydwIby9Hd7Jh4dC2eHel4ruwC_W3/view?usp=sharing",
  "PUB-G":
    "https://drive.google.com/file/d/180pWlZj1hD9qVW7ZNae-YEjJxSBs_Lg1/view?usp=sharing",
};
export const Menu = (props) => {
  useEffect(() => {
    props.setSport(JSON.parse(window.sessionStorage.getItem("CurrentSport")));
    console.log(props.sport)
}, []);
  // useEffect(() => {
  //   window.sessionStorage.setItem("CurrentSport", JSON.stringify(props.sport));
  // }, [props.sport]);
    // const handleClick = () => {
    //     window.open(rules[currSport[0]]);
    // };

  return (
    <div className="menu-a">
      {props.sport}
      <div className="menu-bgimg">
        <img
          className="menu-source-bgimg"
          src={SpandanLogo}
          alt="SpandanLogo"
        />
      </div>
      <main className="leaderboard__profiles">
        <h2>{props.sport[0]}</h2>
        <Link
          to="/register-for-sport"
          role="button"
          className="leaderboard__name button__link"
        >
          <article className="leaderboard__profile" id="menu_item0">
            Create team
          </article>
        </Link>
        <Link
          to="/registered-teams"
          role="button"
          className="leaderboard__name button__link"
        >
          <article className="leaderboard__profile" id="menu_item1">
            View Teams
          </article>
        </Link>
        <div className="leaderboard__name button__link">
          <article
            className="leaderboard__profile"
            id="menu_item3"
            // onClick={handleClick}
          >
            Rules
          </article>
        </div>
        {isAdmin ? (
          <Link
            to="create-fixtures"
            role="button"
            className="leaderboard__name button__link"
          >
            <article className="leaderboard__profile" id="menu_item2">
              Create Fixtures
            </article>
          </Link>
        ) : (
          <Link to="view-fixtures">
            <article className="leaderboard__profile" id="menu_item2">
              Fixtures
            </article>
          </Link>
        )}
      </main>
    </div>
  );
};
