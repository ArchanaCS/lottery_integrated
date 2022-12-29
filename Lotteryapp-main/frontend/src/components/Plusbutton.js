import { AiOutlinePlus ,AiOutlineCheck} from 'react-icons/ai';
import "./Plusbutton.css"
export default function Plusbutton({show,setShow,showchk,setShowchk}){
    const hndleclick=()=>{
        setShow(false)
        }
    return<>
    {/* <div className={show?'Plusbutton_plus':"none"}>
    <AiOutlinePlus color="grey" size="10%" onClick={hndleclick} />
    </div> */}
    <div className={showchk?'Plusbutton_tick':"none"}>
        <AiOutlineCheck color="rgba(64, 156, 187, 0.616)" size="40%"/>
    </div>
   
    </>
}