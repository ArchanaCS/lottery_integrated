import { useEffect } from "react";
import Button from "./Checkoutbutton";
import "./Checkouttotal.css";
import axios from "axios";
import { useState } from "react";
export default function Checkouttotal() {
  const [totalcost, setTotalcost] = useState("");
  useEffect(() => {
    let url = "http://localhost:8080/checkouttotal";
    let request = {};
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data);
        console.log(res.data[0].Totalcost);
        setTotalcost(res.data[0].Totalcost);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Checkouttotal_component2">
      <div className="Checkouttotal_component2_row">
        <div className="Checkouttotal_component2_row_col Checkouttotal_left">
          <label>
            By clicking on the "Checkout" Button, you agree to our
            <span>Rules</span> and
            <span>Terms and Conditions</span>
          </label>
          <label>
            All transactions are inclusive of VAT. Prices displayed in other
            currencies are for informative purposes only and converted according
            to actual exchange rates.
          </label>
        </div>
        <div className="Checkouttotal_component2_row_col Checkouttotal_right">
          <label>Price:{totalcost}</label>
          {/* <label>Credit Requred:</label>
          <label>AED 35.00</label> */}
          {/* <Button value2={"Login to apply for voucher"} /> */}
        </div>
      </div>
    </div>
  );
}
