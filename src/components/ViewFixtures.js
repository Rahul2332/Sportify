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
  let SportsWithSets = [
		'Tennis Doubles',
		'Badminton Men Doubles',
		'Badminton Women Doubles',
		'Badminton Mixed Doubles',
		'Table Tennis Doubles',
		'Volleyball',
		'Tug Of War',
		'Carrom',
		'Tennis Singles',
		'Badminton Men Singles',
		'Badminton Women Singles',
		'T.T. Men Singles',
		'T.T. Women Singles',
	];

	let SportsWithoutSet = [
		'Football',
		'Basketball 3v3',
		'Basketball 5v5',
		'Cricket',
		'Gully Cricket',
		'Foosball',
		'Chess',
	];

  useEffect(() => {
    props.setSport(JSON.parse(window.sessionStorage.getItem("CurrentSport")));
  }, []);

  useEffect(() => {
    props.setTeamKey(window.sessionStorage.getItem("teamKey"));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("teamKey", props.teamKey);
  }, [props.teamKey]);

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

  function navg(){
    navigate("/score-set")
  }

  function sortFixtures(){
		for (let i = 0; i < date.length; i++) {
			for (let j = 0; j < date.length - 1 - i; j++) {
				if (date[j].substring(8,10) > date[j+1].substring(8,10)) {
					[date[j], date[j+1]] = [date[j+1], date[j]];
					[time[j], time[j+1]] = [time[j+1], time[j]];
					[teamA[j], teamA[j+1]] = [teamA[j+1], teamA[j]];
					[teamB[j], teamB[j+1]] = [teamB[j+1], teamB[j]];
				}else if(date[j].substring(8,10) == date[j+1].substring(8,10)){
					if(time[j].substring(0,3)>time[j+1].substring(0,3)){
						[date[j], date[j+1]] = [date[j+1], date[j]];
						[time[j], time[j+1]] = [time[j+1], time[j]];
						[teamA[j], teamA[j+1]] = [teamA[j+1], teamA[j]];
						[teamB[j], teamB[j+1]] = [teamB[j+1], teamB[j]];
					}else if(time[j].substring(0,3)==time[j+1].substring(0,3)){
						if(time[j].substring(3,5)>time[j+1].substring(3,5)){
							[date[j], date[j+1]] = [date[j+1], date[j]];
							[time[j], time[j+1]] = [time[j+1], time[j]];
							[teamA[j], teamA[j+1]] = [teamA[j+1], teamA[j]];
							[teamB[j], teamB[j+1]] = [teamB[j+1], teamB[j]];
						}
					}		
				}
			}
		}
	}

  const dbRef = ref(getDatabase());
  get(child(dbRef, `${props.sport[0]}/Fixture/`)).then((snapshot) => {
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    if (snapshot.exists()) {
      data = snapshotToArray(snapshot);
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        teamA.push(data[i].TeamA);
        teamB.push(data[i].TeamB);
        date.push(data[i].Date);
        time.push(data[i].Time);
      }
      sortFixtures();
      // console.log(teamA, teamB, time, date)
      // console.log(teamA.length);
      for (let i = 0; i < teamA.length; i++) {
        // console.log(teamA[i], teamB[i], i);
        let box = document.createElement("div");
        let teamAInp = document.createElement("article");
        let Versus = document.createElement("article");
        let teamBInp = document.createElement("article");
        let lineSeperator = document.createElement("article");
        let timeInp = document.createElement("article");
        let dateInp = document.createElement("article");
        let viewBtn = document.createElement("article");
        let anchor = document.createElement("a");

        box.classList.add("viewFixtures-leaderboard__name","viewFixtures-leaderboard__name-mobile");
        box.classList.add("viewFixtures-button__link","viewFixtures-button__link-mobile");
        box.setAttribute("role", "button");
        box.setAttribute("id", `box${i}`);

        teamAInp.classList.add("viewFixtures-leaderboard__profile");
        teamAInp.classList.add("fixturesTeam-mobile");
        teamAInp.setAttribute("id", `teamA_${i}`);
        teamAInp.innerHTML = teamA[i];

        //Versus
        Versus.classList.add("versusCSS");
        // Versus.setAttribute("id", `teamA_${i}`);
        Versus.innerHTML = "V/S";

        teamBInp.classList.add("viewFixtures-leaderboard__profile");
        teamBInp.classList.add("fixturesTeam-mobile");
        teamBInp.setAttribute("id", `teamB_${i}`);
        teamBInp.innerHTML = teamB[i];

        lineSeperator.classList.add("lineCSS");
        lineSeperator.innerHTML = "";

        dateInp.classList.add("viewFixtures-leaderboard__profile");
        dateInp.classList.add("date-time");
        dateInp.setAttribute("id", `date_${i}`);
        // dateInp.setAttribute("marginTop", "20px");
        dateInp.innerHTML = date[i];

        timeInp.classList.add("viewFixtures-leaderboard__profile");
        timeInp.classList.add("date-time");
        timeInp.setAttribute("id", `time_${i}`);
        timeInp.innerHTML = time[i];

        if(SportsWithSets.indexOf(props.sport[0]) != -1)
          anchor.setAttribute("href", "/score-set");
        if(SportsWithoutSet.indexOf(props.sport[0]) != -1)
          anchor.setAttribute("href", "/score-no-set");
        
        anchor.classList.add("viewFixtures-Submit");
        anchor.classList.add("viewFixtures-Submit-mobile");
        viewBtn.setAttribute("id", `v${i}`);
        viewBtn.innerHTML = "View";
        // viewBtn.onclick = async () => { keySetTeam(teamA[i] + teamB[i]); };
        // viewBtn.setAttribute("onclick", `keySetTeam(${teamA[i] + teamB[i]})`);
        viewBtn.onclick = function (){
          props.setTeamKey(teamA[i] + teamB[i]);
        }
        anchor.appendChild(viewBtn);

        // let checkForBox = !!document.getElementById(`box${i}`);
        if (document.getElementById(`box${i}`) == null) {
          box.appendChild(teamAInp);
          box.appendChild(Versus);
          box.appendChild(teamBInp);
          box.appendChild(lineSeperator);
          box.appendChild(dateInp);
          box.appendChild(timeInp);
          box.appendChild(anchor);
          document.getElementById("fixtures").appendChild(box);
        }
      }
    }
  })

  return (
    <div style={{ marginTop: "120px" }}>
      <h2 className="SportsName">{props.sport[0]}</h2>
      <article className="viewFixtures-leaderboard viewFixtures-leaderboard-mobile">
        <div className="FixtureHeaders FixtureHeaders-mobile">
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
        <main className="viewFixtures-leaderboard__profiles viewFixtures-leaderboard__profiles-mobile" id="fixtures">
        </main>
      </article>
    </div>
  );
};
