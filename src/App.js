import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";

// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";
import {NavAfterLogin} from "./components/NavAfterLogin"
import Signup from "./components/Singnup";
import Login from "./components/Login";

import { About } from "./components/About";
// import PrivateRoute from "./components/PrivateRoute";
import { Dashboard } from "./components/Dashboard";
// import { RegisterForSport } from "./components/RegisterForSport";
// import { RegisteredTeams } from "./components/RegisteredTeams";
import { Menu } from "./components/Menu";
import { ScoreCard } from "./components/ScoreCard";
import { ScoreSet } from "./components/ScoreSet";
import { ScoreNoSet } from "./components/ScoreNoSet";
import { CreateFixtures } from "./components/CreateFixtures";
import { ViewFixtures } from "./components/ViewFixtures";

// styles
import "./styles/templatemo-training-studio.css";
import "./styles/font-awesome.css";
import "./styles/bootstrap.min.css";

function App() {
  const [currSport, setCurrSport] = useState([]);
  const [teamKey, setTeamKey] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  
  return (
    <Router>
      <AuthProvider>
        <NavAfterLogin isAdmin={isAdmin} setAdmin={setAdmin} />
        <Routes>
          <Route path="/" element={<Dashboard setSport={setCurrSport} sport={currSport}/>}></Route>
          <Route path="about" element={<About />} />
          <Route path="admin-signup" element={<Signup />} />
          <Route path="login" element={<Login isAdmin={isAdmin} setAdmin={setAdmin}/>} />
          {/* <Route path="register-for-sport" element={<RegisterForSport setSport={setCurrSport } sport={currSport}/>} /> */}
          {/* <Route path="registered-teams" element={<RegisteredTeams />} /> */}
          <Route path="sport-menu" element={<Menu setSport={setCurrSport } sport={currSport} isAdmin={isAdmin} setAdmin={setAdmin}/>} />
          <Route path="score-card" element={<ScoreCard setSport={setCurrSport } sport={currSport} teamKey={teamKey} setTeamKey={setTeamKey}/>} />
          <Route path="score-set" element={<ScoreSet setSport={setCurrSport } sport={currSport} teamKey={teamKey} setTeamKey={setTeamKey}/>} />
          <Route path="score-no-set" element={<ScoreNoSet setSport={setCurrSport } sport={currSport} teamKey={teamKey} setTeamKey={setTeamKey}/>} />
          <Route path="create-fixtures" element={<CreateFixtures setSport={setCurrSport } sport={currSport}/>} />
          <Route path="view-fixtures" element={<ViewFixtures setSport={setCurrSport} sport={currSport} teamKey={teamKey} setTeamKey={setTeamKey} isAdmin={isAdmin} setAdmin={setAdmin}/>}/>
        </Routes>
        {/* <Footer /> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
