import React from "react";
import "../styles/SportMenu.css";
import "../styles/Scorecard.css"
import { getDatabase, ref, set, push, update } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export const ScoreCard = (props) => {
    useEffect(() => {
        props.setSport(JSON.parse(window.sessionStorage.getItem("CurrentSport")));
        console.log(props.sport)
    }, []);

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

    async function StartMatch(e) {
        e.preventDefault()
        var TeamName1 = document.getElementById('TeamName1').value;
        var TeamName2 = document.getElementById('TeamName2').value;
        const database = getDatabase();
        update(ref(database, `${props.sport[0]}/Fixture/${TeamName1 + TeamName2}`), {
            Status: "Live"
        });
    }
    async function EndMatch(e) {
        e.preventDefault()
        var TeamName1 = document.getElementById('TeamName1').value;
        var TeamName2 = document.getElementById('TeamName2').value;
        const database = getDatabase();
        update(ref(database, `${props.sport[0]}/Fixture/${TeamName1 + TeamName2}`), {
            Status: "Completed"
        });
    }


    async function addFixture(e) {
        e.preventDefault()
        var TeamName1 = document.getElementById('TeamName1').value;
        var TeamName2 = document.getElementById('TeamName2').value;
        var scoreA = document.getElementById('score1').value;
        var scoreB = document.getElementById('score2').value;

        var team11 = "0";
        var team12 = "0";
        var team13 = "0";
        var team21 = "0";
        var team22 = "0";
        var team23 = "0";

        if (SportsWithSets.indexOf(props.sport[0]) != -1) {
            team11 = document.getElementById('team11').value;
            team12 = document.getElementById('team12').value;
            team13 = document.getElementById('team13').value;
            team21 = document.getElementById('team21').value;
            team22 = document.getElementById('team22').value;
            team23 = document.getElementById('team23').value;
        }

        const database = getDatabase();
        update(ref(database, `${props.sport[0]}/Fixture/${TeamName1 + TeamName2}`), {
            TeamA: TeamName1,
            TeamB: TeamName2,
            ScoreA: scoreA,
            ScoreB: scoreB,
            Aset1: team11,
            Aset2: team12,
            Aset3: team13,
            Bset1: team21,
            Bset2: team22,
            Bset3: team23
        });
    }

    return (
        <div style={{ marginTop: "120px", marginBottom: "60px" }}>
            <div className="ScoreCardCreate" style={{paddingBottom:"10px"}}>
                <h3>{props.sport[0]}</h3>
                <div className="row1-container">
                    <div className="row1-container toolbar" style={{paddingBottom:"10px"}}>
                        <input type="submit" 
                        // onClick={StartMatch} 
                        id="Startbutt" className="btn btn_live" 
                        value="Start" style={{color:"#009900"}} />
                    </div>
                    <div className="row1-container toolbar" style={{paddingBottom:"10px"}}>
                        <input type="submit" 
                        // onClick={EndMatch} 
                        id="Endbutt" className="btn btn_live" 
                        value="End" style={{color:"#D2042D"}}/>
                    </div>
                </div>
            </div>


            <div className="row1-container">
                <div className="box box-down cyan">
                    <h2>Team-A</h2>
                    <div className="updateScore">
                        <div className="fields">Name-A<input id="TeamName1" /></div>
                        <div className="fields">Score<input id="score1" type="number"/></div>
                        {SportsWithSets.indexOf(props.sport[0]) != -1 ? <>
                            <div className="fields">Enter Score Set 1<input id="team11" type="number"/></div>
                            <div className="fields">Enter Score Set 2<input id="team12" type="number"/></div>
                            <div className="fields">Enter Score Set 3<input id="team13" type="number"/></div>
                        </>
                            : <></>}
                    </div>
                </div>

                <div className="box box-down blue">
                    <h2>Team-B</h2>
                    <div className="updateScore">
                        <div className="fields">Name-A<input id="TeamName2" /></div>
                        <div className="fields">Score<input id="score2" type="number"/></div>
                        {SportsWithSets.indexOf(props.sport[0]) != -1 ? <>
                            <div className="fields">Enter Score Set 1<input id="team21" type="number"/></div>
                            <div className="fields">Enter Score Set 2<input id="team22" type="number"/></div>
                            <div className="fields">Enter Score Set 3<input id="team23" type="number"/></div>
                        </>
                            : <></>}
                    </div>
                </div>
            </div>

            <div className="row1-container toolbar">
                <input type="submit" onClick={addFixture} id="butt" className="btn btn_live" value="Update" style={{width:"fit-content"}} />
            </div>
        </div>
    );
};
