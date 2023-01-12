import "./Userdetails.css"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../components/HeaderUser";
import Footer from "../components/Footer";
import { Collapsible } from "collapsible-react-component";
import "collapsible-react-component/dist/index.css";
import { IoIosArrowDropdown } from "react-icons/io";


export default function Userdetails() {

    const [fetchunitdetails, setFetchunitdetails] = useState([]);
    const usrname=localStorage.getItem('usrname')
    useEffect(() => {
        let url = "http://localhost:8080/userunitfetch";
        let request = {};
        let header = {};
        axios
            .post(url, request, header)
            .then((res) => {
                var temp = [...res.data];
                for (const element of temp) {
                    element.isClicked = false;
                }
                setFetchunitdetails(temp);
                console.log("nw", temp);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [fetchwinningstodate, setFetchwinningstodate] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8080/userwinningtodatefetch";
        let request = {};
        let header = {};
        axios
            .post(url, request, header)
            .then((res) => {
                var temp = [...res.data];
                for (const element of temp) {
                    element.isClicked = false;
                }
                setFetchwinningstodate(temp);
                console.log("nw", temp);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [fetchuserwinningvalidation, setFetchuserwinningvalidation] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8080/userwinningvalidationfetch";
        let request = {};
        let header = {};
        axios
            .post(url, request, header)
            .then((res) => {
                console.log(res.data);
                setFetchuserwinningvalidation(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [providerlotterynamewinnings, setProviderlotterynamewinnings] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8080/providerlotterynamewinnings";
        let request = {};
        let header = {};
        axios
            .post(url, request, header)
            .then((res) => {
                console.log(res.data);
                setProviderlotterynamewinnings(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/AdminLotteryManager");
    };


    const [newfetchunitdetails, setNewfetchunitdetails] = useState([]);
    function opn(lname, item, index) {
        let temp = [...fetchunitdetails];
        for (const item of temp) {
            item.isClicked = false;
        }
        temp[index].isClicked = true;
        const newn = fetchuserwinningvalidation.filter((obj) => obj.txtLotteryname === lname);
        setNewfetchunitdetails(newn);
        setFetchunitdetails(temp);
        console.log(newfetchunitdetails);
        console.log(lname);

    }

    console.log(newfetchunitdetails);
    function colu() {
        let temp = [...fetchunitdetails];
        for (const itm of temp) {
            itm.isClicked = false;
        }
        setFetchunitdetails(temp);
    }

    const [newproviderlotterynamewinnings, setNewproviderlotterynamewinnings] = useState([]);

    function open(pname, item, index) {
        let temp = [...fetchwinningstodate];
        for (const item of temp) {
            item.isClicked = false;
        }
        temp[index].isClicked = true;
        const newp = providerlotterynamewinnings.filter((obj) => obj.txtProvidername === pname);
        setNewproviderlotterynamewinnings(newp);
        setFetchwinningstodate(temp);
        console.log(newfetchunitdetails);
        console.log(pname);
        console.log(item.isClicked)
    }

    function colp() {
        let temp = [...fetchwinningstodate];
        for (const itm of temp) {
            itm.isClicked = false;
        }
        setFetchwinningstodate(temp);
    }

    const label5click=()=>{
        navigate("/UserPage")
      }
      const label7click=()=>{
        // navigate("/LotteryManager")
        
      }
      const label6click=()=>{
        navigate("/Userprofile")
      }
      const label8click=()=>{
        navigate("/TicketSelector", { state: { id: "", name: "" } })
      }
      const label4click=()=>{
        navigate("/")
      }

    return (
        <div className="Userdetails_container">
            <div className="Userdetails_headerUser">
            <HeaderUser
          label1={usrname}
          label2={0}
          label3={"My Cart"}
          label4={"Home"}
          label5={"Dashboard"}
          label6={"Profile"}
          label7={"About Us"}
          label8={"Buy Now"}
          label4click={label4click}
          label5click={label5click}
          label7click={label7click}
          label6click={label6click}
          label8click={label8click}
        />
            </div>

            <div className="Userdetails_unitdetails">

                <div className="Userdetails_unitdetails_outer">
                    <div className="Userdetails_unitdetails_outer_header">
                        <p>{"Lotteryname"}</p>
                        <p>{"Draw Date"}</p>
                        <p>{"Prize won"}</p>
                    </div>
                    {fetchunitdetails.map((item, index) => {
                        return (
                            <>
                                <div className="Userdetails_unitdetails_outer_row" onClick={() => {
                                    fetchunitdetails[index].isClicked
                                        ? colu()
                                        : opn(item.txtLotteryName, item, index);

                                }}>
                                    <p><button
                                    ><IoIosArrowDropdown /></button>{item.txtLotteryName}</p>
                                    <p>{item.DrawDate}</p>
                                    <p>{item.TotalPrize}</p>
                                    {/* <td><span>{item[value4]}</span></td> */}
                                </div>
                                <div><Collapsible open={item.isClicked}>

                                    <div className="Userdetails_unitdetails_outer_row_dropdown_header">
                                        <p className="Userdetails_unitdetails_outer_row_dropdown_entrydatep">{"Entry Date"}</p>
                                        <p className="Userdetails_unitdetails_outer_row_dropdown_numbersp">{"Number of Matching numbers"}</p>
                                        <p className="Userdetails_unitdetails_outer_row_dropdown_prizep">{"Unit Prize"}</p>

                                    </div>

                                    {newfetchunitdetails.map((item, index) => {
                                        return (
                                            <>
                                                <div className="Userdetails_unitdetails_outer_row_dropdown_content">
                                                    <p className="Userdetails_unitdetails_outer_row_dropdown_entrydate">{item.EntryDate}</p>
                                                    <p className="Userdetails_unitdetails_outer_row_dropdown_numbers">{item.txtMatchingcount}</p>
                                                    <p className="Userdetails_unitdetails_outer_row_dropdown_prize">{item.txtPrizemoney}</p>
                                                </div>

                                            </>
                                        );
                                    })};


                                </Collapsible>
                                </div>
                            </>
                        );
                    })}
                    <button
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Proceed to Lottery Manager
                    </button>
                </div>



            </div>

            <div className="Userdetails_providerandprizedetails">

                <div className="Userdetails_providerandprizedetails_outer">
                    <div className="Userdetails_providerandprizedetails_outer_header">
                        <p>{"Lottery provider"}</p>
                        <p>{"Total prizes won until now"}</p>
                    </div>
                    {fetchwinningstodate.map((item, index) => {
                        return (
                            <>
                                <div className="Userdetails_providerandprizedetails_outer_row" onClick={() => {
                                    fetchwinningstodate[index].isClicked
                                        ? colp()
                                        : open(item.txtProvidername, item, index);

                                }}>

                                    <p><button
                                    ><IoIosArrowDropdown /></button>{item.txtProvidername}</p>
                                    <p>{item.ProviderTotal}</p>
                                </div>
                                <div><Collapsible open={item.isClicked}>
                                <div className="Userdetails_providerandprizedetails_outer_row_dropdown_header">
                                        <p className="Userdetails_providerandprizedetails_outer_row_dropdown_entrydatep">{"Lottery Name"}</p>
                                        <p className="Userdetails_providerandprizedetails_outer_row_dropdown_numbersp">{"Entry Date"}</p>
                                        <p className="Userdetails_providerandprizedetails_outer_row_dropdown_prizep">{"Unit Prize"}</p>

                                    </div>

                                    {newproviderlotterynamewinnings.map((item, index) => {
                                        return (
                                            <>
                                                <div className="Userdetails_providerandprizedetails_outer_row_dropdown_content">
                                                    <p className="Userdetails_providerandprizedetails_outer_row_dropdown_lotteryname">{item.txtLotteryName}</p>
                                                    <p className="Userdetails_providerandprizedetails_outer_row_dropdown_entrydate">{item.EntryDate}</p>
                                                    <p className="Userdetails_providerandprizedetails_outer_row_dropdown_prize">{item.TotalPrize}</p>
                                                </div>

                                            </>
                                        );
                                    })};

                                </Collapsible>
                                </div>



                                {/* <td><span>{item[value4]}</span></td> */}

                            </>
                        );
                    })}
                    <button
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        Proceed to Lottery Manager
                    </button>
                </div>

            </div>

            <div className="Userdetails_footer">
                <Footer />
            </div>
        </div>


    );
}