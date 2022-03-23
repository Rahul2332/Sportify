import React, { useState } from 'react';
import '../styles/createFixtures.css';
import { getDatabase, ref, set, push, update } from 'firebase/database';
import { useEffect } from 'react';

//import { isAdmin } from "./Login";

export const CreateFixtures = (props) => {
	const [flag, setFlag] = useState(false);
	const [input, setInput] = useState(0);

	useEffect(() => {
		props.setSport(JSON.parse(window.sessionStorage.getItem('CurrentSport')));
	}, []);

	//var index = 1;
	function handleClick() {
		console.log(input);

		const database = getDatabase();
		for (let i = 0; i < input; i++) {
			let btn = document.getElementById("add_fixture_db");
			btn.innerHTML = 'Edit';

			var team1 = document.getElementById(`teamA_${i}`).value;
			var team2 = document.getElementById(`teamB_${i}`).value;
			var date = document.getElementById(`date_${i}`).value;
			var time = document.getElementById(`time_${i}`).value;

			var key = team1 + team2;

			update(ref(database, `${props.sport[0]}/Fixture/${key}`), {
				TeamA: team1,
				TeamB: team2,
				Time: time,
				Date: date,
				ScoreA: '0',
				ScoreB: '0',
				Aset1: '0',
				Aset2: '0',
				Aset3: '0',
				Bset1: '0',
				Bset2: '0',
				Bset3: '0'
			});
		}
	}

	const items = [];
	console.log(props.sport[3])
	if (props.sport[3] === "team") {
		var x1 = "Team-1"
		var x2 = "Team-2"
	}
	else {
		var x1 = "Participant-1"
		var x2 = "Participant-2"
	}
	for (let i = 0; i < input; i++) {
		items.push(
			<div
				className='createFixtures-leaderboard__name createFixtures-button__link'
				id='fixtures_container'>
				<input
					type='text'
					className='createFixtures-leaderboard__profile'
					id={'teamA_' + i}
					placeholder={x1}
				/>
				<p className='fixture-inline'> V / S </p>
				<input
					type='text'
					className='createFixtures-leaderboard__profile'
					id={'teamB_' + i}
					placeholder={x2}
				/>
				<input
					type='date'
					className='createFixtures-leaderboard__profile dateContainer'
					id={'date_' + i}
					placeholder='Date'
				/>
				<input
					type='time'
					className='createFixtures-leaderboard__profile'
					id={'time_' + i}
					placeholder='Time'
				/>
				{/* <button
				className='createFixtures-btn'
				id={'button_' + i}
				onClick={handleClick}>
				Add Fixtures
			</button> */}
			</div>
		);
	}

	console.log(items);

	return (
		<div style={{ marginTop: '100px' }}>
			{/* {isAdmin ? ( */}
			<div class="CreateFixtureMaxDiv" style={{ marginBottom: "30px" }}>
				<h3>{props.sport[0]}</h3>
				<label style={{ textAlign: "center" }}> Enter the number of fixtures you want to create</label>
				<input
					value={input}
					onChange={(e) => {
						let btn = document.getElementById("add_fixture_db");
						btn.innerHTML = 'Add Fixtures';
						setInput(e.target.value);
						setFlag(false);
					}}
					// type='text'
					className='createFixtures-leaderboard__profile'
					id='t12'
					style={{ margin: '20px' }}
					placeholder='Enter Number'
				/>
				<button
					className='createFixtures-btn'
					id='add_fixture_box'
					onClick={() => { setFlag(true); }}>
					Create Fixtures
				</button>
			</div>
			{flag ? items : <></>}

			<div className='Fixture-button-center'>
				<button
					className='createFixtures-btn'
					id='add_fixture_db'
					onClick={() => handleClick()}
				>
					SUBMIT
				</button>
			</div>
		</div>
	);
}
