import { useLocation } from "react-router-dom";
import "./single.scss";
import ProfileCard from "../../components/profileCard/ProfileCard";
import Hosted from "../../components/hostedEvents/Hosted";
import ParticipatedEvents from "../../components/participatedEvents/ParticipatedEvents";

export default function Single() {
  const location = useLocation();

  const details = location.state;
  return (
    <div className="single">
      <div className="single-container">
        <div className="top">
          <ProfileCard details={details} />
        </div>
        <div className="center">
          <Hosted details={details} />
        </div>
        <div className="center-bottom">
          <ParticipatedEvents details={details} />
        </div>
      </div>
    </div>
  );
}
