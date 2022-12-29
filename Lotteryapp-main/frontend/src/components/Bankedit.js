import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import "./Bankedit.css";
import Collapsible from "react-collapsible";
export default function Bankedits() {
  return (
    <div className="bankedit_maincontainer">
      <div className="bankselect">
        <div className="bankselect_innerdiv">
          <div className="bankselect_innerdiv">
            <input type="checkbox" />
            <h3>Bank1</h3>
          </div>
          <div className="bankselect_icondiv">
              <button><AiFillEdit /></button>
              <button><MdDelete /></button>
          </div>
        </div>
        <div className="bankselect_innerdiv">
          <div className="bankselect_innerdiv">
            <input type="checkbox" />
            <h3>Bank2</h3>
          </div>
          <div className="bankselect_icondiv">
          <button><AiFillEdit /></button>
          <button><MdDelete /></button>
          </div>
        </div>
      </div>
      <Collapsible  trigger="Add new bank account">
      <div className="bankedits_container">
        <div className="bankedits_label_div">
          <label>Your Bank Account</label>
        </div>
        <div className="bankedits_input_div">
          <div className="bankedits_input_innerdiv">
            <label>Account owner</label>
            <input type="text" />
          </div>
          <div className="bankedits_input_innerdiv">
            <label>Account number</label>
            <input type="text" />
          </div>
          <div className="bankedits_input_innerdiv">
            <label>Bank Name</label>
            <input type="text" />
          </div>
          <div className="bankedits_input_innerdiv">
            <label>Branch</label>
            <input type="text" />
          </div>
          <div className="bankedits_input_innerdiv">
            <label>Routing Number</label>
            <input type="text" />
          </div>
        </div>
        <div className="bankedits_label_div">
          <label>Your Credit Card</label>
        </div>
        <div className="bankedits_input_div">
          <div className="bankedits_input_innerdiv">
            <label>Credit card account number</label>
            <input type="text" />
          </div>
        </div>
        <div className="bankedit_btn">
          <button>Update Bank</button>
        </div>
        
      </div>
        </Collapsible>
      
      
    </div>
  );
}
