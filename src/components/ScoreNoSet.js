import React from "react";
import "../styles/SportMenu.css";
import { Link } from "react-router-dom";
import "../styles/Scorecard.css";
import refreshIcon from "../assets/icons8-refresh.svg";
import {
  getDatabase,
  ref,
  set,
  push,
  update,
  get,
  child,
} from "firebase/database";
import { useEffect } from "react";

export const ScoreNoSet = (props) => {
  useEffect(() => {
    props.setSport(JSON.parse(window.sessionStorage.getItem("CurrentSport")));
  }, []);

  useEffect(() => {
    props.setTeamKey(JSON.parse(window.sessionStorage.getItem("teamKey")));
  }, []);

  fixtures();

  function fixtures() {
    var key = props.teamKey[0] + props.teamKey[1];

    const dbRef = ref(getDatabase());
    get(child(dbRef, `${props.sport[0]}/Fixture/${key}`)).then((snapshot) => {
      if (snapshot.exists()) {
        var TeamName1 = snapshot.val()["TeamA"];
        var TeamName2 = snapshot.val()["TeamB"];
        var score1 = snapshot.val()["ScoreA"];
        var score2 = snapshot.val()["ScoreB"];
        var status = snapshot.val()["Status"];


        document.getElementById("TeamA").innerText = TeamName1;
        document.getElementById("TeamB").innerText = TeamName2;
        document.getElementById("scoreA").innerText = score1;
        document.getElementById("scoreB").innerText = score2;

      } else {
        console.log("No data available");
      }
  });
  }

  return (
    <div id="score-no-setID" style={{ marginTop: "120px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="toolbar">
          <a className="btn btn_live" style={{ display: "none" }}>
            Live <span className="live-icon"> </span>
          </a>
          <a
            className="btn btn_live"
            style={{ backgroundColor: "grey", color: "white", display: "none" }}
          >
            Upcoming
          </a>
          <a
            className="btn btn_live hiderClass"
            style={{ backgroundColor: "greenyellow", color: "black", display: "none"}}
          >
            Finished
          </a>
        </div>
      </div>
      <div className="toolbar">
        <img
          type="submit"
          onClick={fixtures}
          id="butt"
          className="btn btn_live refreshBtn"
          src={refreshIcon}
          // alt="refresh"
          style={{ backgroundColor: "lightgreen" }}
        />
      </div>
      <div className="row2-container">
        <div className="box box-down cyan">
          <h2 id="TeamA"> Team - A </h2>
          <div className="set-finals">
              <p id="scoreA"> 2 </p>
          </div>
        </div>
        <div className="box box-down cyan">
          <h2 id="TeamB"> Team - B </h2>
          {/* <div className="set-score">
            <p> SET - 1 &nbsp; &nbsp; &nbsp; &nbsp; </p>
            <p id="setB1"> score </p>
          </div>
          <div className="set-score">
            <p> SET - 2 </p> <p id="setB2"> score </p>
          </div>
          <div className="set-score">
            <p> SET - 3 </p> <p id="setB3"> score </p>
          </div> */}
          <div className="set-finals">
              <p id="scoreB"> 5 </p>
          </div>
        </div>
      </div>
      
    </div>
  );
// return (<></>);
};
