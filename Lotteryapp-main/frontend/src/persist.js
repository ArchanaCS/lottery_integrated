import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import {createStore} from 'redux';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const initialState = { 
  final: [], 
  linearray: []
};

function todoReducer(prevState=initialState, action) {
  switch (action.type) { 
    case 'setFinal': 
      return {...prevState, final: action.payload};
      break;  
      case 'setLineArray': 
        return {...prevState, linearray: action.payload};
        break;  
    default:
      return prevState;
  }
}

const persistedReducer = persistReducer(persistConfig, todoReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
