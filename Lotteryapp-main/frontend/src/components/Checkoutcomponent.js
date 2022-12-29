import "./Checkoutcomponent.css";
import { useNavigate } from "react-router-dom";
import Checkoutbutton from "./Checkoutbutton";

export default function Checkoutcomponent({ value2,chkout,linenum }) {
   console.log("componnet")
  const navigate = useNavigate();
  const backClick = () => {
    navigate("/TicketSelector");
  };
  const proceedClick = () => {
    navigate("/");
  };
  return (
    <div className="Checkoutcomponent_main">
      <div className="Checkoutcomponent_main_col left" onClick={backClick}>
        <Checkoutbutton value2={"Back"} />
      </div>
      <div className="Checkoutcomponent_main_col right" >
        <Checkoutbutton value2={"Proceed to Checkout"} onClick={chkout} linenum={linenum}/>
      </div>
    </div>
  );
}
