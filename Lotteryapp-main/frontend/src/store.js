import { legacy_createStore } from "redux";
const initialState = {
  final:[]
};
// {type: "setText", payload:"test"}
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "setFinal":
      return { ...prevState, final: action.payload };
      break;
    
  }
  return prevState;
};
const store = legacy_createStore(reducer);
export default store;
