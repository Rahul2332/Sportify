import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Signup from "./components/Singnup";
import Login from "./components/Login";

import { About } from "./components/About";
import { Test } from "./components/Test";
// import PrivateRoute from "./components/PrivateRoute";
import { Dashboard } from "./components/Dashboard";
// import { RegisterForSport } from "./components/RegisterForSport";
// import { RegisteredTeams } from "./components/RegisteredTeams";
import { Menu } from "./components/Menu";
// import { ScoreCard } from "./components/ScoreCard";
// import { ScoreSet } from "./components/ScoreSet";
import { CreateFixtures } from "./components/CreateFixtures";
import { ViewFixtures } from "./components/ViewFixtures";

// styles
import "./styles/templatemo-training-studio.css";
import "./styles/font-awesome.css";
import "./styles/bootstrap.min.css";

function App() {
  const [currSport, setCurrSport] = useState([]);
  
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard setSport={setCurrSport}/>}></Route>
          <Route path="about" element={<About />} />
          <Route path="test" element={<Test />} />
          <Route path="admin-signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="register-for-sport" element={<RegisterForSport />} /> */}
          {/* <Route path="registered-teams" element={<RegisteredTeams />} /> */}
          <Route path="sport-menu" element={<Menu sport={currSport}/>} />
          {/* <Route path="score-card" element={<ScoreCard />} />
          <Route path="score-set" element={<ScoreSet />} /> */}
          <Route path="create-fixtures" element={<CreateFixtures />} />
          <Route path="view-fixtures" element={<ViewFixtures/>} />
        </Routes>
        {/* <Footer /> */}
      </AuthProvider>
    </Router>
  );
}

export default App;
