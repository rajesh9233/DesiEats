import axios from "axios";
import { getUrl } from "./URl/Url";
import { getToken } from "../constants/Utils";
let user = JSON.parse(sessionStorage.getItem("otpResponse"));
// console.log(user);
//------------------add_remove_product_cart  API--------------------------------
//---------------------------------------------------------

export const addRemoveProductCartApi = async (userData) => {
    try {
      let addRemoveProductCartDataApi = await axios({
        url: getUrl()+ "/customerCartDetails/add_remove_product_cart",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return addRemoveProductCartDataApi;
    } catch (e) {
      console.log(e);
    }
  };
  
  //------------------add_remove_variant_cart  API--------------------------------
//---------------------------------------------------------

export const addRemoveVariantCartApi = async (userData) => {
    try {
      let addRemoveVariantCartDataApi = await axios({
        url: getUrl()+ "/customerCartDetails/add_remove_variant_cart",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return addRemoveVariantCartDataApi;
    } catch (e) {
      console.log(e);
    }
  };
  

  //------------------empty_cart  API--------------------------------
//---------------------------------------------------------

export const emptyCartApi = async (userData) => {
    try {
      let emptyCartDataApi = await axios({
        url: getUrl()+ "/customerCartDetails/empty_cart",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return emptyCartDataApi;
    } catch (e) {
      console.log(e);
    }
  };
  

    //------------------checkout_details POST  API--------------------------------
//---------------------------------------------------------

export const checkoutDetailsPostApi = async (userData) => {
    try {
      let checkoutDetailsPostDataApi = await axios({
        url: getUrl()+ "/customerCheckoutScreen/checkout_details",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return checkoutDetailsPostDataApi;
    } catch (e) {
      console.log(e);
    }
  };
    //------------------manage_product_qty_checkout_screen  API--------------------------------
//---------------------------------------------------------

export const manageProductCheckoutApi = async (userData) => {
    try {
      let manageProductCheckoutDataApi = await axios({
        url: getUrl()+ "/customerCheckoutScreen/manage_product_qty_checkout_screen",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return manageProductCheckoutDataApi;
    } catch (e) {
      console.log(e);
    }
  };
    //------------------check_and_apply_promo_code  API--------------------------------
//---------------------------------------------------------

export const applyPromoCodeApi = async (userData) => {
    try {
      let applyPromoCodeDataApi = await axios({
        url: getUrl()+ "/customerCheckoutScreen/check_and_apply_promo_code",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return applyPromoCodeDataApi;
    } catch (e) {
      console.log(e);
    }
  };
    //------------------product_availability_check  API--------------------------------
//---------------------------------------------------------

export const productAvailabilityCheckApi = async (userData) => {
    try {
      let productAvailabilityCheckDataApi = await axios({
        url: getUrl()+ "/customerCheckoutScreen/product_availability_check",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "POST",
        data: userData,
      });
      return productAvailabilityCheckDataApi;
    } catch (e) {
      console.log(e);
    }
  };
  


//GET requests
  //------------------cart_value  API--------------------------------
//---------------------------------------------------------

export const cartValueApi = async (userData) => {
    try {
      let cartValueDataApi = await axios({
        url: getUrl()+ "/customerCartDetails/cart_value",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "GET",
        data: userData,
      });
      return cartValueDataApi;
    } catch (e) {
      console.log(e);
    }
  };
  


  //------------------add_remove_product_cart  API--------------------------------
//---------------------------------------------------------

export const customizeItemsApi = async (userData) => {
    try {
      let customizeItemsDataApi = await axios({
        url: getUrl()+ "/customerCartDetails/customize_items?page=0&limit=10&product_id=6693",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "GET",
        data: userData,
      });
      return customizeItemsDataApi;
    } catch (e) {
      console.log(e);
    }
  };
  
    //------------------checkout_details  API--------------------------------
//---------------------------------------------------------

export const checkoutDetailsApi = async (userData) => {
    try {
      let checkoutDetailsDataApi = await axios({
        url: getUrl()+ "/customerCheckoutScreen/checkout_details?restaurant_id=17&order_type=1&pickup_time=1648215000&latitude=22.9406434&longitude=78.52852&pin_address=18, Manjhleveer, tantra bankhedi,  Madhya Pradesh  India&delivery_name=Bala Test&delivery_email=karuppiah.mariyappan@braveryinfotech.com&delivery_mobile=98989898&unit_number=11&street_address=&postal_code=461990&date_timestamp=1648103467",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: user?.token,
        },
        method: "GET",
        data: userData,
      });
      return checkoutDetailsDataApi;
    } catch (e) {
      console.log(e);
    }
  };