import axios from "axios";
import { getUrl } from "./URl/Url";
import { getToken } from "../constants/Utils";
let user = JSON.parse(sessionStorage.getItem("otpResponse"));
// console.log(user);

//------------------RestaurentByCatagory API--------------------------------
//---------------------------------------------------------
export const restaurentByCatagory = async (userData) => {
  try {
    let RestaurentCatagoryItems = await axios({
      url:getUrl()+ "/restaurants/restaurant_by_category",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":getToken(),
      },
      method: "POST",
      data: userData,
    });
    return RestaurentCatagoryItems;
  } catch (e) {
    console.log(e);
  }
};

//------------------Product Listing API--------------------------------
//---------------------------------------------------------
export const productListingApi = async (userData) => {
  try {
    let productListingDataApi = await axios({
      url: getUrl()+ "/restaurants/product_listing_by_restaurant",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: user?.token,
      },
      method: "POST",
      data: userData,
    });
    return productListingDataApi;
  } catch (e) {
    console.log(e);
  }
};
//------------------Home Page Deatails API--------------------------------
//---------------------------------------------------------
export const homePageDetailsApi = async (userData) => {
  try {
    let HomePageDetailsDataApi = await axios({
      url: getUrl()+ "/customerHomePage/homepage_details",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": getToken(),
      },
      method: "POST",
      data: userData,
    });
    return HomePageDetailsDataApi;
  } catch (e) {
    console.log(e);
  }
};

//------------------Best Seller API--------------------------------
//---------------------------------------------------------

export const bestSellerApi = async (userData) => {
  try {
    let bestSellerApiDataApi = await axios({
      url: getUrl()+ "/customerHomePage/search_bestseller",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: user?.token,
      },
      method: "POST",
      data: userData,
    });
    return bestSellerApiDataApi;
  } catch (e) {
    console.log(e);
  }
};

export const searchTrendingonApi = async (userData) => {
  try {
    let searchTrendingonApi = await axios({
      url: getUrl()+ "/customerHomePage/search_trendingon",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": user?.token,
      },
      method: "POST",
      data: userData,
    });
    return searchTrendingonApi;
  } catch (e) {
    console.log(e);
  }
};


//------------------Trending ON API--------------------------------
//---------------------------------------------------------

export const searchRestaurantsApi = async (userData) => {
  try {
    let trendingOnApiDataApi = await axios({
      url: getUrl()+ "/customerHomePage/search_restaurants",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: user?.token,
      },
      method: "POST",
      data: userData,
    });
    return trendingOnApiDataApi;
  } catch (e) {
    console.log(e);
  }
};

//------------------WhishList  API--------------------------------
//---------------------------------------------------------

export const whishListApi = async (userData) => {
  try {
    let whishListDataApi = await axios({
      url: getUrl()+ "/customerWishlist/wishlist_action",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: user?.token,
      },
      method: "POST",
      data: userData,
    });
    return whishListDataApi;
  } catch (e) {
    console.log(e);
  }
};


//------------------AddEditDinein  API--------------------------------
//---------------------------------------------------------

export const addEditDineinApi = async (userData) => {
  try {
    let whishListDataApi = await axios({
      url: getUrl()+ "/customerDineIn/add_edit_dinein",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: user?.token,
      },
      method: "POST",
      data: userData,
    });
    return whishListDataApi;
  } catch (e) {
    console.log(e);
  }
};
//------------------CancelDinein  API--------------------------------
//---------------------------------------------------------

export const cancelDineinApi = async (userData) => {
  try {
    let cancelDineinDataApi = await axios({
      url: getUrl()+ "/customerDineIn/cancel_dinein",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: user?.token,
      },
      method: "POST",
      data: userData,
    });
    return cancelDineinDataApi;
  } catch (e) {
    console.log(e);
  }
};