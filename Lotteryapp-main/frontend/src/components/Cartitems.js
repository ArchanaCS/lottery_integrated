import "./Cartitems.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cartitems({label1,array}) {
  // const [array, Setarray] = useState([]);
  const id = localStorage.getItem("id");
  console.log("array",array)
  const dispatch=useDispatch();
  useEffect(() => {
    // let url = "http://localhost:8080/unitcheckout";
    // let request = { id: id };
    // let header = {};
    // axios
    //   .post(url, request, header)
    //   .then((res) => {
    //     console.log("cart",res.data);
    //     Setarray(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  const handleDeleteClick = (id) => {
    // const tempsel = [...linearray];
    // console.log("tempsel",tempsel)
    // for (const eleent of tempsel[indx]) {
      
    //   eleent.isselected = false;
    // }
    //  dispatch({ type: "setLineArray", payload: tempsel });
    
    let url = "http://localhost:8000/unitdelete";
    let request = { id: id };
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
  };

  //   const [pricearray, SetPricearray] = useState([]);
  //   useEffect(() => {
  //     let url = "http://localhost:8080/Price";
  //     let request = {};
  //     let header = {};
  //     axios
  //       .post(url, request, header)
  //       .then((res) => {
  //         console.log(res.data);
  //         SetPricearray(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  //   const [numberarray, SetNumberarray] = useState([]);
  //   useEffect(() => {
  //     let url = "http://localhost:8080/Numbers";
  //     let request = {};
  //     let header = {};
  //     axios
  //       .post(url, request, header)
  //       .then((res) => {
  //         console.log(res.data);
  //         SetNumberarray(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  const linearray = useSelector((state) => state.linearray);

  return (
    <div className="Cartitems_component1">
      <div className="Cartitems_row1">
        <div className="Cartitems_row1_col1">
          <label>Ticket Details</label>
        </div>
         <div className="Cartitems_row1_col2">
          <label>Selected Numbers</label>
        </div> 
        <div className="Cartitems_row1_col3">
          <label>Remove Selected</label>
        </div> 
      </div>
      {/* <div>
        {linearray.map((itm, indx) => {
          return <div>
          {
            itm.map((citem, cindx)=>{
              return <div>{citem.isselected?citem.value:""}</div>
            })
          }
          </div>;
        })}
      </div> */}
      <div className="Cartitems_row2">
        <div className="Cartitems_row2_col1">
          <label>{label1}</label>
        
        </div>
        <div className="Cartitems_row2_col2">
        
          {array.map((item,index)=>{
             
            return<>
           <div className="Cartitems_row2_col2_row1">
            <div className="Cartitems_row2_col2_row1_col1">{item.txtLotteryname}</div>
            <div className="Cartitems_row2_col2_row1_col2">

                  {JSON.parse(item.txtLotteryNumber).map((it,ind)=>{
                    return<>
                    <button>{it}</button>
                    </>
                  })}
                 
            </div>
            
           
            <div className="Cartitems_row2_col3">
             
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
          })}
           
          {/* {linearray.map((itm, indx) => {
            return (
              <div className="Cartitems_row2_col2_row1">
                {itm.map((citem,cindx) => {
                  return (
                    <>
                      <div>
                        {citem.isselected ? (
                          <button> {citem.value}</button>
                        ) : (
                          ""
                        )}
                      </div>
                      
                    </>
                  );
                })}
                
                <div className="Cartitems_row2_col3">
                  <button
                    onClick={(e) => {
                      handleDeleteClick(indx);
                    }}
                  >
                    X
                  </button>
                
                </div>
              </div>
            );
          })} */}
        </div>
        {/* <div className="Cartitems_row2_col3">
                <button
                  onClick={(e) => {
                    handleDeleteClick();
                  }}
                >
                  X
                </button>
                <img src={editicon} />
              </div> */}

        {/* <div className="Cartitems_row2_details">
                <label>{item.txtLotteryname}</label>
                <label>Draw Date:</label>
                <label>{item.dtLotterydrawdate}</label>
              </div> */}
        {/* </> */}
        {/* ); */}
        {/* })} */}
      </div>
      {/* {numberarray.map((item, index) => {
          return (
            <>
              <div className="Cartitems_row2_numbers">
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
