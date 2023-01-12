
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../components/Uservalidationfetch_Admin.css";
import List from "./List";
export default function Uservalidationfetch() {
  const [latestunits, setLatestunits] = useState([]);

  useEffect(() => {
    let url = "http://localhost:8080/latestdrawunits";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        setLatestunits(res.data);
      })
      .catch();
  }, []);

  return (
    <>
      <div className="uservalidationfetch_container">
        <div className="uservalidationfetch_innercontainer1">
          <h2>Latest draw results</h2><span className="uservalidationfetch_innercontainerspan"></span>
        </div>
        <div className="uservalidationfetch_innercontainer2">
          <List
            label1={"Username"}
            label2={"Matching number"}
            label3="Prize Money"
            array={latestunits}
            value1={"txtFname"}
            value2={"txtMatchingcount"}
            value3={"txtPrizemoney"}
          />
        </div>
      </div>
    </>
  );
}