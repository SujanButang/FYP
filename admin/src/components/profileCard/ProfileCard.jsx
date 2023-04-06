import "./profileCard.scss";
import moment from "moment";

export default function ProfileCard({ details }) {
  return (
    <div className="profile-card">
      <div className="profile-card-container">
        <div className="left">
          <div className="header">
            <h1 className="title">Information</h1>
            <button>Ban</button>
          </div>
          <div className="item">
            <img src={"/upload/" + details.profilePicture} alt="" />
            <div className="details">
              <h1 className="itemTitle">{details.username}</h1>
              <div className="detail-item">
                <span className="item-key">Email :</span>
                <span className="item-value">{details.email}</span>
              </div>
              <div className="detail-item">
                <span className="item-key">Phone:</span>
                <span className="item-value">{details.phone}</span>
              </div>
              <div className="detail-item">
                <span className="item-key">Address:</span>
                <span className="item-value">{details.address}</span>
              </div>
              <div className="detail-item">
                <span className="item-key">Gender:</span>
                <span className="item-value">{details.gender}</span>
              </div>
              <div className="detail-item">
                <span className="item-key">Date of Birth:</span>
                <span className="item-value">
                  {moment(details.birthDate).format("YYYY-MM-DD")}
                </span>
              </div>
              <div className="detail-item">
                <span className="item-key">Status:</span>
                <span className="item-value">{details.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
