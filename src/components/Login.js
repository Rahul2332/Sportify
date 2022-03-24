import React, { useRef, useState , useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

export default function Login(props) {
  useEffect(() => {
      props.setAdmin(JSON.parse(window.sessionStorage.getItem("isAdmin")));
  }, []);

  useEffect(() => {
      window.sessionStorage.setItem("isAdmin", JSON.stringify(props.isAdmin));
  }, [props.isAdmin]);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const admins = ["spandan2022admin@gmail.com", 'anurag.naruka@iiitb.ac.in', 'rahul.jain@iiitb.ac.in', 'jainav.sanghvi@iiitb.ac.in', 'rakshit.bang@iiitb.ac.in', 'adrij.sharma@iiitb.ac.in','sai.snehith@iiitb.ac.in','sairama.sashank@iiitb.ac.in','saket.gurjar@iiitb.ac.in','Shaikh.Fahed@iiitb.ac.in','sukhamjot.singh@iiitb.ac.in','nagasri.vaishnavi@iiitb.ac.in','Chakradhar.yamala@iiitb.ac.in','Pranay.Kumar@iiitb.ac.in','Anwit.Damale@iiitb.ac.in','Yash.Mogal@iiitb.ac.in','Dheeraj.Karnam@iiitb.ac.in','Mayank.Chadha@iiitb.ac.in','Srinivas.k@iiitb.ac.in','SriVishnu.Lahari@iiitb.ac.in', 'Subrat.Bahuguna@iiitb.ac.in', 'Ronit.Jain@iiitb.ac.in', 'Rakshit.Gupta@iiitb.ac.in', 'pratyush.nandi@iiitb.ac.in', 'Tanishq.Jaswani@iiitb.ac.in', 'ripunjay.singh@iiitb.ac.in', 'Sidda.Rahul@iiitb.ac.in', 'yashovardhan.reddy@iiitb.ac.in', 'Vismaya.Solanki@iiitb.ac.in', 'prasanth.kumar@iiitb.ac.in', 'Utkarsh.Prafulchandra@iiitb.ac.in', 'rvs.ajith@iiitb.ac.in','chaitanya.manas@iiitb.ac.in','rahulsidda133@gmail.com', 'Muni.HarshaVardhan@iiitb.ac.in', 'yash.koushik@iiitb.ac.in'];

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      for(let admin of admins){
        if (emailRef.current.value === admin){
          props.setAdmin(true);
          break;
        }
      }
      navigate("/");
    } catch {
      setError("Incorrect Username or Password");
    }

    setLoading(false);
  }

  return (
    <div
      className="container-md"
      style={{ maxWidth: "500px", marginTop: "100px" }}
    >
      <h1 className="mt-100 text-center"> Login </h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmitLogin} className="d-flex flex-column">
        <div className="form-outline mb-4">
          <label className="form-label"> Email </label>
          <input
            type="email"
            id="email"
            className="form-control form-control-lg"
            ref={emailRef}
            required
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label"> Password </label>
          <input
            type="password"
            id="pass"
            className="form-control form-control-lg"
            ref={passwordRef}
            required
          />
        </div>
        <div className="d-flex justify-content-around align-items-center mb-4">
          <p>
            Don't have an account? <Link to="/signup"> Signup </Link>
          </p>
        </div>
        <div className="d-flex justify-content-around align-items-center mb-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg btn-block"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}