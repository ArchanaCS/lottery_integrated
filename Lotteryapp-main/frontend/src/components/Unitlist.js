import "./Unitlist.css";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Unitlist() {
  const [array, Setarray] = useState([]);
  
  // Setarray(temp)


    useEffect(() => {
    
      let url = "http://localhost:8080/Unitlist";
      let request = {};
      let header = {};
      axios
        .post(url, request, header)
        .then((res) => {
          console.log(res.data);
          Setarray(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  const handleDeleteClick=(id)=>{
    let url = "http://localhost:8080/unitdelete";
    let request = {id:id};
    let header = {};
    axios
      .post(url, request, header)
      .then((res) => {
        console.log(res.data);
        // Setarray(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <div className="Unitlist_component1">
      <div className="Unitlist_row1">
        <div className="Unitlist_row1_col1">
          {/* <input type="checkbox" /> */}
        </div>
        <div className="Unitlist_row1_col2">
          <label>Name</label>
        </div>
        <div className="Unitlist_row1_col3">
          <label>Lotteryname</label>
        </div>
        <div className="Unitlist_row1_col4">
          <label>Numbers</label>
        </div>
        <div className="Unitlist_row1_col5">
          <label>Purchase Date</label>
        </div>
        <div className="Unitlist_row1_col6">
          {/* <label>Remove</label> */}
        </div>
      </div>

      {array.map((item, index) => {
        return (
          <>
            <div className="Unitlist_row2">
              <div className="Unitlist_row2_col1">
              <input value={item.id} type="checkbox" />
                
              </div>
              <div className="Unitlist_row2_col2">
              <label >{item.Name}</label>
                
              </div>
              <div className="Unitlist_row2_col3">
              <label>{item.Lotteryname}</label>
             
                
              </div>
             
               
              <div className="Unitlist_row2_col4">
                <button>{item.Firstnumber}</button>
                <button>{item.Secondnumber}</button>
                <button>{item.Thirdnumber}</button>
                <button>{item.Fourthnumber}</button>
                <button>{item.Fifthnumber}</button>
              </div>
              <div className="Unitlist_row2_col5">
              <label>{item.datepurchased}</label>
                
              </div>
              
              <div className="Unitlist_row2_col6">
              
                <button
                  onClick={(e) => {
                    handleDeleteClick(item.id);
                  }}
                >
                  X
                </button>
                {/* <img src={editicon} /> */}
              </div>
            </div>
            {/* <div className="Unitlist_row2_details">
                <label>{item.txtLotteryname}</label>
                <label>Draw Date:</label>
                <label>{item.dtLotterydrawdate}</label>
              </div> */}
          </>
        );
      })}
      {/* {numberarray.map((item, index) => {
          return (
            <>
              <div className="Unitlist_row2_numbers">
                <label className="label1">{item.txtFirstchoicenumber}</label>
                <label className="label2">{item.txtSecondchoicenumber}</label>
                <label className="label3">{item.txtThirdchoicenumber}</label>
                <label className="label4">{item.txtFourthchoicenumber}</label>
                <label className="label5">{item.txtFifthoicenumber}</label>
              </div>
            </>
          );
        })} */}
      {/* {pricearray.map((item, index) => {
          return (
            <>
              <div className="row2_pricebuttons">
                <label>AED {item.txtCost}</label>
                <button>X</button>
                <img src={editicon} />
              </div>
            </>
          );
        })} */}
    </div>
  );
}
