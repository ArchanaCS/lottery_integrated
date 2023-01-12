import "./Lineselector.css";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbArrowsShuffle } from "react-icons/tb";
import Plusbutton from "./Plusbutton";
import { GiSteampunkGoggles } from "react-icons/gi";
import { MdSportsTennis } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
export default function Offerselector({
  label1,
  setValue,
  childdata,
  lineindex,
  ltryid,
  show
}) {
  const [count, setCount] = useState(0);
  const [temparr, setTemparr] = useState([]);
  // const [show, setShow] = useState(true);
  const [showchk, setShowchk] = useState(false);
  const [selection, setSelection] = useState([]);
  const [arr, setArr] = useState([]);
  // const [final, setFinal] = useState([]])
  let selectionarray = []; 
  const offerarray = useSelector((state) => state.offerarray);
  // const ltryid = useSelector((state) => state.ltryid);
  const ltryname = useSelector((state) => state.ltryname);
  console.log("id and name", ltryid, ltryname);
  const dispatch = useDispatch();
  var num = 3;
  var limit = 39;

  useEffect(() => {
    //console.log("line", linearray);
    console.log("offerarray", show);
  }, []);
  // useMemo(() => {

  //   for (var i = num; i <= limit; i++) {
  //     selectionarray.push([{ value: i, selected: false }])
  //     // selectionarray=[...selectionarray,[{ value: i, selected: false }]]
  //   }
  //   console.log(selectionarray)
  //   setArr(selectionarray)
  // }, [])

  const handleClick = (e, indx) => {
    let temp = [...offerarray];
    let count = 0;
    for (const iterator of temp[lineindex]) {
      if (iterator.isselected) count++;
    }
    if (count < 5) {
      temp[lineindex][indx].isselected = !temp[lineindex][indx].isselected;

      // console.log(temp[lineindex][indx].isselected);
      dispatch({ type: "setOfferArray", payload: temp });
    } else if (temp[lineindex][indx].isselected) {
      temp[lineindex][indx].isselected = !temp[lineindex][indx].isselected;

      // console.log(temp[lineindex][indx].isselected);

      dispatch({ type: "setOfferArray", payload: temp });
    }
    // console.log(indx);
    // console.log(temp[lineindex][indx].isselected);

    // Ends here

    //   let newt = [];

    //   for (const iterator of temp) {
    //     console.log(iterator)
    //     if (iterator.isselected == true) {
    //       // console.log(iterator.value)
    //       newt.push(iterator.value);
    //       //  newt+=iterator.value+","
    //     }
    //     if (newt.length > 5 && iterator.isselected == true) {
    //       iterator.isselected = false;
    //       return;
    //     }
    //   }
    //   dispatch({ type: "setLineArray", payload: temp });
    //  console.log(newt)
  };

  const shuffle = () => {
    let temp = [...offerarray];
    const randomarray = [];
    let ta = [];
    let r;
    let randomnum = [];
    while (randomnum.length < 5) {
      r = Math.floor(Math.random() * (limit - num)) + num;
      if (randomnum.indexOf(r) == -1) {
        randomnum.push(r);
        ta.push({ value: r, selected: true });
      }
    }
    for (const eleent of temp[lineindex]) {
      eleent.isselected = false;
    }

    for (const eleent of temp[lineindex]) {
      for (const elt of ta) {
        if (eleent.value == elt.value) {
          eleent.isselected = true;
          // test.push({ value: eleent.value, selected: true });
          //test[lineindex] = [test.push(eleent.value)];
          // setFinal({lineindex:test})
        }
      }
    }

    dispatch({ type: "setOfferArray", payload: temp });

    // let ta = [];
    // let test = [...final];
    // let randomnum = [];
    // let temp = [...arr];
    // let r;
    // // console.log(test);
    // const randomarray = [];
    // while (randomnum.length < 5) {
    //   r = Math.floor(Math.random() * (limit - num)) + num;
    //   if (randomnum.indexOf(r) == -1) {
    //     randomnum.push(r);
    //     ta.push({ value: r, selected: true });
    //   }
    // }
    // const tempa = [...arr];
    // for (const eleent of tempa) {
    //   eleent.selected = false;
    // }
    // for (const eleent of tempa) {
    //   for (const elt of ta) {
    //     if (eleent.value == elt.value) {
    //       eleent.selected = true;
    //       // test.push({ value: eleent.value, selected: true });
    //       test[lineindex] = [test.push(eleent.value)];
    //       // setFinal({lineindex:test})
    //     }
    //   }
    // }
    // // var t=[...final]
    // // t=[...t,test]
    // // setFinal(test)
    // console.log(test);
    // setTemparr(tempa);
  };
  const handlerefresh = () => {
    const tempsel = [...offerarray];
    console.log("tempsel", tempsel);
    for (const eleent of tempsel[lineindex]) {
      eleent.isselected = false;
    }
    dispatch({ type: "setOfferArray", payload: tempsel });
  };
  return (show ?(
    <div className="Lineselector">
     
      <div className="Header">{label1}</div> 
      <div className="Middle">
        <>
          {" "}
          {offerarray[lineindex].map((itm, indx) => {
            return (
              <>
                <button
                  key={itm.value}
                  onClick={(e) => {
                    handleClick(e, indx);
                  }}
                  style={{
                    backgroundColor:
                      itm.isselected === true ? "#3ea6d6" : "white",
                  }}
                >
                  {itm.value}
                </button>
              </>
            );
          })}
        </>
      </div>
      <div className="Footer">
        <button>
          {" "}
          <TbArrowsShuffle onClick={shuffle} />
        </button>
        {/* <button onClick={(e) => { childdata(e, selection, setShowchk) }} className="lineselector_confrimbtn">Confirm</button> */}
        <button>
          {" "}
          <AiOutlineClose onClick={handlerefresh} />
        </button>
      </div>
         
    </div>):""
  );
}
