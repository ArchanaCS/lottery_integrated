import "./Filterbar.css";
import { BsFillCheckCircleFill, BsFilter } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
import { VscListFlat } from "react-icons/vsc";
import { CgMenuGridR } from "react-icons/cg";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import Filterbox from "./Filterbox";
export default function Filterbar({
  DeleteFunc,
  editshow,
  handleselectall,
  handleclick1,
  handleclickfilterbar_filter,
  tasklistsearchshow,
  prospectsearchshow,
  search_array,
  setSearch_array,
  onSearch_updatevalue_from_dropdown,
  search_value,
  onChange,
  onSearch,
  setSearchdate,
  value,
  search_date,
  search_dropdownshow,
  setFilterSerach,
  handleclick,
  // mainshow,
  // setUsername,
  // setLotteryname,
  // setPurchasedate1,
  // setPurchasedate2,
  // setDrawdate,
  // handleclickfilter

}) {
  
  return (
    <>
      <div className="Filterbar_outer">
        <div className="Filterbar_outer_column1">
          <input
            type={"checkbox"}
            checked={value}
            // className="filterbar_selectall"
            onChange={handleselectall}
          />
          <label>Select All</label>
        </div>
        <div className="Filterbar_outer_column2">
          <div className="column2_inner1" onClick={handleclickfilterbar_filter}>
            <BsFilter className="column2_inner1_Filter" />
            <label  onClick={handleclick}>Filters</label>
            {/* <Filterbox showfilter={mainshow}
          setName={setUsername}
          setLotteryname={setLotteryname}
          setPurchasedate1={setPurchasedate1}
          setPurchasedate2={setPurchasedate2}
          setDrawdate={setDrawdate}
          handleclickfilter={handleclickfilter}/>  */}
          </div>
          <div className="column2_inner2">
            {tasklistsearchshow ? (
              <>
                <div
                  className="column2_inner2_Search_div" 
                  onClick={handleclick}
                >
                  <AiOutlineSearch className="column2_inner2_Search" />
                </div>
                <input
                  type={"text"}
                  placeholder="Search"
                  className="filterbar_search"
                  value={search_value}
                  onChange={onChange}
                />
                {/* {search_dropdownshow?<div className= {search_dropdownshow?"filterbar_dropdown" : "filterbar_dropdown1"}>
                  {search_array
                    .filter((item) => {
                      const searchTerm = search_value.toLowerCase();
                      let fullName = item.label.toLowerCase();
                      
                      return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                      );
                    })
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        onClick={() => onSearch_updatevalue_from_dropdown(item.label)}
                        className="filterbar_dropdown_row"
                        key={item.value}
                      >
                        {item.label}
                      </div>
                    ))}
                </div>:<></>} */}
              </>
            ) : (
              <>
                <div className="column2_inner2_Search_div">
                  <AiOutlineSearch className="column2_inner2_Search" />
                </div>
                <input
                  type={"text"}
                  placeholder="Search"
                  className="filterbar_search"
                  onChange={(e)=>setFilterSerach(e.target.value)}

                />
              </>
            )}
            {/* 
if(tasklistsearchshow){
 <>
                <div
                  className="Column2_inner2_Search_div"
                  onClick={() => onSearch(search_value)}
                >
                  <AiOutlineSearch className="Column2_inner2_Search" />
                </div>
                <input
                  type={"text"}
                  placeholder="Search"
                  className="filterbar_search"
                  value={search_value}
                  onChange={onChange}
                />
                <div className="filterbar_dropdown">
                  {search_array
                    .filter((item) => {
                      const searchTerm = search_value.toLowerCase();
                      const fullName = item.label.toLowerCase();
                      return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                      );
                    })
                    .slice(0, 10)
                    .map((item) => (
                      <div
                        onClick={() => onSearch_updatevalue_from_dropdown(item.label)}
                        className="filterbar_dropdown_row"
                        key={item.value}
                      >
                        {item.label}
                      </div>
                    ))}
                </div>
              </>
}else if(prospectsearchshow){
 <>
 <div
   className="Column2_inner2_Search_div"
   onClick={() => onSearch(search_value)}
 >
   <AiOutlineSearch className="Column2_inner2_Search" />
 </div>
 <input
   type={"text"}
   placeholder="Search"
   className="filterbar_search"
   value={search_value}
   onChange={onChange}
 />
 <div className="filterbar_dropdown">
   {search_array
     .filter((item) => {
       const searchTerm = search_value.toLowerCase();
       const fullName = item.label.toLowerCase();
       return (
         searchTerm &&
         fullName.startsWith(searchTerm) &&
         fullName !== searchTerm
       );
     })
     .slice(0, 10)
     .map((item) => (
       <div
         onClick={() => onSearch_updatevalue_from_dropdown(item.label)}
         className="filterbar_dropdown_row"
         key={item.value}
       >
         {item.label}
       </div>
     ))}
 </div>
</>
}else{
                <>
                <div className="Column2_inner2_Search_div">
                  <AiOutlineSearch className="Column2_inner2_Search" />
                </div>
                <input
                  type={"text"}
                  placeholder="Search"
                  className="filterbar_search"
                />
              </>
} */}
            {/* <label>Search</label> */}
          </div>
          <div className="column2_inner3">
            <MdEdit className="column2_inner3_Edit" />
            {editshow ? (
              <label>Edit</label>
            ) : (
              <label
                onClick={(e) => {
                  handleclick1(e);
                }}
              >
                Units
              </label>
            )}
          </div>
          <div className="column2_inner4" onClick={DeleteFunc}>
            <MdDelete className="column2_inner4_Delete" />
            <label>Delete</label>
          </div>
        </div>
        <div className="Filterbar_outer_column3">
          <VscListFlat className="column3_Menuicon" size={50} />
          <CgMenuGridR className="column3_CgMenuicon" size={70} />
          <FaList className="column3_Listicon" size={70} />
        </div>
      </div>
    </>
  );
}
