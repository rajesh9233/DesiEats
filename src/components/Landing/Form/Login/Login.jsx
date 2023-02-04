import { React, useEffect, useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import OTPInput from "otp-input-react";
import * as yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";
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
  const [timerCount, setTimeCount] = useState(null);
  const [OTP, setOTP] = useState("");
  const [showError, setShowError] = useState("");
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  useEffect(() => {
    if (isSubmitClicked && OTP && OTP.length < 4) {
      setShowError("Please Enter a valid Otp!");
    } else {
      setShowError();
    }
  }, [OTP]);

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

  const handleSubmiter = () => {
    setIsSubmitClicked(true);
    if (OTP.length < 4) {
      setShowError("Please Enter a valid Otp!");
    } else {
      setShowError();
      getLoginVerifyApi();
    }
  };

  //SignUp Module GetOtp API :-
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
            button: false,

            confirmButtonText: "OK",
            className: "popuptetx",
            confirmButtonColor: "#8CD4F5",
            icon: "success",
          });
        } else {
          swal({
            title: "Error!",
            text: loginApiResponse.data.message,
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

  //Login Module Login Complete API :-
  const getLoginVerifyApi = async () => {
    let postLoginVerifyObject = {
      contact: formik.values.getotpNumber,
      code: OTP,
      device_id: "",
      device_type: "",
      device_token: "",
      app_id: "2",
      guest_userId: "",
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0
      ) {
        let loginApiVerifyResponse = await LoginVerifyContinueApi(
          postLoginVerifyObject
        );

        if (loginApiVerifyResponse.data.status === 200) {
          handleCloseFormsPopUp();
          getLoginResponse(loginApiVerifyResponse);
          if (getUserType() === 2) {
            setTimeout(() => {
              handleOpenLocation(true);
            }, 1500);
          }
        } else {
          swal({
            title: "Error!",
            text: loginApiVerifyResponse.data.message,
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

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <div className="change_text">
            <span>Sign up</span> <b>or log in to your account</b>
          </div>
          <p className="change_text desc-login">
            <small>
              Mobile Numbers of users by sending OTP verification code during
              registaration,login and contact form submissions.
            </small>
          </p>
          <div>
            <div class="input-group prefix">
              <span class="input-group-addon">+65</span>
              <input
                type="text"
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
              <div className="error-style">{formik.errors.getotpNumber}</div>
            )}
          </div>
          <div className="get-otp-btn">
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
            <div className="change_text desc-login">
              <p className="otp">Please enter the OTP received</p>
            </div>
            <div className="change_text desc-login otpformat">
              <OTPInput
                value={OTP}
                onChange={setOTP}
                OTPLength={4}
                otpType="number"
                disabled={false}
              />
              <div className="" style={{ color: "red", fontSize: "1vw" }}>
                {showError}
              </div>
              {timerCount !== null && timerCount !== "00:00" ? (
                <div>
                  <small></small>Time left {timerCount} <span id="timer"></span>
                </div>
              ) : null}
            </div>
            <div className="get-otp-btn">
              <Button
                className="verify mt-3 ms-4 mb-5"
                type="submit"
                onClick={() => {
                  handleSubmiter();
                }}
              >
                Verify
              </Button>
            </div>
          </div>
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
