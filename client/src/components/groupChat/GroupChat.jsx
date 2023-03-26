import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import "./groupChat.scss";

export default function GroupChat({ details }) {
  return (
    <Link
      to={`/groupchat/${details.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="user-profile">
        <img src={"/upload/" + details.Event.destinationImage} alt="" />
        <div className="user-details">
          <span>{details.Event.destination}</span>
          <span style={{ fontSize: "12px" }}>Group</span>
        </div>
      </div>
    </Link>
  );
}
