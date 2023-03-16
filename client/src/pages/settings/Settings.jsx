import "./settings.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import WbSunnyOutLinedIcon from "@mui/icons-material/WbSunnyOutlined";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

export default function Settings() {
  const { changeMode, darkMode } = useContext(DarkModeContext);

  return (
    <div className="settings">
      <div className="settings-container">
        <h2>Settings</h2>

        <div className="items">
          <div className="item" onClick={changeMode}>
            <span>Dark mode toggle</span>
            {darkMode ? (
              <WbSunnyOutLinedIcon style={{ color: "#6A7CF6" }} />
            ) : (
              <DarkModeOutlinedIcon style={{ color: "#6A7CF6" }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
