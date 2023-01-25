import axios from "axios";
import "./login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
// import Carousel from "../../components/carousel/Carousel";

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/login", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="login">
      <div className="login-card">
        <div className="left">
          <h1>Welcome back</h1>
          <span>Welcome back! Please enter your details.</span>
          <form>
            <label htmlFor="email">Email</label>

            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <div className="options-wrapper">
              <div className="option-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <a href="https://www.google.com">Forgot password</a>
            </div>
            {err && err}
            <button onClick={handleClick}>Login</button>
          </form>
        </div>
        <div className="right">
          <h1>Travel Sathi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            impedit eligendi vitae praesentium, dignissimos necessitatibus ad
            soluta repellat doloremque odit. Aut, error sit aliquam cupiditate
            libero voluptatem doloribus voluptates eaque
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
