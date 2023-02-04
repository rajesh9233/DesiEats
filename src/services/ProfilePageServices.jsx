import axios from "axios";
import swal from "sweetalert";
import {getUrl} from"./URl/Url";
import { getToken } from "../constants/Utils";
//Post Requests
//------------------------------
export const WhishListApi = async (userData) => {
    try {
      let WishListResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/customerWishlist/wishlist_action",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "POST",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return WishListResponse
    } catch (e) {
      console.log(e);
    }
  };
  //add_delivery_address Api
  export const addDeliveryAddressApi = async (userData) => {
    try {
      let addDeliveryAddressResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/customerAddress/add_delivery_address",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "POST",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return addDeliveryAddressResponse
    } catch (e) {
      console.log(e);
    }
  };  
  //update_delivery_address Api

  export const updateDeliveryAddressApi = async (userData) => {
    try {
      let updateDeliveryAddressResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/customerAddress/update_delivery_address",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "POST",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return updateDeliveryAddressResponse
    } catch (e) {
      console.log(e);
    }
  };
  //delete_delivery_address
  export const deleteDeliveryAddressApi = async (userData) => {
    try {
      let deleteDeliveryAddressResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/customerAddress/delete_delivery_address",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "POST",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return deleteDeliveryAddressResponse
    } catch (e) {
      console.log(e);
    }
  };

//dine_in_screen
export const dineInScreenApi = async (userData) => {
  try {
    let dineInScreenResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerDineIn/dine_in_screen",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return dineInScreenResponse
  } catch (e) {
    console.log(e);
  }
};
//add_edit_dinein
export const editDineinApi = async (userData) => {
  try {
    let editDineinResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerDineIn/add_edit_dinein",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return editDineinResponse
  } catch (e) {
    console.log(e);
  }
};
//cancel_dinein
export const cancelDineinApi = async (userData) => {
  try {
    let cancelDineinResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerDineIn/cancel_dinein",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return cancelDineinResponse
  } catch (e) {
    console.log(e);
  }
};
//rate_dinein
export const rateDineinApi = async (userData) => {
  try {
    let rateDineinResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerDineIn/rate_dinein",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return rateDineinResponse
  } catch (e) {
    console.log(e);
  }
};

//my_orders
export const myOrdersApi = async (userData) => {
  try {
    let myOrdersResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerOrders/my_orders?selected_tab=1&page=0&limit=10",
      headers: { 
        "Content-Type"  : "application/x-www-form-urlencoded",
        "Authorization" : getToken() 
      },
      method: "GET",
    });
    //setItem storing the data in session
    return myOrdersResponse
  } catch (e) {
    console.log(e);
  }
};

//view_more_order_detail
export const moreOrdersApi = async (userData) => {
  try {
    let moreOrdersResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"customerOrders/view_more_order_detail?order_id=24926",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return moreOrdersResponse
  } catch (e) {
    console.log(e);
  }
};

//track_order_detail
export const trackOrdersApi = async (userData) => {
  try {
    let trackOrdersResponse = await axios({
      // Endpoint to send files
      url: getUrl()+`/customerOrders/track_orders_status?order_id=${userData.order_id}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "GET",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return trackOrdersResponse
  } catch (e) {
    console.log(e);
  }
};

//Profile_detail
export const updateProfiledetailApi = async (userData) => {
  try {
    let updateProfiledetailResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerProfile/update_profile_details",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return updateProfiledetailResponse
  } catch (e) {
    console.log(e);
  }
};



//filter_wallet
export const filterWalletApi = async (userData) => {
  try {
    let filterWalletResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerWallet/filter_wallet?page=0&limit=5",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return filterWalletResponse
  } catch (e) {
    console.log(e);
  }
};
//add_money_to_wallet
export const addMoneyWalletApi = async (userData) => {
  try {
    let addMoneyWalletResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerWallet/add_money_to_wallet",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return addMoneyWalletResponse
  } catch (e) {
    console.log(e);
  }
};


//view_more_order_detail
export const viewMoreOrderDetailApi = async (userData) => {
  try {
    let viewMoreOrderDetailResponse = await axios({
      // Endpoint to send files
      url: getUrl()+`/customerOrders/view_more_order_detail?order_id=${userData.order_id}`,
      headers: { 
        "Content-Type"  : "application/x-www-form-urlencoded",
        "Authorization" : getToken() 
      },
      method: "GET",
    });
    //setItem storing the data in session
    return viewMoreOrderDetailResponse
  } catch (e) {
    console.log(e);
  }
};
    //------------------place_order  API--------------------------------
//---------------------------------------------------------

export const placeOrderApi = async (userData) => {
  try {
    let placeOrderDataApi = await axios({
      url: getUrl()+ "/customerOrders/place_order",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getToken()
      },
      method: "POST",
      data: userData,
    });
    return placeOrderDataApi;
  } catch (e) {
    console.log(e);
  }
};
    //------------------record_transaction_details  API--------------------------------
//---------------------------------------------------------

export const recordTransactionDetailsApi = async (userData) => {
  try {
    let recordTransactionDetailsDataApi = await axios({
      url: getUrl()+ "/customerOrders/record_transaction_details",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:getToken()
      },
      method: "POST",
      data: userData,
    });
    return recordTransactionDetailsDataApi;
  } catch (e) {
    console.log(e);
  }
};
    //------------------process_payment_threeds  API--------------------------------
//---------------------------------------------------------

export const processPaymentThreedsApi = async (userData) => {
  try {
    let processPaymentThreedsDataApi = await axios({
      url: getUrl()+ "/customerOrders/process_payment_threeds",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getToken()
      },
      method: "POST",
      data: userData,
    });
    return processPaymentThreedsDataApi;
  } catch (e) {
    console.log(e);
  }
};
    //------------------update_paid_outstanding_amount  API--------------------------------
//---------------------------------------------------------

export const updateOutstandingAmountApi = async (userData) => {
  try {
    let updateOutstandingAmountDataApi = await axios({
      url: getUrl()+ "/customerOrders/update_paid_outstanding_amount",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: getToken()
      },
      method: "POST",
      data: userData,
    });
    return updateOutstandingAmountDataApi;
  } catch (e) {
    console.log(e);
  }
};


  //Get Requests
  //----------------------------
  export const WhishListGetApi = async (userData) => {
    try {
      let WishListGetApiResponse = await axios({
        // Endpoint to send files
        url: getUrl()+`/customerWishlist/wishlist_details?page=${userData.page}&limit=${userData.limit}&date_timestamp=1648101600`,
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "GET",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return WishListGetApiResponse
    } catch (e) {
      console.log(e);
    }
  };
  
   //TermsAndConditionApi
  //----------------------------
  export const TermsAndConditionApi = async (userData) => {
    try {
      let TermsAndConditionApiResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/data/cms_content?page_key=termsandconditions&app_id=2",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        // "Authorization":getToken() 
      },
  
        method: "GET",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return TermsAndConditionApiResponse
    } catch (e) {
      console.log(e);
    }
  };
  
  export const AllAddressApi = async (userData) => {
    try {
      let AllAddressResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/customerAddress/all_delivery_address?page=0&limit=5",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "GET",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return AllAddressResponse
    } catch (e) {
      console.log(e);
    }
  };
//Profile_detail
export const ProfiledetailApi = async (userData) => {
  try {
    let ProfiledetailResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerProfile/profile_details",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "GET",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return ProfiledetailResponse
  } catch (e) {
    console.log(e);
  }
};


//Get Wallet Detail
export const walletDetailsApi = async (userData) => {
  try {
    let walletDetailsResponse = await axios({
      // Endpoint to send files
      url: getUrl()+"/customerWallet/wallet_details?page=0&limit=5",
      headers: { "Content-Type": "application/x-www-form-urlencoded",
      "Authorization":getToken() 
    },

      method: "GET",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return walletDetailsResponse
  } catch (e) {
    console.log(e);
  }
};
