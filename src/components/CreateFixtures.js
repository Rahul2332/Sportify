import React, { useState } from 'react';
import '../styles/createFixtures.css';
import { getDatabase, ref, set, push, update } from 'firebase/database';
import { useEffect } from 'react';

//import { isAdmin } from "./Login";

export const CreateFixtures = (props) => {
	const [flag, setFlag] = useState(false);
	const [input, setInput] = useState(0);
	var show = false;

	useEffect(() => {
		props.setSport(JSON.parse(window.sessionStorage.getItem('CurrentSport')));
	}, []);

	//var index = 1;
	console.log(input);
	const database = getDatabase();
	for (let i = 1; i <= input; i++) {
		var anu = document.getElementById(`button_${i}`);
		if (anu) {
			anu.addEventListener('click', (e) => {
				e.preventDefault();
				//console.log("Anurag")
				document.getElementById(`button_${i}`).innerHTML = 'Edit';
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
					Aset1: '0',
					Aset2: '0',
					Aset3: '0',
					Bset1: '0',
					Bset2: '0',
					Bset3: '0',
				});
			});
		}
	}

	const items = [];
	for (let i = 0; i < input; i++) {
		items.push(
			<div
				className='createFixtures-leaderboard__name createFixtures-button__link'
				id='fixtures_container'>
				<input
					type='text'
					className='createFixtures-leaderboard__profile'
					id={'teamA_' + i}
					placeholder='Team-1'
				/>
				<p className='fixture-inline'> V / S </p>
				<input
					type='text'
					className='createFixtures-leaderboard__profile'
					id={'teamB_' + i}
					placeholder='Team-2'
				/>
				<input
					type='text'
					className='createFixtures-leaderboard__profile'
					id={'data_' + i}
					placeholder='Time'
				/>
				<input
					type='text'
					className='createFixtures-leaderboard__profile'
					id={'time_' + i}
					placeholder='Date'
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
		<div style={{ marginTop: '20%' }}>
			{/* {isAdmin ? ( */}
			<div>
				<label> Enter the number of fixtures you want to create</label>
				<input
					value={input}
					onChange={(e) => {
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
					id='add fixtures'
					onClick={() => {
						console.log('hello');
						console.log(flag);
						setFlag(true);
						console.log('hello 2');
					}}>
					Create Fixtures
				</button>
			</div>
			{/* {items} */}
			{flag == true ? items : <></>}

			<div className='Fixture-button-center'>
				<button
					className='createFixtures-btn'
					id='add_btn'
					// onClick={handleClick}
				>
					Add Fixtures
				</button>
			</div>
		</div>
	);
};
