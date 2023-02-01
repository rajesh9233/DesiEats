import {
  INCREMENT,
  DECREMENT,
  LOGINRESPONSE,
  SIGNUPRESPONSE,
  GUESTRESPONSE,
  ADDRESSDATA,
  TABVALUE,
  RESTAURENTDATAS
} from "../Actions/actionTypes";

const initialState = {
  count: 0,
  loginresponse: {},
  signupresponse: {},
  guestresponse: {},
  addressdata: {},
  tabvalue :{},
  restaurentlist:{},
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
 
    
    case DECREMENT:
      if (state.count) {
        return {
          ...state,
          count: state.count - 1,
        };
    
    }
      break;
    case LOGINRESPONSE:
      return {
        ...state,
        loginresponse: action.payload,
      };
    case SIGNUPRESPONSE:
      return {
        ...state,
        signupresponse: action.payload,
      };
    case GUESTRESPONSE:
      return {
        ...state,
        guestresponse: action.payload,
      };
      case ADDRESSDATA:
        return {
          ...state,
          addressdata: action.payload,
        };
        case TABVALUE:
          return {
            ...state,
            tabvalue: action.payload,
          };
          
          case RESTAURENTDATAS:
            return{
              ...state,
              restaurentlist: action.payload,
            }
    default:
      return state;
  }
};

export default counterReducer;
