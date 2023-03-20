import "./plan.scss";
import moment from "moment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Suggestions from "../suggestions/Suggestions";
import { useState } from "react";

export default function Plan({ plan }) {
  const [suggestionOpen, setSuggestionOpen] = useState(false);

  return (
    <div className="plan-container">
      <div className="details-container">
        <div className="plan-details">
          <span>{moment(plan.plan_date).format("Do MMMM YYYY")}</span>
          <p>{plan.plan_note}</p>
        </div>
        <QuestionAnswerIcon
          style={{ cursor: "pointer" }}
          onClick={() => setSuggestionOpen(!suggestionOpen)}
        />
      </div>
      {suggestionOpen && suggestionOpen ? <Suggestions plan={plan} /> : <></>}
    </div>
  );
}
