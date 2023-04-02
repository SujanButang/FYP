import "./settings.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import WbSunnyOutLinedIcon from "@mui/icons-material/WbSunnyOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";

export default function Settings() {
  const { changeMode, darkMode } = useContext(DarkModeContext);
  const [paymentOpen, setPaymentOpen] = useState(false);

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
          <div
            className="payment"
            onClick={(e) => setPaymentOpen(!paymentOpen)}
          >
            <div className="title">
              <span>Payment Settings & History</span>
              {paymentOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </div>
            {paymentOpen ? (
              <div className="payment-details">
                <div className="payment-option">
                  <div className="payment-method">
                    <span>Your Payment Method</span>
                    <span>Esewa</span>
                  </div>
                  <div className="phone">
                    <span>Primary Phone Number for Payments</span>
                    <span>9810580445</span>
                  </div>
                </div>
                <div className="payment-history">
                  <h4>Your payments history</h4>
                  <div className="table-container">
                    <table>
                      <tr>
                        <th>Event</th>
                        <th>Event Host</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                      <tr>
                        <td>Mustang</td>
                        <td>Sujan Rai</td>
                        <td>5000</td>
                        <td>2000-02-20</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
