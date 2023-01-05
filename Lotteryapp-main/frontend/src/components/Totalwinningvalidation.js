import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../components/Totalwinningvalidation.css";
import { Collapsible } from "collapsible-react-component";
import "collapsible-react-component/dist/index.css";
import { MdArrowDropDownCircle } from "react-icons/md";

//install react-collapsible before using this component
//npm i react-collapsible

export default function Totalwinningvalidation() {
  const [totalwinning, setTotalwinning] = useState([]);
  const [totallotterywinning, setTotallotterywinning] = useState([]);
  const [newarray, setNewarray] = useState([]);

  function expand(pid, itm, index) {
    let temp = [...totalwinning];
    for (const itm of temp) {
      itm.isClicked = false;
    }
    temp[index].isClicked = true;
    const newn = totallotterywinning.filter((obj) => obj.refProvider === pid);
    setNewarray(newn);
    setTotalwinning(temp);
  }
  function colp() {
    let temp = [...totalwinning];
    for (const itm of temp) {
      itm.isClicked = false;
    }
    setTotalwinning(temp);
  }

  useEffect(() => {
    let url = "http://localhost:8080/totalwinnigtodate";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        var temp = [...res.data];
        for (const element of temp) {
          element.isClicked = false;
        }
        setTotalwinning(temp);
      })
      .catch();

    let url1 = "http://localhost:8080/totallotterywinnigtodate";
    let req1 = {};
    let header1 = {};
    axios
      .post(url1, req1, header1)
      .then((res) => {
        setTotallotterywinning(res.data);
      })
      .catch();
  }, []);

  return (
    <>
      <div className="totalwinning_container">
        <div className="totalwinning_header">
          {" "}
          <h2>Total winning todate</h2>
        </div>
        <div className="totalwinning_subheader">
          <h6>Provider name</h6>
          <h6>Total winning</h6>
        </div>

        {totalwinning.map((itm, index) => {
          return (
            <>
              <div
                className="totalwinning_providerlist"
                onClick={() => {
                  totalwinning[index].isClicked
                    ? colp()
                    : expand(itm.refProvider, itm, index);
                }}
              >
                <div className="totalwinning_providerlist_inner">
                  <span>
                    <MdArrowDropDownCircle />
                  </span>
                  {itm.txtProvidername}
                </div>
                <div>{itm.totalPrizemoney}</div>
              </div>

              <Collapsible open={itm.isClicked}>
                {newarray.map((itminner, indexinner) => {
                  return (
                    <>
                      <div className="totalwinning_lotterylist">
                        <div>{itminner.txtLotteryname}</div>
                        <div>{itminner.totalPrizemoney}</div>
                      </div>
                    </>
                  );
                })}
              </Collapsible>
            </>
          );
        })}
      </div>
    </>
  );
}