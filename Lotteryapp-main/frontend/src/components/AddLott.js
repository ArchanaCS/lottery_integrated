import React from "react";
import Input from "./Input";
import "../components/AddLott.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdArrowDropDownCircle } from "react-icons/md";
import Collapsible from "react-collapsible";
export default function AddLottery() {

    const [drawdate, setLotterydate] = useState("");
    const [otherdeduct1, setOtherdeduct1] = useState("");
    const [otherdeduct2, setOtherdeduct2] = useState("");
    const [lotterystart, setLotterystart] = useState("");
    const [lotteryend, setLotteryend] = useState("");
    const [lotterycost, setLotterycost] = useState("");
    const [lotterypurchase, setLotterypurchase] = useState("");
    const [lotteryselect, setLotteryselection] = useState("");
    const [lotterysub, setLotterysub] = useState("");
    const [tax, setTax] = useState("");
    const [agentcommission, setAgentcommission] = useState("");
    const [unitsaleamount, setUnitsaleamount] = useState("");
    const [commissionrate, setCommissionrate] = useState("");
    const [adminchargeperunit, setAdminchargeperunit] = useState("");
    const [charitypercent, setCharitypercent] = useState("");
    const [provider, setProvider] = useState("");
    const [first, setFirst] = useState("")
    const [second, setSecond] = useState("")
    const [third, setThird] = useState("")
    const [fourth, setFourth] = useState("")
    const [fifth, setFifth] = useState("")
    const [sixth, setSixth] = useState("")
    const [puramount, setPuramount] = useState("");
    const [lname, setLname] = useState("")
    const [id,setId]=useState("");


    const [Array, setArray] = useState([]);
    const [Array1, setArray1] = useState([]);
    const [Array2, setArray2] = useState([]);
    const handleAddlottery = (id) => {
        let url = "http://localhost:8080/addlottery"
        let req = {
            refProvider: provider,
            lotteryname: lname,
            lotterydate: drawdate,
            puramount: puramount,
            unitsaleamount: unitsaleamount,
            adminchargeperunit: adminchargeperunit,
            lotterystart: lotterystart,
            lotteryend: lotteryend,
            lotterycost: lotterycost,
            lotterypurchase: lotterypurchase,
            lotteryselection: lotteryselect,
            lotterysub: lotterysub,
            agentcommission: agentcommission,
            commissionrate: commissionrate,
            tax: tax,
            otherdeduct1: otherdeduct1,
            otherdeduct2: otherdeduct2,
            charitypercent: charitypercent,
            first: first,
            second: second,
            third: third,
            fourth: fourth,
            fifth: fifth,
            sixth: sixth
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
            console.log("Hiii", res.data)
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
        setProvider(id);
    }

    const fetchDetails = (e, Array1) => {
        console.log("k", e)
        const obj = JSON.parse(e)
        console.log(obj.id)
        console.log(obj.value);
        let url2 = "http://localhost:8080/addlotterydetails";
        let req2 = {
            id: obj.id
        };
        let header2 = {};
        axios.post(url2, req2, header2)
            .then((res) => {
                console.log("hi", obj.id)
                setArray2("hi", res.data)
                setLotterydate(res.data[0].dtLotterydrawdate)
                setAdminchargeperunit(res.data[0].txtAdminChargeperUnit)
                setLotterycost(res.data[0].txtCost)
                setUnitsaleamount(res.data[0].txtUnitSaleAmount)
                setAgentcommission(res.data[0].txtAgentCommission)
                setTax(res.data[0].txtTax)
                setCommissionrate(res.data[0].txtCommissionrate)
                setOtherdeduct1(res.data[0].txtOtherDeduct1)
                setOtherdeduct2(res.data[0].txtOtherDeduct2)
                setLotterystart(res.data[0].txtStartRange)
                setLotteryend(res.data[0].txtEndRange)
                setLotterypurchase(res.data[0].txtPurchaseLimit)
                setLotterysub(res.data[0].txtSubLottery)
                setLotteryselection(res.data[0].txtSelectionLimit)
                setFirst(res.data[0].txtFirstprize)
                setSecond(res.data[0].txtSecondprize)
                setThird(res.data[0].txtThirdprize)
                setFourth(res.data[0].txtFourthprize)
                setFifth(res.data[0].txtFifthprize)
                setSixth(res.data[0].txtSixthprize)
            }).catch();
            setLname(obj.value)
            setId(obj.id)
    }
    const handleEditlottery = () => {
        let url3 = "http://localhost:8080/editlottery"
        console.log("id",provider)
        let req3 = {
            id: id,
            drawdate: drawdate,
            puramount: puramount,
            unitsaleamount: unitsaleamount,
            adminchargeperunit: adminchargeperunit,
            start: lotterystart,
            end: lotteryend,
            cost: lotterycost,
            purchase: lotterypurchase,
            selection: lotteryselect,
            lotterysub: lotterysub,
            agentcommission: agentcommission,
            commissionrate: commissionrate,
            tax: tax,
            otherdeduct1: otherdeduct1,
            otherdeduct2: otherdeduct2,
            charitypercent: charitypercent,
            first: first,
            second: second,
            third: third,
            fourth: fourth,
            fifth: fifth,
            sixth: sixth
        }
        console.log(req3)
        let header3 = {}
        axios.post(url3, req3, header3).then((res) => {
            console.log("Successedit", res.data);
        }).catch();
        console.log("Successedit", lname)
    }



    return (
        <>
            <div className="AddLottery">
                <Collapsible trigger={<div className="AddLottery_header"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span> Add Lottery </div>}>


                    <div className="AddLottery_sheader" >
                        <div>
                            <select
                                onChange={(e) => {
                                    Lotteryname(e.target.value)
                                }} >
                                <option value="" disabled selected hidden>Provider Name</option>
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
                                    fetchDetails(e.target.value)
                                }}>
                                <option disabled selected hidden>Lottery Name</option>

                                {Array1.map((itm, index) => {
                                    let add = '{"id":"' + itm.id + '","value":"' + itm.txtLotteryname + '"}';
                                    return (
                                        <>
                                            <option value={add}>{itm.txtLotteryname}</option>
                                        </>
                                    )
                                })}
                            </select>

                        </div>
                    </div>
                    <Collapsible trigger={<div className="AddLottery_subheader"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span>Lottery Details</div>}>
                        <div className="AddLottery_labels">
                            <div>
                                <Input name="Draw Date" value={drawdate} onChange={(e) => { setLotterydate(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Ticket Cost" value={lotterycost} onChange={(e) => { setLotterycost(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Purchased Amount per unit" value={puramount} onChange={(e) => { setPuramount(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Unit Sale Amount" value={unitsaleamount} onChange={(e) => { setUnitsaleamount(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Admin Charge per Unit" value={adminchargeperunit} onChange={(e) => { setAdminchargeperunit(e.target.value) }} />
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

                    </Collapsible>
                    <Collapsible trigger={<div className="AddLottery_subheader"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span>Lottery Deductions</div>}>
                        <div className="AddLottery_labels">

                            <div>
                                <Input name="Agent Commission" value={agentcommission} onChange={(e) => { setAgentcommission(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Tax" value={tax} onChange={(e) => { setTax(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Commission Rate" value={commissionrate} onChange={(e) => { setCommissionrate(e.target.value) }} />
                            </div>

                            <div>
                                <Input name="Other Deductions 1" value={otherdeduct1} onChange={(e) => { setOtherdeduct1(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Other Deductions 2" value={otherdeduct2} onChange={(e) => { setOtherdeduct2(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Charity Percentage" value={charitypercent} onChange={(e) => { setCharitypercent(e.target.value) }} />
                            </div>
                        </div>

                    </Collapsible>
                    <Collapsible trigger={<div className="AddLottery_subheader"><span><MdArrowDropDownCircle></MdArrowDropDownCircle></span>Lottery Prize Money</div>}>
                        <div className="AddLottery_labels">

                            <div>
                                <Input name="First Prize" value={first} onChange={(e) => { setFirst(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Second Prize" value={second} onChange={(e) => { setSecond(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Third Prize" value={third} onChange={(e) => { setThird(e.target.value) }} />
                            </div>

                            <div>
                                <Input name="Fourth Prize" value={fourth} onChange={(e) => { setFourth(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Fifth Prize" value={fifth} onChange={(e) => { setFifth(e.target.value) }} />
                            </div>
                            <div>
                                <Input name="Sixth Prize" value={sixth} onChange={(e) => { setSixth(e.target.value) }} />
                            </div>
                        </div>

                    </Collapsible>
                    <div className="AddLottery_buttons">
                        <div>
                            <button onClick={(e) => { handleEditlottery(e) }}>Edit Lottery</button>
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