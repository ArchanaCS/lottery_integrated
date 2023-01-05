import { useNavigate } from "react-router-dom";
import "./List.css";
export default function Unitpending({ label1, label2, label3, array ,varible1,varible2,varible3}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/AdminUnit");
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
              <p>{item[varible1]}</p>
              <p>{item[varible2]}</p>
              <p>{item[varible3]}</p>
            </div>
          </>
        );
      })}
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Proceed to Unit Manager
      </button>
    </div>
  );
}
