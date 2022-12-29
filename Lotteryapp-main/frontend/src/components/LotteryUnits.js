import "./LotteryUnits.css";
import MyTimer from "./Timer";

export default function LotteryUnits({ details,date }) {
 console.log("date in lU",date)
  return (
    <>
      <div className="LotteryUnits_outer">
        <div className="LotteryUnits_col">
         
                <div className="LotteryUnits_col_row">
                  <label className="LotteryUnits_sell">
                  {details}
                  </label>
                </div>
                <div className="LotteryUnits_col_row">
                  <label className="LotteryUnits_date">
                  {date}
                  </label>
                </div>
             

          <div className="LotteryUnits_col_rowleft">
            <button className="LotteryUnits_buy">Buy</button>
          </div>
        </div>
        <div className="LotteryUnits_col">
          <MyTimer time={date} />
        </div>
      </div>
    </>
  );
}
