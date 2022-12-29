import "./AddLotterycom.css";

import { GrAddCircle } from "react-icons/gr";
import Collapsible from "react-collapsible";
export default function AddLotterycom() {
  const handleLotteryAdd = () => {};
  return (
    <div className="AddLotterycom_row">
      <Collapsible
        trigger={
          <div className="AddLotterycom_row_icon">
            <GrAddCircle />
            <label>Commisions</label>
          </div>
        }
      >
        <div className="AddLotterycom">
          <div className="AddLotterycom_head">
            <div className="AddLotterycom_head_row1">
              <label>Deductions fron Prize money</label>
            </div>
          </div>
          <div className="AddLotterycom_body">
            <div className="AddLotterycom_body_row1">
              <div className="AddLotterycom_body_row1_col">
                <label>Agents Commision</label>
                <input type="text"></input>
              </div>
              <div className="AddLotterycom_body_row1_col">
                <label>Tax</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLotterycom_body_row1">
              <div className="AddLotterycom_body_row1_col">
                <label>Other deductions</label>
                <input type="text"></input>
              </div>
              <div className="AddLotterycom_body_row1_col">
                <label>Other deductions</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLotterycom_body_row1">
              <div className="AddLotterycom_body_row1_col">
                <label>Default commision rate</label>
                <input type="text"></input>
              </div>
              <div className="AddLotterycom_body_row1_col">
                <label>Default charity rate</label>
                <input type="text"></input>
              </div>
            </div>
          </div>
        </div>{" "}
      </Collapsible>
    </div>
  );
}
