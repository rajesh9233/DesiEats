import axios from "axios";
import {getUrl} from"./URl/Url";
import { getToken } from "../constants/Utils";

//Post Requests
//------------------------------
// Process payment threeds
export const processPaymentThreedsApi = async (userData) => {
  try {
    let processPaymentThreedsResponse = await axios({
      // Endpoint to send files
      url     : getUrl()+"/customerOrders/process_payment_threeds",
      headers : { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
      method  : "POST",
      data    : userData, // Attaching the form data
    });
    // sessionStorage.setItem("isRedirect",0);
    //setItem storing the data in session
    return processPaymentThreedsResponse;
    
  } catch (e) {
    console.log(e);
  }
};

export const recordTransactionDetailsApi = async (userData) => {
  try {
    let recordTransactionDetailsResponse = await axios({
      // Endpoint to send files
      url     : getUrl()+"/customerOrders/record_transaction_details",
      headers : { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
      method  : "POST",
      data    : userData, // Attaching the form data
    });
    // sessionStorage.setItem("isRedirect",0);
    //setItem storing the data in session
    return recordTransactionDetailsResponse;
    
  } catch (e) {
    console.log(e);
  }
};

export const checkoutDetailsApi = async (userData) => {
  try {
    let customerCheckoutScreenResponse = await axios({
      // Endpoint to send files
      url     : getUrl()+"/customerCheckoutScreen/checkout_details",
      headers : { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
      method  : "POST",
      data    : userData, // Attaching the form data
    });
    // sessionStorage.setItem("isRedirect",0);
    //setItem storing the data in session
    return customerCheckoutScreenResponse;
    
  } catch (e) {
    console.log(e);
  }
};