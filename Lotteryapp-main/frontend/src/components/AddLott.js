import React from "react";
import Input from "./Input";
import "../components/AddLott.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdArrowDropDownCircle } from "react-icons/md";
import Collapsible from "react-collapsible";
export default function AddLottery() {

    const [lotterydate, setLotterydate] = useState("");
    const [lotteryprize, setLotteryprize] = useState("");
    const [lotterystart, setLotterystart] = useState("");
    const [lotteryend, setLotteryend] = useState("");
    const [lotterycost, setLotterycost] = useState("");
    const [lotterypurchase, setLotterypurchase] = useState("");
    const [lotteryselect, setLotteryselection] = useState("");
    const [lotterysub, setLotterysub] = useState("");
    const [provider, setProvider] = useState("");
    const [lotteryname, setLotteryname] = useState("");

    const [Array, setArray] = useState([]);
    const [Array1, setArray1] = useState([]);
    const [Array2, setArray2] = useState([]);
    const handleAddlottery = () => {
        let url = "http://localhost:8080/addlottery"
        let req = {
            lotteryname: lotteryname,
            lotterydate: lotterydate,
            lotteryprize: lotteryprize,
            lotterystart: lotterystart,
            lotteryend: lotteryend,
            lotterycost: lotterycost,
            lotterypurchase: lotterypurchase,
            lotteryselection: lotteryselect,
            lotterysub: lotterysub
        }
        console.log(req)
        let header = {}
        axios.post(url, req, header).then((res) => {
            console.log("Success", res.data);
        }).catch();
    }

    useEffect(() => {
        let url = "http://localhost:8080/addlotteryproviderfetch";
        let req = {};
        let header = {};
        axios.post(url, req, header).then((res) => {
            console.log("Hi", res.data)
            setArray(res.data)
        }).catch();


    }, []);
    const Lotteryname = (id) => {
        let url1 = "http://localhost:8080/addlotteryexist"
        let req1 = { refProvider: id }
        console.log("req", id)
        let header1 = {}
        axios.post(url1, req1, header1)
            .then((res) => {
                setArray1(res.data);
                console.log("lotteryname", res.data)
            })
            .catch();

        let url2 = "http://localhost:8080/addlotterydetails";
        let req2 = {
            id: id
        };
        let header2 = {};
        axios.post(url2, req2, header2)
            .then((res) => {
                console.log("details", res.data)
                setArray2(res.data)
                setLotterydate(res.data[0].dtLotterydrawdate)
                setLotteryprize(res.data[0].txtLotteryprize)
                setLotterycost(res.data[0].txtCost)
                setLotterystart(res.data[0].txtStartRange)
                setLotteryend(res.data[0].txtEndRange)
                setLotterypurchase(res.data[0].txtPurchaseLimit)
                setLotterysub(res.data[0].txtSubLottery)
                setLotteryselection(res.data[0].txtSelectionLimit)
            }).catch();
    }

    return (
        <>
            <div className="AddLottery">
                <Collapsible trigger={<div className="AddLottery_header"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span> Add Lottery </div>}>


                    <div className="AddLottery_sheader" >
                        <div>
                            <select onClick={(e) => {
                                Lotteryname(e.target.value)
                            }}
                                onChange={(e) => { setProvider(e.target.value); }} >
                                <option>Select</option>
                                {Array.map((itm, index) => {
                                    return (
                                        <>
                                            <option value={itm.id}>{itm.txtProvidername}</option>
                                        </>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <select
                                onChange={(e) => {
                                    setLotteryname(e.target.value)
                                }}>
                                <option>Select</option>
                                {Array1.map((itm, index) => {
                                    return (
                                        <>
                                            <option onClick={(e) => { Lotteryname(e.target.value) }} value={itm.id}>{itm.txtLotteryname}</option>
                                        </>
                                    )
                                })}
                            </select>

                        </div>
                    </div>
                    <Collapsible trigger={<div className="AddLottery_subheader"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span>Lottery Details</div>}>
                        <div className="AddLottery_labels">
                            <div>
                                <Input name="Draw Date" value={lotterydate} onChange={(e) => { setLotterydate(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Ticket Cost" value={lotteryprize} onChange={(e) => { setLotteryprize(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Purchased Amount per unit" value={lotterycost} onChange={(e) => { setLotterycost(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Unit Sale Amount" value={lotterycost} onChange={(e) => { setLotterycost(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Admin Charge per Unit" value={lotterycost} onChange={(e) => { setLotterycost(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Sub Lottery" value={lotterysub} onChange={(e) => { setLotterysub(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Start Range" value={lotterystart} onChange={(e) => { setLotterystart(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="End Range" value={lotteryend} onChange={(e) => { setLotteryend(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Selection Limit" value={lotteryselect} onChange={(e) => { setLotteryselection(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Purchasing Limit" value={lotterypurchase} onChange={(e) => { setLotterypurchase(e.target.value) }} />
                            </div>


                        </div>
                        {/* <div className="AddLottery_buttons">
                            <div>
                                <button>Edit Lottery</button>
                            </div>
                            <div>
                                <button onClick={(e) => { handleAddlottery(e) }}>Add Lottery</button>
                            </div>
                        </div> */}
                    </Collapsible>
                    <Collapsible trigger={<div className="AddLottery_subheader"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span>Lottery Deductions</div>}>
                        <div className="AddLottery_labels">

                            <div>
                                <Input name="Agent Commission" value={lotterystart} onChange={(e) => { setLotterystart(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Tax" value={lotteryend} onChange={(e) => { setLotteryend(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Commission Rate" value={lotteryend} onChange={(e) => { setLotteryend(e.target.value) }} />
                            </div>

                            <div>
                                <Input name="Other Deductions 1" value={lotteryselect} onChange={(e) => { setLotteryselection(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Other Deductions 2" value={lotterypurchase} onChange={(e) => { setLotterypurchase(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Charity Percentage" value={lotteryend} onChange={(e) => { setLotteryend(e.target.value) }} />
                            </div>
                        </div>

                    </Collapsible>
                    <Collapsible trigger={<div className="AddLottery_subheader"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span>Lottery Prize Money</div>}>
                        <div className="AddLottery_labels">

                            <div>
                                <Input name="First Prize" value={lotterystart} onChange={(e) => { setLotterystart(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Second Prize" value={lotteryend} onChange={(e) => { setLotteryend(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Third Prize" value={lotteryend} onChange={(e) => { setLotteryend(e.target.value) }} />
                            </div>

                            <div>
                                <Input name="Fourth Prize" value={lotteryselect} onChange={(e) => { setLotteryselection(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Fifth Prize" value={lotterypurchase} onChange={(e) => { setLotterypurchase(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Sixth Prize" value={lotterypurchase} onChange={(e) => { setLotterypurchase(e.target.value) }} />
                            </div>
                        </div>


                       
                    </Collapsible>
                    <div className="AddLottery_buttons">
                            <div>
                                <button>Edit Lottery</button>
                            </div>
                            <div>
                                <button onClick={(e) => { handleAddlottery(e) }}>Add Lottery</button>
                            </div>
                        </div>
                </Collapsible>
               
            </div >

        </>
    )
}