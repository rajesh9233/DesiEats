import { React, useState, useEffect } from "react";
import * as yup from "yup";
import OTPInput from "otp-input-react";
import { useFormik } from "formik";
import { Col, Row, Button, Form } from "react-bootstrap";
import { IoRefreshOutline } from "react-icons/io5";
import Location from "../../Location/Location";
import swal from "sweetalert";
import { connect } from "react-redux";
import {
  getOtpSignUpApi,
  signupVerifyContinueApi,
  getHearAboutUsValue,
} from "../../../../services/Landingservice";
import { getSignUpResponse } from "../../../RestaurentView/Redux/Actions/counterActions";
import "./SignUp.css";
import { handleEnter, handleOtpEnter } from "../../../../constants/Utils";
import { handleUpArrowEvent } from "../../../../constants/Utils";
function Signup({
  getSignUpResponse,
  handleCloseFormsPopUp,
  handleOpenLocation,
}) {
  const [OTP, setOTP] = useState("");
  const [timerCount, setTimeCount] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [userList, setUserList] = useState([]);
  const [hearAboutInputText, setHearAboutInputText] = useState("");
  const [showError, setShowError] = useState("");
  const [hearAbout, sethearAbout] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [showInputError, setShowInputError] = useState("");

  let timerOn = true;

  function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    let TimerCounter = m + ":" + s;
    remaining -= 1;

    setTimeCount(TimerCounter);

    if (remaining >= 0 && timerOn) {
      setTimeout(function () {
        timer(remaining);
      }, 1000);
      return;
    }

    if (!timerOn) {
      // Do validate stuff here
      return;
    }
  }

  useEffect(() => {
    if (isSubmitClicked && OTP && OTP.length < 4) {
      setShowError("Please Enter a valid Otp!");
    } else {
      setShowError();
    }
  }, [OTP]);

  //Get values for hear about us API

  useEffect(() => {
    const getHearAboutusApi = async () => {
      try {
        let hearAboutUsApiResponse = await getHearAboutUsValue();
        // setUserList()
        setUserList(hearAboutUsApiResponse.data.data);
      } catch (e) {}
    };
    getHearAboutusApi();
  }, []);

  const showLocationPopup = () => setShowLocation(true);

  const LocationPopUp = (value) => {
    setShowLocation(value);
  };

  const handleHearAboutValue = (event) => {
    setHearAboutInputText(event.target.value);
  };

  //SignUp Module GetOtp API :-
  const getSignUpOtpApi = async () => {
    let postObj = {
      fullname: formik.values.fullName,
      email: formik.values.email,
      mobile: formik.values.phoneNumber,
      app_id: "2",
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0
      ) {
        let signUpApiResponse = await getOtpSignUpApi(postObj);
        if (signUpApiResponse.data.status === 200) {
          timer(15);

          setTimeout(() => {
            document.getElementById("inputone").focus();
          }, 1501);
        } else {
          swal({
            title: "Error!",
            text: signUpApiResponse.data.message,
            type: "Error",
            timer: 1500,
            button: false,

            icon: "error",
            className: "popuptetx",
          });
        }
      }
    } catch (e) {}
  };
  //-----------------------------------------------------------
  const hearFunction = () => {
    if (hearAboutInputText === "others") {
    }
  };
  //SignUp Module SignUp Complete API :-
  //--------------------------------------
  const getSignUpVerifyApi = async () => {
    let postObject = {
      fullname: formik.values.fullName,
      email: formik.values.email,
      mobile: formik.values.phoneNumber,
      device_id: "",
      device_type: "2",
      device_token: "123456789",
      hear_about_us: hearAbout !== "others" ? "" : hearAboutInputText,

      hear_about_us_val: hearAbout,
      app_id: "2",
      code: OTP,
      user_type: "1",
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0 &&
        Object.keys(OTP).length > 3 &&
        checked === true &&
        (hearAbout !== "Other" || hearAboutInputText)

        //   checked === true &&
        //
      ) {
        let signUpApiResponse = await signupVerifyContinueApi(postObject);
        if (signUpApiResponse.data.status === 200) {
          swal({
            title: "Success!",
            text: "Signin successfully!!",
            type: "success",
            timer: 1500,
            button: false,

            className: "popuptetx",
            icon: "success",
          });
          //handleShow()
          handleCloseFormsPopUp();
          setTimeout(() => {
            handleOpenLocation(true);
          }, 1500);
          getSignUpResponse(signUpApiResponse);
        } else {
          swal({
            title: "Error!",
            text: signUpApiResponse.data.message,
            type: "Error",
            timer: 1500,
            button: false,
            icon: "error",
            className: "popuptetx",
          });
        }
      }
    } catch (e) {}
  };
  //Signup form validation--------------------------------

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      rememberMe: false,
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        // .min(8, "Mininum 8 characters")
        .required("Please Enter Your Name!"),
      email: yup
        .string()
        .email("Please Enter Valid Email Address")
        .required("Email Field Is Required!"),
      phoneNumber: yup
        .string()
        .matches(/^[0-9\b]+$/, "Please Enter Digits Only")
        .min(8, "Mininum 8 characters")
        .required("Enter Your Mobile Number!"),
    }),
    onSubmit: (values) => {},
  });

  const handleSubmiter = () => {
    setIsSubmitClicked(true);

    if (
      (hearAbout === "Other" || hearAbout === "") &&
      (hearAboutInputText === "" || hearAboutInputText === "undefined")
    ) {
      setShowInputError("Please enter value");
      return;
    } else {
      setShowInputError();
    }
    if (OTP.length < 4) {
      setShowError("Please Enter Valid OTP");
    } else {
      setShowError();
      getSignUpVerifyApi();
    }
  };
  //HearAbout Us Console log values
  const handle = (e) => {
    sethearAbout(e.target.value);
  };
  useEffect(() => {
    // console.log(hearAbout);
  }, [hearAbout]);
  //Terms and Condition select Box
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState("");

  const handleRememberMe = () => {
    setChecked(!checked);
  };
  const handleChecked = () => {
    if (checked === true) {
      setCheckedError();
    } else {
      setCheckedError("Please Accept Terms & Conditions");
    }
  };

  return (
    <>
      <Row>
        <div className="change_text">
          <b>Sign up or</b> <span>log in to your account</span>
        </div>
        <div className="signup-container">
          <div>
            <Form.Control
              placeholder="Enter Your Name"
              type="text"
              id="fullName"
              name="fullName"
              {...formik.getFieldProps("fullName")}
              className="mb-2"
              onKeyDown={handleEnter}
              onKeyUp={handleUpArrowEvent}
            ></Form.Control>

            {formik.touched.fullName && formik.errors.fullName && (
              <div className="mb-2" style={{ color: "red" }}>
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div>
            <Form.Control
              id="email"
              name="email"
              placeholder="Enter Your Email id"
              className="mb-2"
              {...formik.getFieldProps("email")}
              onKeyDown={handleEnter}
              onKeyUp={handleUpArrowEvent}
            ></Form.Control>
            {formik.touched.email && formik.errors.email && (
              <div className="mb-2" style={{ color: "red" }}>
                {formik.errors.email}
              </div>
            )}
          </div>
          <div>
            <Form.Control
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Your mobile Number"
              className="mb-2"
              maxLength="8"
              onKeyDown={handleEnter}
              {...formik.getFieldProps("phoneNumber")}
              onKeyUp={handleUpArrowEvent}
            ></Form.Control>
            {formik.errors.phoneNumber && (
              <div className="mt-1" style={{ color: "red" }}>
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>
        </div>
        <div className="get-otp-btn">
          <Button
            lg="3"
            className="getNumber get_otp_button_login"
            type="submit"
            onClick={getSignUpOtpApi}
            disabled={
              timerCount !== "00:00" && timerCount !== null ? true : false
            }
          >
            <small>{timerCount === null ? "Get OTP" : "Resend OTP"}</small>
          </Button>
        </div>
        <div className="change_text desc-login otpformat">
          <OTPInput
            value={OTP}
            onChange={setOTP}
            OTPLength={4}
            otpType="number"
            disabled={false}
          />
          <p style={{ color: "red" }}> {showError}</p>
          {timerCount !== null && timerCount !== "00:00" ? (
            <div>
              <small className="TimerCountValue">Time left {timerCount} </small>
              <span id="timer"></span>
            </div>
          ) : null}
        </div>

        <div className="hear-abt">
          <p className="write_here_text ms-2">How did you hear about us?</p>
        </div>
        <div className="signup-container">
          <Form.Select
            name="about"
            className="select_shared_source"
            value={hearAbout}
            aria-label="Default select example"
            onChange={handle}
          >
            {userList.map((item, index) => (
              <option value={item.name} key={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          {hearAbout === "Other" || hearAbout === "" ? (
            <>
              <Form.Control
                className="HearAbout_Write_text"
                type="text"
                id="hearAboutInputText"
                name="hearAboutInputText"
                placeholder="Write here"
                value={hearAboutInputText}
                onChange={handleHearAboutValue}
              />
              <div>
                <p style={{ color: "red" }}> {showInputError}</p>
              </div>
            </>
          ) : null}
        </div>
        <div className="signup-container">
          <div>
            <Form.Check
              type="checkbox"
              checked={checked}
              onChange={handleRememberMe}
              name="rememberMe"
              id="rememberMe"
              className="ms-2"
            />
          </div>
          <div className="text">
            <small>
              By creating an account.I accept the
              <a href="/terms" target="_blank">
                Terms & Conditions & Privacy Policy
              </a>
            </small>
            <p style={{ color: "red" }} className="mt-1">
              {checked === false ? checkedError : null}
            </p>
          </div>
          <div className="get-otp-btn">
            <Button
              type="submit"
              className="signup_button_form ms-2"
              onClick={() => {
                handleSubmiter();
                handleChecked();
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Row>
      <Form onSubmit={formik.handleSubmit}></Form>
      <Location showLocation={showLocation} LocationPopUp={LocationPopUp} />
    </>
  );
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getSignUpResponse: (data) => dispatch(getSignUpResponse(data)),
//   };
// };
// connect(null, mapDispatchToProps)()
export default Signup;
