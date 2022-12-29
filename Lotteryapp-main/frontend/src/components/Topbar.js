
import "../components/Topbar.css"
export default function Topbar({image,text,click}) {
  return (
    <>
      <div className="topbar_outer">
        <div className="topbar_inner">
          <div className="topbar_inner_row1">
            <div className="topbar_inner_row1_img">
            <img src={image} style={{height:'50px'}}></img>
            </div>
           <div className="topbar_inner_row1_text">
           <h3>{text}</h3>
           </div>
            
          </div>

          <div className="topbar_outer_row2">
            <button onClick={click} > OK</button>
          </div>
        </div>
      </div>
    </>
  );
}
