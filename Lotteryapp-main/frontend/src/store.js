import { legacy_createStore } from "redux";
const initialState = {
  final: [],
  ltryid: "",
  ltryname: "",
};
// {type: "setText", payload:"test"}
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "setFinal":
      return { ...prevState, final: action.payload };
      break;
    // case "setLtryid":
    //   return { ...prevState, ltryid: action.payload };
    //   break;
    // case "setLtryname":
    //   return { ...prevState, ltryname: action.payload };
    //   break;
  }
  return prevState;
};
const store = legacy_createStore(reducer);
export default store;
