import "./Collapsetab.css";
import { GrAddCircle } from "react-icons/gr";
import Collapsible from "react-collapsible";
import Footer from "./Footer";
import Draw from "./Drawresult";
import Bank from "./Bankedit";
export default function Collapsetab({ showDraw, showFooter, showBank }) {
  return (
    <div className="collapsibletab">
      <div className="collapsibletab_raw">
        <Collapsible
          trigger={
            <div className="collapsibletab_raw_icon">
              <GrAddCircle />
              <label>Collapsible header</label>
            </div>
          }
        >
          {showFooter ? <Footer /> : <></>}
          {showDraw ? <Draw /> : <></>}
          {showBank ? <Bank /> : <></>}
        </Collapsible>
      </div>
    </div>
  );
}
