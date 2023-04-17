import React, { useContext, useEffect, useRef, useState } from "react";
import "./profile.scss";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InterestsIcon from "@mui/icons-material/Interests";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import Post from "../../components/post/Post";
import UpdateUser from "../../components/updateUser/UpdateUser";
import moment from "moment";
import VerifyForm from "../../components/verifyForm/VerifyForm";
import VerifiedIcon from "@mui/icons-material/Verified";
export default function Profile() {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);
  const [openProfileVerify, setOpenProfileVerify] = useState(false);

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data[0];
    })
  );

  const {
    isLoading: postLoading,
    error: postError,
    data: posts,
  } = useQuery(["posts", userId], () =>
    makeRequest.get("/posts/userPost?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  const [notification, setNotification] = useState({
    to: userId,
    type: "follow",
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship", userId],
    () =>
      makeRequest.get("/relationships?followedId=" + userId).then((res) => {
        return res.data;
      })
  );
  const { isLoading: fIsLoading, data: followersData } = useQuery(
    ["following", userId],
    () =>
      makeRequest.get("/relationships?followerId=" + userId).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?followedId=" + userId);
      return makeRequest
        .post("/relationships?followedId=" + userId)
        .then(makeRequest.post("/notifications", notification));
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const [openUpdate, setOpenUpdate] = useState(false);

  const handleChat = (e) => {
    e.preventDefault();
    makeRequest
      .post("/chats?receiver=" + userId)
      .then(navigate("/chats/" + currentUser.id));
  };

  // const { onlineUser } = useContext(OnlineUserContext);
  const [online, setOnline] = useState(false);
  // const isOnline = data && onlineUser.filter((user) => user.userId === data.id);

  // useEffect(() => {
  //   if (isOnline && isOnline.length !== 0) setOnline(true);
  //   else setOnline(false);
  // }, [onlineUser, data]);

  return (
    <div className="profile">
      <div className="images">
        <img
          src={data && "/upload/" + data.coverPicture}
          alt=""
          className="cover"
        />
        <img
          src={data && "/upload/" + data.profilePicture}
          alt=""
          className="profile-picture"
        />
      </div>
      <div className="profile-container">
        <div className="profile-user-info">
          <div className="user-name">
            <span className="username">
              {data && data.username}
              {data && data.status === "verified" ? <VerifiedIcon /> : <></>}
            </span>
            <div className="follows">
              <span>{posts && posts.length} Posts</span>
              <span>
                {relationshipData && relationshipData.length} Followers
              </span>
              <span>{followersData && followersData.length} Followings</span>
              <span>TS: {data && data?.travelScore}</span>
            </div>
          </div>
        </div>
        <div className="action">
          {rIsLoading ? (
            "loading"
          ) : userId !== currentUser.id ? (
            <>
              <button className="profile-item" onClick={handleChat}>
                <ChatBubbleIcon fontSize="small" style={{ color: "#a974ff" }} />
                Message
              </button>
              {relationshipData.includes(currentUser.id) ? (
                <button className="profile-item" onClick={handleFollow}>
                  <span>Following</span>
                </button>
              ) : (
                <button className="profile-item" onClick={handleFollow}>
                  <AddIcon fontSize="small" />
                  <span>Follow</span>
                </button>
              )}
            </>
          ) : data.status === "not verified" && userId === currentUser.id ? (
            <>
              <button
                className="profile-item"
                onClick={() => setOpenProfileVerify(true)}
              >
                <span>Verify Profile</span>{" "}
              </button>
              <button
                className="profile-item"
                onClick={(e) => setOpenUpdate(true)}
              >
                <EditIcon fontSize="small" />
                <span>Edit</span>
              </button>
            </>
          ) : (
            <button
              className="profile-item"
              onClick={(e) => setOpenUpdate(true)}
            >
              <EditIcon fontSize="small" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
      <div className="profile-details">
        <div className="bio">
          <span className="bio-head">About Me</span>
          <p>{data && data.bio}</p>
          <hr />

          <div className="section">
            <div className="section-heading">
              <LocationOnIcon fontSize="small" />
              <span className="section-head">Address</span>
            </div>
            <div className="section-details">
              <p>{data && data.address}</p>
            </div>
          </div>

          <hr />

          <div className="section">
            <div className="section-heading">
              <CakeIcon fontSize="small" />
              <span className="section-head">Birthday</span>
            </div>
            <div className="section-details">
              <p>{data && moment(data.birthDate).format("YYYY-MM-DD")}</p>
            </div>
          </div>
        </div>
        <div className="personal">
          <div className="right-section">
            <span className="right-head">
              <InterestsIcon
                style={{ fontSize: "small", paddingRight: "10px" }}
              />
              Interests
            </span>
            <div className="right-list">
              {data &&
                data?.userInterests?.map((inter) => (
                  <span key={inter.id}>{inter.interest.interestName}</span>
                ))}
            </div>

            <hr />
            <span className="right-head" style={{ paddingTop: "10px" }}>
              <CallIcon style={{ fontSize: "small", paddingRight: "10px" }} />
              Contact
            </span>
            <div className="right-list">
              <span>{data && data.phone}</span>
            </div>

            <hr />
            <span className="right-head" style={{ paddingTop: "10px" }}>
              <EmailIcon style={{ fontSize: "small", paddingRight: "10px" }} />{" "}
              Email
            </span>
            <div className="right-list">
              <span>{data && data.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-post">
        {posts &&
          posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
      </div>
      {openUpdate && <UpdateUser setOpenUpdate={setOpenUpdate} user={data} />}
      {openProfileVerify && (
        <VerifyForm
          setOpenProfileVerify={setOpenProfileVerify}
          userId={userId}
        />
      )}
    </div>
  );
}
