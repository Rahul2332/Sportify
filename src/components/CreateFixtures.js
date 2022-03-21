import React from "react";
import "../styles/createFixtures.css";
import { getDatabase, ref, set, push, update } from "firebase/database";
import { useEffect } from "react";

//import { isAdmin } from "./Login";

export const CreateFixtures = (props) => {
  useEffect(() => {
    props.setSport(JSON.parse(window.sessionStorage.getItem("CurrentSport")));
  }, []);

  var totalFixtures = 1;
  //var index = 1;

  const database = getDatabase();
  for (let i = 1; i <= totalFixtures; i++) {
    var anu = document.getElementById(`button_${i}`)
    if (anu) {
      anu.addEventListener("click", (e) => {
        e.preventDefault()
        //console.log("Anurag")
        document.getElementById(`button_${i}`).innerHTML = "Edit";
        var team1 = document.getElementById(`teamA_${i}`).value;
        var team2 = document.getElementById(`teamB_${i}`).value;
        var date = document.getElementById(`date_${i}`).value;
        var time = document.getElementById(`time_${i}`).value;
        var x = team1 + team2;
        update(ref(database, `${props.sport[0]}/Fixture/${x}`), {
          TeamA: team1,
          TeamB: team2,
          Time: time,
          Date: date,
          Aset1: "0",
          Aset2: "0",
          Aset3: "0",
          Bset1: "0",
          Bset2: "0",
          Bset3: "0",
        })
      });
    }
  }

  // document.getElementById("butt1").addEventListener("click", (e) => {
  // function createFixture(index) {
  //   console.log("Myhello");
  //   //  console.log(e);
  //   //    e.preventDefault();
  //   for (let i = 1; i < totalFixtures; i++) {

  //     var team1 = document.getElementById(`t${index}1`).value;
  //     console.log(team1);
  //     var team2 = document.getElementById(`t${index}2`).value;
  //     console.log(team2);
  //     var t1 = document.getElementById(`t${index}`).value;
  //     console.log(t1);
  //     var d1 = document.getElementById(`d${index}`).value;
  //     console.log(d1);

  //     

  //     update(ref(database, `${props.sport[0]}/Fixture/${team1}`), {

  //     });
  //   }
  // }

  // function addFixture() {

  //   let leader_name = document.createElement("div");
  //   leader_name.classList.add("createFixtures-leaderboard__name");
  //   leader_name.classList.add("createFixtures-button__link");
  //   let inpT1 = document.createElement("input");
  //   inpT1.setAttribute("id", `t${totalFixtures}1`);
  //   let para = document.createElement("p");
  //   let inpT2 = document.createElement("input");
  //   inpT2.setAttribute("id", `t${totalFixtures}2`);
  //   let time = document.createElement("input");
  //   time.setAttribute("id", `t${totalFixtures}`);
  //   let date = document.createElement("input");
  //   date.setAttribute("id", `t${totalFixtures}`);
  //   let btn = document.createElement("button");
  //   btn.setAttribute("id", `butt${totalFixtures}`);
  //   inpT1.classList.add("createFixtures-leaderboard__profile");
  //   para.innerText = "V/S";
  //   para.classList.add("fixture-inline");
  //   inpT2.classList.add("createFixtures-leaderboard__profile");
  //   time.classList.add("createFixtures-leaderboard__profile");
  //   date.classList.add("createFixtures-leaderboard__profile");
  //   inpT1.setAttribute("placeholder", "Team-1");
  //   inpT2.setAttribute("placeholder", "Team-2");
  //   time.setAttribute("placeholder", "Time");
  //   date.setAttribute("placeholder", "Date");
  //   btn.classList.add("createFixtures-Submit");
  //   btn.innerText = "Create Fixtures";
  //   //btn.onclick = createFixture(totalFixtures);
  //   leader_name.appendChild(inpT1);
  //   leader_name.appendChild(para);
  //   leader_name.appendChild(inpT2);
  //   leader_name.appendChild(time);
  //   leader_name.appendChild(date);
  //   leader_name.appendChild(btn);
  //   document.getElementById("fixtures_container").appendChild(leader_name);
  //   totalFixtures++;
  //   console.log(totalFixtures);
  // }

  return (
    <div style={{ marginTop: "20%" }}>

      {/* {isAdmin ? ( */}
      <>
        <div className="FixtureHeaders">
          <div>
            <h2> Team - 1 </h2>
          </div>
          <div>
            <h2> Team - 2 </h2>
          </div>
          <div>
            <h2> Time </h2>
          </div>
          <div>
            <h2> Date </h2>
          </div>
          <div>
            <h2> Submit </h2>
          </div>
        </div>
        <div
          className="createFixtures-leaderboard__name createFixtures-button__link"
          id="fixtures_container"
        >
          <input
            type="text"
            className="createFixtures-leaderboard__profile"
            id="teamA_1"
            placeholder="Team-1"
          />
          <p className="fixture-inline"> V / S </p>
          <input
            type="text"
            className="createFixtures-leaderboard__profile"
            id="teamB_1"
            placeholder="Team-2"
          />
          <input
            type="text"
            className="createFixtures-leaderboard__profile"
            id="time_1"
            placeholder="Time"
          />
          <input
            type="text"
            className="createFixtures-leaderboard__profile"
            id="date_1"
            placeholder="Date"
          />
          <button
            className="createFixtures-Submit"
            id="button_1"
          //onClick={createFixture(1)}
          >
            Create Fixtures
          </button>
        </div>
        {/* </main> */}
        <div className="Fixture-button-center">
          <button
            className="createFixtures-btn"
            id="add_btn"
          //onClick={addFixture}
          >
            Add Fixture
          </button>
        </div>
      </>
      {/* ) : (
        <> </> */}
      {/* )} */}
    </div>
  );
};
