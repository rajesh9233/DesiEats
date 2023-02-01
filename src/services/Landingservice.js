import axios from "axios";
import swal from "sweetalert";
import { getUrl } from "./URl/Url";

let user = JSON.parse(sessionStorage.getItem("otpResponse"));
// console.log(user);

//SignUp Module GetOtp API :-
//-----------------------------
export const getOtpSignUpApi = async (userData) => {
  // console.log(getUrl());
  try {
    let signUpApiOtpResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/customerSignup/get_otp",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // Attaching the form data
      data: userData,
    });
    // sessionStorage.setItem("otpResponse",JSON.stringify(signUpApiOtpResponse.data.data));
    //setItem storing the data in session
    return signUpApiOtpResponse;
  } catch (e) {
    console.log(e);
  }
};
//--------------------------------------------------------------------

//SignUp Module Signup to APP API :-
//----------------------------------
export const signupVerifyContinueApi = async (userData) => {
  try {
    let signUpApiVerfifyResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/customerSignup/signup",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    sessionStorage.setItem(
      "otpResponse",
      JSON.stringify(signUpApiVerfifyResponse.data.data)
    );
  
    const locat = {
      pin_address: signUpApiVerfifyResponse.data.data.user_pin_address,
      street_address: signUpApiVerfifyResponse.data.data.user_street_address,
      postal_code: signUpApiVerfifyResponse.data.data.user_postal_code,
      unit_number: signUpApiVerfifyResponse.data.data.user_unit_number,
      latitude: signUpApiVerfifyResponse.data.data.latitude,
      longitude: signUpApiVerfifyResponse.data.data.longitude,
    };
    sessionStorage.setItem("userLocation", JSON.stringify(locat));
    //setItem storing the data in session
    return signUpApiVerfifyResponse;
  } catch (e) {
    console.log(e);
  }
};
//--------------------------------------------------------------------

//Login Module GetOtp API :-
//-----------------------------
export const getOtpLoginApi = async (userData) => {
  try {
    let loginApiOtpResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/customerLogin/send_otp",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    // sessionStorage.setItem(
    //   "otpResponse",
    //   JSON.stringify(loginApiOtpResponse.data.data)
    // );
    //setItem storing the data in session
    return loginApiOtpResponse;
  } catch (e) {
    console.log(e);
  }
};

//Login Module Login to APP API :-
//-----------------------------
export const LoginVerifyContinueApi = async (userData) => {
  try {
    let LoginApiVerifyResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/customerLogin/verify_and_proceed",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    sessionStorage.setItem(
      "otpResponse",
      JSON.stringify(LoginApiVerifyResponse.data.data)
    );
    const locat = {
      pin_address: LoginApiVerifyResponse.data.data.user_pin_address,
      street_address: LoginApiVerifyResponse.data.data.user_street_address,
      postal_code: LoginApiVerifyResponse.data.data.user_postal_code,
      unit_number: LoginApiVerifyResponse.data.data.user_unit_number,
      latitude: LoginApiVerifyResponse.data.data.latitude,
      longitude: LoginApiVerifyResponse.data.data.longitude,
    };
    sessionStorage.setItem("userLocation", JSON.stringify(locat));
    //setItem storing the data in session
    return LoginApiVerifyResponse;
  } catch (e) {
    console.log(e);
  }
};
//------------------LogOut API--------------------------------
//---------------------------------------------------------
export const logOutApi = async (userData) => {
  try {
    let logOutResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/base/logout",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: JSON.parse(sessionStorage.getItem("otpResponse")).token,
      },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    // sessionStorage.setItem(
    //   "otpResponse",
    //   JSON.stringify(logOutResponse.data.data)
    // );
    return logOutResponse;
  } catch (e) {
    console.log(e);
  }
};

//------------------Location API--------------------------------
//---------------------------------------------------------
export const LocationPopupApi = async (userData) => {
  try {
    let locationPopUpResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/customerSignup/confirm_location",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: JSON.parse(sessionStorage.getItem("otpResponse")).token,
      },

      method: "POST",
      // Attaching the form data
      data: userData,
    });

    const locat = {
      pin_address: locationPopUpResponse.data.data.pin_address,
      street_address: locationPopUpResponse.data.data.street_address,
      postal_code: locationPopUpResponse.data.data.postal_code,
      unit_number: locationPopUpResponse.data.data.unit_number,
      latitude: locationPopUpResponse.data.data.lat,
      longitude: locationPopUpResponse.data.data.lng,
    };
    sessionStorage.setItem("userLocation", JSON.stringify(locat));
    //setItem storing the data in session
    return locationPopUpResponse;
  } catch (e) {
    console.log(e);
  }
};

//------------------Contact Us API--------------------------------
//---------------------------------------------------------
export const contactUsLandingApi = async (userData) => {
  try {
    let locationPopUpResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/ContactUs/send_message",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Authorization":user?.token
      },

      method: "POST",
      // Attaching the form data
      data: userData,
    });
    //setItem storing the data in session
    return locationPopUpResponse;
  } catch (e) {
    console.log(e);
  }
};

//GET Requests
//----------------

export const getHearAboutUsValue = async (userData) => {
  try {
    let getHearAboutUsValueResponse = await axios({
      // Endpoint to send files
      url: getUrl() + "/data/hear_about_us",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: userData,
    });
    //setItem storing the data in session
    return getHearAboutUsValueResponse;
  } catch (e) {
    console.log(e);
  }
};

export const listAllNotificationApi = async (userData) => {
  try {
    let listAllNotificationResponse = await axios({
      // Endpoint to send files
      url:
        getUrl() + "/customerNotification/list_all_notification?page=0&limit=2",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: JSON.parse(sessionStorage.getItem("otpResponse")).token,
      },
      data: userData,
    });
    //setItem storing the data in session
    return listAllNotificationResponse;
  } catch (e) {
    console.log(e);
  }
};
