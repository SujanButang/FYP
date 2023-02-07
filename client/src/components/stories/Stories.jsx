import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./stories.scss";
export default function Stories() {
  const stories = [
    {
      id: 1,
      username: "Aran Shrestha",
      img: "https://images.freeimages.com/vhq/images/previews/b58/realistic-business-card-mockup-psd-567159.jpg",
    },
    {
      id: 2,
      username: "Nauraj Lamjel",
      img: "https://images.freeimages.com/images/previews/374/my-view-1439919.jpg",
    },
    {
      id: 3,
      username: "Anubhav Dangol",
      img: "https://images.freeimages.com/variants/pTv77dUSf4hF1g7Z18o4SgGW/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d",
    },
    {
      id: 4,
      username: "Bhabishya Luitel",
      img: "https://images.freeimages.com/images/previews/810/highlander-1325292.jpg",
    },
  ];

  const { currentUser } = useContext(AuthContext);
  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePicture} alt="" />
        <span>{currentUser.username}</span>
        <button>+</button>
      </div>
      {stories.map((story) => {
        return (
          <div className="story" key={story.id}>
            <img src={story.img} alt="" />
            <span>{story.username}</span>
          </div>
        );
      })}
    </div>
  );
}
