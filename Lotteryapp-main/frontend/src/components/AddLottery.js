import "./AddLottery.css";
import { GrAddCircle } from "react-icons/gr";
import Collapsible from "react-collapsible";
import profilepic from "../images/megan.png";
export default function AddLottery() {
  return (
    <div className="AddLottery_row">
      <Collapsible
        trigger={
          <div className="AddLottery_row_icon">
            <GrAddCircle />
            <label>Lottery Main</label>
          </div>
        }
      >
        <div className="AddLottery">
          <div className="AddLottery_head">
            <div className="AddLottery_head_row2">
              <img src={profilepic} alt="profilepic" />
              <label>Remove Image</label>
            </div>
          </div>
          <div className="AddLottery_body">
            <div className="AddLottery_body_row1">
              <div className="AddLottery_body_row1_col">
                <label>Lottery Name</label>
                <input type="text"></input>
              </div>
              <div className="AddLottery_body_row1_col">
                <label>Lottery provider</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLottery_body_row2">
              <label>Email</label>
              <input type="text"></input>
            </div>
            <div className="AddLottery_body_row2">
              <label>Contact Number</label>
              <input type="text"></input>
            </div>
            <div className="AddLottery_body_row2">
              <label> Regsitered Address</label>
              <input type="text"></input>
            </div>
            <div className="AddLottery_body_row1">
              <div className="AddLottery_body_row1_col">
                <label>City</label>
                <input type="text"></input>
              </div>
              <div className="AddLottery_body_row1_col">
                <label>State</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLottery_body_row1">
              <div className="AddLottery_body_row1_col">
                <label>Zip code</label>
                <input type="text"></input>
              </div>
              <div className="AddLottery_body_row1_col">
                <label>Country</label>
                <input type="text"></input>
              </div>
            </div>
            <div className="AddLottery_body_row2">
              <label>Remarks</label>
              <input type="Password"></input>
            </div>
            <div className="AddLottery_body_row2">
              <label>Remarks</label>
              <input type="Password"></input>
            </div>
          </div>
        </div>{" "}
      </Collapsible>
    </div>
  );
}
