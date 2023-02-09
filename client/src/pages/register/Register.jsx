import "./register.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  //input useState
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    gender: "",
    address: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    if (e.target.name !== "confirm-password") {
      setFocused(false);
    }
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="register">
      <div className="register-card">
        <div className="left">
          <h1>Travel Sathi</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            impedit eligendi vitae praesentium, dignissimos necessitatibus ad
            soluta repellat doloremque odit. Aut, error sit aliquam cupiditate
            libero voluptatem doloribus voluptates eaque
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        </div>

        <div className="right">
          <h1>Sign up</h1>
          <span>Please enter your details.</span>
          <form>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              name="username"
              onChange={handleChange}
            />

            <div className="email-phone">
              <div className="email">
                <label htmlFor="email">Email</label>

                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  pattern="^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$"
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <span className="email-error">Please enter a valid email</span>
              </div>
              <div className="phone">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  pattern="(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}
                  "
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                />
                <span className="phone-error">
                  Please enter a valid phone number
                </span>
              </div>
            </div>
            <div className="passwords">
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  onChange={handleChange}
                />
                <span className="password-error">
                  Minimum eight characters, at least one uppercase letter, one
                  lowercase letter and one number
                </span>
              </div>
              <div className="confirm">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Re-enter your password"
                  pattern={inputs.password}
                  name="confirm-password"
                  focused={focused.toString()}
                  onChange={handleChange}
                />
                <span className="confirm-password-error">
                  Passwords did not match
                </span>
              </div>
            </div>

            <div className="DOB-gender">
              <div className="DOB">
                <label htmlFor="date-of-birth">Date of Birth</label>
                <input type="date" name="birthDate" onChange={handleChange} />
              </div>
              <div className="gender-container">
                <label htmlFor="gender">Gender</label>
                <div className="gender">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
            />
            <label htmlFor="interests">Select your interests</label>
            <div className="interests">
              <input type="checkbox" name="hiking" id="hiking" />
              <label htmlFor="hiking">Hiking</label>

              <input type="checkbox" name="trekking" id="trekking" />
              <label htmlFor="trekking">Trekking</label>

              <input type="checkbox" name="riding" id="riding" />
              <label htmlFor="riding">Riding</label>

              <input type="checkbox" name="adventure" id="adventure" />
              <label htmlFor="adventure">Adventure</label>
            </div>
            <span>{err && err}</span>
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
