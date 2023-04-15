import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import "./updateUser.scss";
import { ToastContainer, toast } from "react-toastify";

export default function UpdateUser({ setOpenUpdate, user }) {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);

  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone,
    birthDate: user.birthDate,
    gender: user.gender,
    address: user.address,
  });

  const [err, setErr] = useState(null);

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleChange = (e) => {
    if (e.target.name !== "confirm-password") {
      setFocused(false);
    }
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({
      ...inputs,
      coverPicture: coverUrl,
      profilePicture: profileUrl,
    });
    toast.success("Profile Updated");
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="update-user">
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
        <div className="pictures">
          <div className="pic">
            <label htmlFor="profile-picture">Profile Picture</label>
            <input
              type="file"
              name="profile-picture"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="pic">
            <label htmlFor="cover-picture">Cover Picture</label>
            <input
              type="file"
              name="cover-picture"
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
        </div>

        <span>{err && err}</span>
        <div className="buttons">
          <button onClick={handleClick} className="update-button">
            Update
          </button>
          <button
            onClick={(e) => setOpenUpdate(false)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
