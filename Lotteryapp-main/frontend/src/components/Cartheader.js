import "./Cartheader.css";
import visalogo from "../images/ch-Visa-Logo.png";
import mastercardlogo from "../images/ch-Mastercard-Logo.png";
import americanexpresslogo from "../images/ch-American-Express-Logo.png";
export default function Cartheader() {
  return (
    <>
      <div className="cartheader_container">
        <div className="cartheader_col left">
          <label>
            <h2>Shopping Cart</h2>
          </label>
        </div>
        <div className="cartheader_col right">
          <div className="cartheaderimg1">
            <img src={visalogo} />{" "}
          </div>
          <div className="cartheaderimg2">
            <img src={mastercardlogo} />{" "}
          </div>
          <div className="cartheaderimg3">
            <img src={americanexpresslogo} />
          </div>
        </div>
      </div>
    </>
  );
}
