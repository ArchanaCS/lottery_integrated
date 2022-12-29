import Provideradd from "./Provideradd"
import Provideredit from "./Provideredit"
import "../components/ProviderInfo.css"
import Collapsible from "react-collapsible";
import {MdArrowDropDownCircle} from "react-icons/md"
import { useState } from "react";

export default function ProviderInfo(){
    return(
        <><div className="providerinfo_container">
        <Collapsible trigger={<div className="providerinfo_header"><span><MdArrowDropDownCircle/></span><h6>Provider info</h6></div>}>
        <Collapsible trigger={<div className="providerinfo_subheader"><span><MdArrowDropDownCircle/></span><h6>Provider list</h6></div> }>
        <Provideredit/>
        </Collapsible>
        <Provideradd/></Collapsible>
        </div>
        </>
    )
}