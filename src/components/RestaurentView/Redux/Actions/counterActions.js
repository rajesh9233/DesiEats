import { INCREMENT, DECREMENT,LOGINRESPONSE,SIGNUPRESPONSE,GUESTRESPONSE,
ADDRESSDATA,TABVALUE,RESTAURENTDATAS } from "./actionTypes";

const increment = (id) => {
  // console.log("increment action");
  return {
    type: INCREMENT,
    id
  };
};

const decrement = (id) => {
  // console.log("decrement action");
  return {
    type: DECREMENT,
    id
  };
};

const getLoginResponse =(payload)=>{
return{
  type: LOGINRESPONSE,
  payload

};
};
const getSignUpResponse =(payload)=>{
  return{
    type: SIGNUPRESPONSE,
    payload

  };
};
  const getGuestResponse =(payload)=>{
    return{
      type: GUESTRESPONSE,
      payload
    };
};
const getAddressData =(payload)=>{
  return{
    type: ADDRESSDATA,
    payload
  };
};
const tabValueData =(payload)=>{
  return{
    type: TABVALUE,
    payload
  };
};

const restaurentValues =(payload)=>{
  return{
    type: RESTAURENTDATAS,
    payload
  };
};

export { increment, decrement,getLoginResponse,getSignUpResponse,
getGuestResponse,getAddressData,tabValueData,restaurentValues};