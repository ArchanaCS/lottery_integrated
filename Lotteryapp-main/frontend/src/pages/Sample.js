import { useState } from "react";
import Collapsible from "../components/Collapsetab";

export default function Sample() {
    const[showDraw,setShowDraw]=useState('false')
    const[showFooter,setShowFooter]=useState('false')
    const[showBank,setShowBank]=useState('false')
  return (
    <div>
      <Collapsible showDraw={true} showFooter={false} showBank={false}/>
      <Collapsible showDraw={false} showFooter={true} showBank={false}/>
      <Collapsible showDraw={false} showFooter={false} showBank={true}/>
    </div>
  );
}
