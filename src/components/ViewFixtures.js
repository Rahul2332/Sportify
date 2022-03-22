import React from "react";
import "../styles/listboxFix.css";
import { Link } from "react-router-dom";
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
      for (let i = 0; i < teamA.length; i++) {
        // console.log(teamA[i], teamB[i]);
        // console.log("HEHEHE") 
        console.log(items);
        items.push(
          <div
            role="button"
            className="viewFixtures-leaderboard__name viewFixtures-button__link"
          >
            <article className="viewFixtures-leaderboard__profile" id={`teamA_${i}`}>
            {teamA[i]}
            </article>
            <p style={{ display: "inline-flex", fontSize: "x-large" }}>
              V / S
            </p>
            <article className="viewFixtures-leaderboard__profile" id={`teamB_${i}`}>
              {teamB[i]}
            </article>
            <article className="viewFixtures-leaderboard__profile" id={`time_${i}`}>
              Time
            </article>
            <article className="viewFixtures-leaderboard__profile" id={`date_${i}`}>
              Date
            </article>
            <article className="viewFixtures-Submit" id={`v${i}`}>
              <Link to="/score-set"> View </Link>
            </article>
          </div>

        );
      }
    }
  })


  return (
    <div style={{ marginTop: "10%" }}>
      <h2>{props.sport[0]}</h2>
      <article className="viewFixtures-leaderboard">
        <main className="viewFixtures-leaderboard__profiles">

          {items}

        </main>
      </article>
    </div>
  );
};
