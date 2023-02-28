import "./chats.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function Chats() {
  return (
    <div className="chats">
      <div className="chat-container">
        <h2>Chats</h2>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search chats" />
        </div>
        <div className="items">
          <div className="item">
            <div className="user-profile">
              <img
                src="https://images.pexels.com/photos/10297624/pexels-photo-10297624.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <div className="user-details">
                <span>Sujan Rai</span>
                <div className="online"></div>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="user-profile">
              <img
                src="https://images.pexels.com/photos/10297624/pexels-photo-10297624.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <div className="user-details">
                <span>Sujan Rai</span>
                <div className="online"></div>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="user-profile">
              <img
                src="https://images.pexels.com/photos/10297624/pexels-photo-10297624.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
              />
              <div className="user-details">
                <span>Sujan Rai</span>
                <div className="online"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
