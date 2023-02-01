import { React, useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
import { IoRefreshOutline } from "react-icons/io5";
import * as yup from "yup";
import { useFormik } from "formik";
import { connect } from "react-redux";
import swal from "sweetalert";
import { handleEnter } from "../../../../constants/Utils";
import { getLoginResponse } from "../../../RestaurentView/Redux/Actions/counterActions";
import "./Login.css";
import { getUserType } from "../../../../constants/Utils";
import {
  getOtpLoginApi,
  LoginVerifyContinueApi,
} from "../../../../services/Landingservice";
function Login({
  getLoginResponse,
  handleCloseFormsPopUp,
  handleOpenLocation,
}) {
  // const showLocationPopup = () => setShowLocation(true);
  // const LocationPopUp = (value) => {
  //   setShowLocation(value);
  // };
  const [timerCount, setTimeCount] = useState(null);
  let timerOn = true;

  function timer(remaining){
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    let TimerCounter = m + ":" + s;
    remaining -= 1;

    setTimeCount(TimerCounter);

    if(remaining >= 0 && timerOn){
      setTimeout(function () {
        timer(remaining);
      }, 1000);
      return;
    }

    if(!timerOn){
      // Do validate stuff here
      return;
    }
  }

  //OTP Validation
  const [varstate, setVarstate] = useState({
    inputone: "",
    inputtwo: "",
    inputthree: "",
    inputfour: "",
  });

  const [showError, setShowError] = useState("");

  const handleChanger = (e) => {
    const value = e.target.value;
    setVarstate({
      ...varstate,
      [e.target.name]: value,
    });
  };

  let otp2 = varstate.inputone + "" + varstate.inputtwo + "" + varstate.inputthree + "" + varstate.inputfour + "";

  const handleBlur = () => {
    if(otp2.length < 4){
      setShowError("Please Enter 4 digits!");
    }else{
      setShowError();
    }
  };

  const handleSubmiter = () => {
    if (otp2.length < 4) {
      setShowError("Please Enter a valid Otp!");
    } else {
      setShowError();
    }
  };

  //SignUp Module GetOtp API :-
  //-----------------------------
  const getLoginOtpApi = async () => {
    let postLoginOtpObj = {
      contact: formik.values.getotpNumber,
      app_id: "2",
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0
      ) {
        let loginApiResponse = await getOtpLoginApi(postLoginOtpObj);
        if (loginApiResponse.data.status === 200) {
          timer(15);
          swal({
            title: "Success!",
            text: loginApiResponse.data.message,
            type: "success",
            timer: 1500,
            button:false,

            confirmButtonText: "OK",
            className: "popuptetx",
            confirmButtonColor: "#8CD4F5",
            icon: "success",
          });
        }else{

          swal({
            title: "Error!",
            text:loginApiResponse.data.message ,
            type: "Error",
            timer: 1500,
            button:false,

            icon: "error",
            className: "popuptetx",
          });

        }

        // console.log(loginApiResponse);
      }
    } catch (e) {}
  };

  //Login Module Login Complete API :-
  //-----------------------------
  const getLoginVerifyApi = async () => {
    let postLoginVerifyObject = {
      contact       : formik.values.getotpNumber,
      code          : otp2,
      device_id     : "",
      device_type   : "",
      device_token  : "",
      app_id        : "2",
      guest_userId  : "",
    };

    try {
      if(Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length !== 0){
        let loginApiVerifyResponse = await LoginVerifyContinueApi(
          postLoginVerifyObject
        );

        if(loginApiVerifyResponse.data.status === 200){
          handleCloseFormsPopUp();
          getLoginResponse(loginApiVerifyResponse);
          if(getUserType() === 2){
            setTimeout(() => {
              handleOpenLocation(true);
            }, 1500);
          }
        }else{
          swal({
            title     : "Error!",
            text      : loginApiVerifyResponse.data.message ,
            type      : "Error",
            timer     : 1500,
            button    : false,
            icon      : "error",
            className : "popuptetx",
          });
        }
      }
    } catch (e) {}
  };

  const formik = useFormik({
    initialValues: {
      getotpNumber: "",
    },
    validationSchema: yup.object({
      getotpNumber: yup
        .string()
        .matches(/^[0-9\b]+$/, "Please Enter Digits Only")
        .min(8, "Mininum 8 characters")
        .required("Enter Your Mobile Number!"),
    }),
  });
  //----------------------------------------------------

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg="1" md="1" sm="4"></Col>
          <Col lg="10" md="9" sm="9">
            <div className="change_text ">
              <span>Sign up</span>  <b>or log in to your account</b>
            </div>
          </Col>
          <Col lg="1" />
          <Row>
            <Col lg="1" />
            <Col lg="10" className="otptext mt-3">
              <small>
                {" "}
                Mobile Numbers of users by sending OTP verification code <br />
                during registaration,login and contact form submissions.
              </small>
            </Col>
            <Col lg="1" />
          </Row>
          <Row className="mt-3 ms-3 mb-3">
            <Col lg="2" />
            <Col lg="7">
              <div class="input-group prefix">                           
                <span class="input-group-addon">+65</span>
                <input type="text"
                  className="getNumber form-control"
                  id="getotpNumber"
                  maxLength="8"
                  name="getotpNumber"
                  placeholder="Phone Number"
                  aria-label="Username" 
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("getotpNumber")}
                />
              </div>
              {formik.touched.getotpNumber && formik.errors.getotpNumber && (
                <div className="" style={{ color: "red", fontSize: "1vw" }}>
                  {formik.errors.getotpNumber}
                </div>
              )}
            </Col>
          </Row>

          <Row className="mt-1 ms-3">
            <Col lg="2" />

            <Col lg="7">
              <Button
                className="getNumber get_otp_button_login"
                type="submit"
                onClick={getLoginOtpApi}
                disabled={
                  timerCount !== "00:00" && timerCount !== null ? true : false
                }
              >
                {timerCount === null ? "Get OTP" : "Resend OTP"}
              </Button>
            </Col>
            <Col lg="2" />
          </Row>
          <Row>
            <Col lg="3" />
            <Col lg="7" className="mt-3">
              <p className="otp ">Please enter the OTP received</p>
            </Col>
          </Row>

          <Row className="mx-2">
            <Col lg="3" />
            <Col lg="5">
              <Row>
                <Col lg="3">
                  <Form.Control
                    type="text"
                    name="inputone"
                    id="inputone"
                    className="inputone mt-2 mb-3"
                    placeholder=""
                    maxlength="1"
                    value={varstate.inputone}
                    onChange={handleChanger}
                    onBlur={handleBlur}
                    onKeyDown={handleEnter}
                  ></Form.Control>
                </Col>
                <Col lg="3">
                  <Form.Control
                    className="inputtwo mt-2 mb-3"
                    type="text"
                    maxlength="1"
                    onBlur={handleBlur}
                    value={varstate.inputtwo}
                    id="inputtwo"
                    name="inputtwo"
                    onChange={handleChanger}
                    placeholder=""
                    onKeyDown={handleEnter}
                  />
                </Col>
                <Col lg="3">
                  <Form.Control
                    className="inputthree mt-2 mb-3"
                    type="text"
                    value={varstate.inputthree}
                    id="inputthree"
                    name="inputthree"
                    onChange={handleChanger}
                    maxlength="1"
                    onBlur={handleBlur}
                    placeholder=""
                    onKeyDown={handleEnter}
                  />
                </Col>
                <Col lg="3">
                  <Form.Control
                    className="inputthree mt-2 mb-3"
                    type="text"
                    value={varstate.inputfour}
                    id="inputfour"
                    name="inputfour"
                    onChange={handleChanger}
                    maxlength="1"
                    onBlur={handleBlur}
                    placeholder=""
                    onKeyDown={handleEnter}
                  />
                </Col>

                {/* <Col lg="2" className="borderTextBox">

                </Col>
                <Col lg="2" className="borderTextBox">
                  
                  </Col>
                  <Col lg="2" className="borderTextBox">
                  
                  </Col>
                  <Col lg="2" className="borderTextBox">
                  
                  </Col>  */}
                {timerCount !== null && timerCount !== "00:00" ? (
                  <div>
                    <small></small>Time left {timerCount}{" "}
                    <span id="timer"></span>
                  </div>
                ) : null}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="2" />
            {/* <Col lg="7">
              <p style={{ color: "red" }} className="ms-4">
                {" "}
                {shoeError}
              </p>
              {timerCount==="00:00"?(<h6 className="ms-5" onClick={getLoginOtpApi}>
                Resend OTP <IoRefreshOutline />
              </h6>):<div>Time left ={timerCount} <span id="timer"></span></div>
              }
              
            </Col> */}
          </Row>
          <Row>
            <Col lg="3"></Col>
            <Col lg="5">
              <Button
                className="verify mt-3 ms-4 mb-5"
                type="submit"
                onClick={() => {
                  handleSubmiter();
                  getLoginVerifyApi();
                }}
              >
                Verify
              </Button>
            </Col>
          </Row>
        </Row>
      </Form>
    </>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getLoginResponse: (data) => dispatch(getLoginResponse(data)),
//   };
// };
// connect(null, mapDispatchToProps)
export default Login;
