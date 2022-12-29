import "./List.css";
import { useNavigate } from "react-router-dom";
export default function List({ label1, label2, label3, array,variable1,variable2,variable3}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/AdminLotteryManager");
  };
  return (
    <div className="list_outer">
      <div className="list_outer_header">
        <p>{label1}</p>
        <p>{label2}</p>
        <p>{label3}</p>
      </div>
      {array.map((item, index) => {
        return (
          <>
            <div className="list_outer_row">
              <p>{item[variable1]}</p>
              <p>{item[variable2]}</p>
              <p>{item[variable3]}</p>
              {/* <td><span>{item[value4]}</span></td> */}
            </div>
          </>
        );
      })}
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Proceed to Lottery Manager
      </button>
    </div>
  );
}