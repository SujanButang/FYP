import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./hotels.scss";

export default function Hotels() {
  return (
    <div className="hotels">
      <div className="hotels-container">
        <h2>Hotels</h2>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search Hotels" />
        </div>
        <div className="items"></div>
      </div>
    </div>
  );
}
