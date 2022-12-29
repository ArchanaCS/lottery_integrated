import "./AdminDashboardLottery.css";
import { GrAddCircle } from "react-icons/gr";
import Collapsible from "react-collapsible";
import AddLottery from "./AddLottery";
import AddLotteryWin from "./AddLotterycalc";
import AddLotteryCom from "./AddLotterycom";
export default function AdminDashboardLottery({
  showAddLotteryMain,
  showAddLotteryWinnigcalc,
  showAddLotteryComm,
}) {
  return (
    <div className="AdminDashboardLottery_row">
      <Collapsible
        trigger={
          <div className="AdminDashboardLottery_row_icon">
            <GrAddCircle />
            <label>Lottery Main</label>
          </div>
        }
      >
        {showAddLotteryMain ? <AddLottery /> : <></>}
        {showAddLotteryWinnigcalc ? <AddLotteryWin /> : <></>}
        {showAddLotteryComm ? <AddLotteryCom /> : <></>}
      </Collapsible>
    </div>
  );
}
