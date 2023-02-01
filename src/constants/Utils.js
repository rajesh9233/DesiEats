// import {}
import { useSelector, useDispatch } from "react-redux";

import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const stripe_key = "pk_test_51LKypgGopyaceY0fVeBhARCrPAaTRa6kgdChXuNpO83ELmZQKmfkw2tqW55KgekCJsPXLx9t19tecGQF97HaSyZL00FJI36Y2m";

// const dispatch = useDispatch();
// dispatch(item.restaurant_id)

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getGuestResponse: (data) => dispatch(getGuestResponse(data)),
//   };
// };
// connect(null, mapDispatchToProps)
export const getToken = () => {
    return JSON.parse(sessionStorage.getItem("otpResponse")) ? JSON.parse(sessionStorage.getItem("otpResponse")).token : null
}
export const getName = () => {
    let nameArray = ["firstName", "lastName"]
    nameArray = JSON.parse(sessionStorage.getItem("otpResponse")) ? JSON.parse(sessionStorage.getItem("otpResponse")).fullname.split(' ') : null
    return nameArray
}

export const getUserType = () => {
    return JSON.parse(sessionStorage.getItem("otpResponse")) ? JSON.parse(sessionStorage.getItem("otpResponse")).user_type : null
}
export const getUserData = () => {
    return JSON.parse(sessionStorage.getItem("otpResponse")) ? JSON.parse(sessionStorage.getItem("otpResponse")) : null

}
export const addressValuesSession = () => {
    return JSON.parse(sessionStorage.getItem("otpResponse")) ? JSON.parse(sessionStorage.getItem("otpResponse")) : null
}
export const addressId = () => {

        return JSON.parse(sessionStorage.getItem("locationResponse")) ? JSON.parse(sessionStorage.getItem("locationResponse")) : null

    }
    export const sessionLocationData=()=>{
        return JSON.parse(sessionStorage.getItem("userLocation")) ? JSON.parse(sessionStorage.getItem("userLocation")) : null
    
    }

    export const landingFormsData=()=>{
        return JSON.parse(sessionStorage.getItem("otpResponse")) ? JSON.parse(sessionStorage.getItem("otpResponse")) : null
    
    }
    // export const DeliveryHandledBy=

// let userName= JSON.parse(sessionStorage.getItem("otpResponse")).name
// console.log(userName)
export const addressDatasValues = () => {
    if (addressValuesSession) {
        return JSON.parse(sessionStorage.getItem("locationResponse")) ? JSON.parse(sessionStorage.getItem("locationResponse")) : null
    } else {
        return JSON.parse(sessionStorage.getItem("otpResponse"))
    }
    // return JSON.parse(sessionStorage.getItem("locationResponse"))? JSON.parse(sessionStorage.getItem("locationResponse")):null
}

export const handleEnter = (event) => {
    if (event.keyCode === 13 || event.keyCode === 40 || event.keyCode === 39) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
        if (index == 2) {
            document.getElementById("inputone").focus()

        }
        return

    }
}


export const handleOtpEnter = (event) => {
    if (event.keyCode === 13 || event.keyCode === 40 || event.keyCode === 39) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
}









export const handleUpArrowEvent = (event) => {
    if (event.keyCode === 38) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index - 1].focus();
        event.preventDefault();
    }
}