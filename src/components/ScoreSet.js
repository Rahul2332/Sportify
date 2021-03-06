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
  child
} from "firebase/database";
import { useEffect } from "react";

export const ScoreSet = (props) => {
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
        var status = snapshot.val()["Status"];
        var score1 = snapshot.val()["ScoreA"];
        var score2 = snapshot.val()["ScoreB"];
        var team11 = snapshot.val()["Aset1"];
        var team12 = snapshot.val()["Aset2"];
        var team13 = snapshot.val()["Aset3"];
        var team21 = snapshot.val()["Bset1"];
        var team22 = snapshot.val()["Bset2"];
        var team23 = snapshot.val()["Bset3"];

        document.getElementById("TeamA").innerText = TeamName1;
        document.getElementById("TeamB").innerText = TeamName2;
        document.getElementById("scoreA").innerText = score1;
        document.getElementById("scoreB").innerText = score2;
        document.getElementById("setA1").innerText = team11;
        document.getElementById("setA2").innerText = team12;
        document.getElementById("setA3").innerText = team13;
        document.getElementById("setB1").innerText = team21;
        document.getElementById("setB2").innerText = team22;
        document.getElementById("setB3").innerText = team23;

        // changing status of event
        let U = document.getElementById("upcomming-status");
        if(status == "Upcomming"){
          U.classList.toggle("hiderClass");
          
        }

        let TeamAScore = 0, TeamBScore = 0;

        if(team11 != team21){
          if (team11 > team21) TeamAScore++;
          else TeamBScore++;
        }
        if(team12 != team22){
          if (team12 > team22) TeamAScore++;
          else TeamBScore++;
        }
        if(team13 != team23){
          if (team13 > team23) TeamAScore++;
          else TeamBScore++;
        }

        // document.getElementById("scoreA").innerText = TeamAScore;
        // document.getElementById("scoreB").innerText = TeamBScore;
      } else {
        console.log("No data available");
      }
  });
  }

  return (
    <div style={
      { marginTop: "120px" }
    }>
      <div style={
        {
          display: "flex",
          justifyContent: "center",
        }
      }>
        <div id="StatusID" className="toolbar">
          <a className="btn btn_live" id="live-status"
            style={
              { display: "none" }
            }
            >
            Live
            <span className="live-icon"></span>
          </a>
          <a className="btn btn_live" id="upcomming-status"
            style={
              {
                backgroundColor: "grey",
                color: "white",
                display: "none"
              }
            }>
            Upcoming
          </a>
          <a className="btn btn_live" id="finished-status"
            style={
              {
                backgroundColor: "greenyellow",
                color: "black",
                display: "none"
              }
            }>
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
      <div className="row1-container">
        <div id="setWinsID" className="box box-down blue"
          style={
            { maxWidth: "1040px" }
          }>
          {/* <h2> {props.sport[0]} </h2> */}
          <div className="set-finals">
            <p id="scoreA">
              winsA
            </p>
            <p>
              -
            </p>
            <p id="scoreB">
              winsB
            </p>
          </div>
        </div>
      </div>
      <div className="row2-container">
        <div className="box box-down cyan">
          <h2 id="TeamA">
            Team - A
          </h2>
          <div id="scoreMobileID" className="set-score">
            <p>
              SET - 1 &nbsp; &nbsp; &nbsp; &nbsp;
            </p>
            <p id="setA1">
              score
            </p>
          </div>
          <div id="scoreMobileID" className="set-score">
            <p>
              SET - 2
            </p>
            <p id="setA2">
              score
            </p>
          </div>
          <div id="scoreMobileID" className="set-score">
            <p>
              SET - 3
            </p>
            <p id="setA3">
              score
            </p>
          </div>
        </div>
        <div className="box box-down cyan">
          <h2 id="TeamB">
            Team - B
          </h2>
          <div id="scoreMobileID" className="set-score">
            <p>
              SET - 1 &nbsp; &nbsp; &nbsp; &nbsp;
            </p>
            <p id="setB1">
              score
            </p>
          </div>
          <div id="scoreMobileID" className="set-score">
            <p>
              SET - 2
            </p>
            <p id="setB2">
              score
            </p>
          </div>
          <div id="scoreMobileID" className="set-score">
            <p>
              SET - 3
            </p>
            <p id="setB3">
              score
            </p>
          </div>
        </div>
      </div>
      {/* <div className="toolbar">
        <img type="submit"
          // onClick={fixtures}
          id="butt"
          className="btn btn_live refreshBtn"
          src={refreshIcon}
          // alt="refresh"
          style={
            { backgroundColor: "lightgreen" }
          } />
      </div> */}
    </div>
  );
};
