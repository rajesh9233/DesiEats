import axios from "axios";
import swal from "sweetalert";
import {getUrl} from"./URl/Url";
import { getToken } from "../constants/Utils";
//------------------Product Listing By Catagory API--------------------------------
//---------------------------------------------------------
export const ProductListingApi = async (userData) => {
    try {
      let ProductListingResponse = await axios({
        // Endpoint to send files
        url: getUrl()+"/restaurants/product_listing_by_restaurant",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken() 
      },
  
        method: "POST",
        // Attaching the form data
        data: userData,
      });
      //setItem storing the data in session
      return ProductListingResponse
    } catch (e) {
      console.log(e);
    }
  };
  