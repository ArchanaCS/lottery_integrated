import "./Option.css";
import Optionbox from '../components/Optionbox'

export default function Option() {
  return (
    <>
      <div className="option_outer">


        <Optionbox label={"Process"}/>
        <Optionbox label={"Current Lottery"}/>
        <Optionbox label={"Calculate your wins"}/>
        <Optionbox label={"Buy Units"}/>
        <Optionbox label={"View Tickets purchased"}/>
        <Optionbox label={"Charity"}/>
        <Optionbox label={"Community"}/>
        <Optionbox label={"Surveys"}/>
        {/* <div className="option_row_col2">
          <label className="option_row_col_bold">Process</label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">Current Lottery</label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">
            You calculate your probable Prize wins
          </label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">Buy Lottery Unit</label>
        </div>

        <div className="option_row_col2">
          <label className="option_row_col_bold">View Tickets purchased</label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">Charity</label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">Community</label>

          <label className="option_row_col_bold">Surveys</label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">Charity</label>
        </div>
        <div className="option_row_col2">
          <label className="option_row_col_bold">View Info</label>
        </div> */}
      </div>
    </>
  );
}
