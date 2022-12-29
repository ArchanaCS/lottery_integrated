import "./Lotteryfetch.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Lotteryfetch() {
  const [array,setArray] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8080/lotteryfetch";
    // const request = {id:1}
    const request = {};
    const header = {};

    axios
      .post(url, request, header)

      .then((response) => {
        if (response.data.length !== 0) {
          console.log(response.data);
          setArray(response.data);
        } else {
          alert("error result record");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDeleteClick = (id) => {
    let url = "http://localhost:8080/lotterydelete";
    let request = { id: id};
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data);
        setArray(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="Lotteryfetch_component1">
        <div className="Lotteryfetch_row1">
          <div className="Lotteryfetch_row1_col1">
            <label>Lottery Name</label>
          </div>
          <div className="Lotteryfetch_row1_col2">
            <label>Draw date</label>
          </div>
          <div className="Lotteryfetch_row1_col3">
            <label>Remove Selected</label>
          </div>
        </div>

        {array.map((item, index) => {
            console.log("dateis"+item.drawdate);
          return (
            <>
              <div className="Lotteryfetch_row2">
                <div className="Lotteryfetch_row2_col1">
                  <label>{item.lotteryname}</label>
                </div>
                <div className="Lotteryfetch_row2_col2">
                  <label>{item.drawdate}</label>
                </div>
                <div className="Lotteryfetch_row2_col3">
                  <button
                    onClick={(e) => {
                      handleDeleteClick(item.id);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
