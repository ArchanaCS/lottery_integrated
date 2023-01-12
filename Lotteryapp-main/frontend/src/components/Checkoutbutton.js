import shield from "../images/lockshield.jpg";
import "./Checkoutbutton.css";

export default function Checkoutbutton({ value2 ,chkout,linenum}) {
  console.log("chkouttn")
  return (
    <div className="Checkoutbutton">
      <button onClick={chkout} linenum={linenum} >{value2}</button>
    </div>
  );
}
