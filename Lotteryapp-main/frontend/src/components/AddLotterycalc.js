import "./AddLotterycalc.css";

import { GrAddCircle } from "react-icons/gr";
import Collapsible from "react-collapsible";
export default function AddLotterycalc() {
  return (
    <div className="AddLotterycalc_row">
      <Collapsible
        trigger={
          <div className="AddLotterycalc_row_icon">
            <GrAddCircle />
            <label>Calculations</label>
          </div>
        }
      >
        <div className="AddLotterycalc">
          <div className="AddLotterycalc_head">
            <div className="AddLotterycalc_head_row1">
              <label>Deductions fron Prize money</label>
              <label>Deductions fron Prize money</label>
              <label>Deductions fron Prize money</label>
            </div>
          </div>
          <div className="AddLotterycalc_body">
            <div className="AddLotterycalc_body_row1">
              <div className="AddLotterycalc_body_row1_col">
                <label>Agents Commision</label>
                <input type="text"></input>
              </div>
              <div className="AddLotterycalc_body_row1_col">
                <label>Tax</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLotterycalc_body_row1">
              <div className="AddLotterycalc_body_row1_col">
                <label>Other deductions</label>
                <input type="text"></input>
              </div>
              <div className="AddLotterycalc_body_row1_col">
                <label>Other deductions</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLotterycalc_body_row1">
              <div className="AddLotterycalc_body_row1_col">
                <label>Default commision rate</label>
                <input type="text"></input>
              </div>
              <div className="AddLotterycalc_body_row1_col">
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
