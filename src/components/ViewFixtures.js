import React from "react";
import "../styles/listboxFix.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  getDatabase,
  ref,
  set,
  push,
  update,
  get,
  child,
} from "firebase/database";

export const ViewFixtures = (props) => {
  useEffect(() => {
    props.setSport(JSON.parse(window.sessionStorage.getItem("CurrentSport")));
  }, []);

  const navigate = useNavigate();

  const teamA = [];
  const teamB = [];
  const date = [];
  const time = [];
  var data = [];

  const items = [];

  function snapshotToArray(snapshot) {
    var returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });
    return returnArr;
  }

  // function navg(){
  //   navigate("/score-set");
  // }
  // firebase.initializeApp(firebaseConfig);
  // console.log("Helol");
  const dbRef = ref(getDatabase());
  get(child(dbRef, `${props.sport[0]}/Fixture/`)).then((snapshot) => {
    if (snapshot.exists()) {
      data = snapshotToArray(snapshot);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        teamA.push(data[i].TeamA);
        teamB.push(data[i].TeamB);
        date.push(data[i].Date);
        time.push(data[i].Time);
      }
      console.log(teamA, teamB, time, date)
      // console.log(teamA.length);
      let main = document.getElementById("fixtures");
      for (let i = 0; i < teamA.length; i++) {
        console.log(teamA[i], teamB[i], i);
        let box = document.createElement("div");
        let teamAInp = document.createElement("article");
        let teamBInp = document.createElement("article");
        let timeInp = document.createElement("article");
        let dateInp = document.createElement("article");
        let viewBtn = document.createElement("article");

        box.classList.add("viewFixtures-leaderboard__name");
        box.classList.add("viewFixtures-button__link");
        box.setAttribute("role", "button");
        box.setAttribute("id", `box${i}`);

        teamAInp.classList.add("viewFixtures-leaderboard__profile");
        teamAInp.setAttribute("id", `teamA_${i}`);
        teamAInp.innerHTML = teamA[i];

        teamBInp.classList.add("viewFixtures-leaderboard__profile");
        teamBInp.setAttribute("id", `teamB_${i}`);
        teamBInp.innerHTML = teamB[i];

        dateInp.classList.add("viewFixtures-leaderboard__profile");
        dateInp.setAttribute("id", `date_${i}`);
        dateInp.innerHTML = date[i];

        timeInp.classList.add("viewFixtures-leaderboard__profile");
        timeInp.setAttribute("id", `time_${i}`);
        timeInp.innerHTML = time[i];

        viewBtn.classList.add("viewFixtures-Submit");
        viewBtn.setAttribute("id", `v${i}`);
        viewBtn.innerHTML = "View";
        // viewBtn.onclick = navg;

        // let checkForBox = !!document.getElementById(`box${i}`);
        if (document.getElementById(`box${i}`) == null) {
          box.appendChild(teamAInp);
          box.appendChild(teamBInp);
          box.appendChild(dateInp);
          box.appendChild(timeInp);
          box.appendChild(viewBtn);
          document.getElementById("fixtures").appendChild(box);
        }
      }
    }
  })

  return (
    <div style={{ marginTop: "10%" }}>
      <h2>{props.sport[0]}</h2>
      <article className="viewFixtures-leaderboard">
        <div className="FixtureHeaders">
          <div>
            <h2> Team - 1 </h2>
          </div>
          <div>
            <h2> Team - 2 </h2>
          </div>
          <div>
            <h2> Date </h2>
          </div>
          <div>
            <h2> Time </h2>
          </div>
          <div>
            <h2> View Score </h2>
          </div>
        </div>
        <main className="viewFixtures-leaderboard__profiles" id="fixtures">
        </main>
      </article>
    </div>
  );
};
