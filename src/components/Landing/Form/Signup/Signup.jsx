import { React, useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Col, Row, Button, Form } from "react-bootstrap";
import { IoRefreshOutline } from "react-icons/io5";
import Location from "../../Location/Location";
import swal from "sweetalert";
import { connect } from "react-redux";
import {
  getOtpSignUpApi,
  signupVerifyContinueApi,
  getHearAboutUsValue
} from "../../../../services/Landingservice";
import { getSignUpResponse } from "../../../RestaurentView/Redux/Actions/counterActions";
import "./SignUp.css";
import { handleEnter,handleOtpEnter } from "../../../../constants/Utils";
import { handleUpArrowEvent } from "../../../../constants/Utils";
function Signup({ getSignUpResponse, handleCloseFormsPopUp,
  handleOpenLocation
}) {
  const [timerCount,setTimeCount]=useState(null)
  let timerOn = true;

  function timer(remaining) {
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;
    
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
   let TimerCounter = m + ':' + s;
    remaining -= 1;
    
    setTimeCount(TimerCounter)
    // console.log(TimerCounter);

    if(remaining >= 0 && timerOn) {
      setTimeout(function() {
          timer(remaining);
      }, 1000);
      return;
    }

    if(!timerOn) {
      // Do validate stuff here
      return;
    }

    // Do timeout stuff here
    // alert('Timeout for otp');
  }
  
  const [showLocation, setShowLocation] = useState(false);
  const showLocationPopup = () => setShowLocation(true);
  const LocationPopUp = (value) => {
    setShowLocation(value);
  };

    //Get values for hear about us API
    const [userList, setUserList] = useState([]);


useEffect(()=>{
  const getHearAboutusApi = async () => {
    
    try {
        let hearAboutUsApiResponse = await getHearAboutUsValue();
        // setUserList()
        setUserList(hearAboutUsApiResponse.data.data)
     
    } catch (e) {}
  };
  getHearAboutusApi()
},[])

  const [hearAboutInputText, setHearAboutInputText] = useState("");
  const handleHearAboutValue = (event) => {
    setHearAboutInputText(event.target.value);
  };
  // console.log(hearAboutInputText);
  //SignUp Module GetOtp API :-
  //-----------------------------
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
         
          setTimeout(()=>{
            document.getElementById("inputone").focus()

          },1501)
        }else{

          swal({
            title: "Error!",
            text:signUpApiResponse.data.message ,
            type: "Error",
            timer: 1500,
            button:false,

            icon: "error",
            className: "popuptetx",
          });
        }

        // console.log(signUpApiResponse);
      }
    } catch (e) {}
  };
  //-----------------------------------------------------------
const hearFunction=()=>{
  if(hearAboutInputText==="others"){
    
  }
}
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
      hear_about_us:hearAbout!=="others"?"":hearAboutInputText  ,

      hear_about_us_val: hearAbout,
      app_id: "2",
      code: otp2,
      user_type: "1",
    };

    try {
      if (
        (Object.keys(formik.errors).length === 0 &&
          Object.keys(formik.touched).length !== 0 &&
          Object.keys(otp2).length > 3 &&
          checked===true &&
          (hearAbout !== "Other" || hearAboutInputText ) 
          
        //   checked === true &&
        //  
        )
      ) {
        let signUpApiResponse = await signupVerifyContinueApi(postObject);
        if (signUpApiResponse.data.status === 200) {
          swal({
            title: "Success!",
            text: "Signin successfully!!",
            type: "success",
            timer: 1500,
            button:false,

            className: "popuptetx",
            icon: "success",
          });
          //handleShow()
          handleCloseFormsPopUp();
          setTimeout(()=>{
            handleOpenLocation(true)
  
          },1500)
          getSignUpResponse(signUpApiResponse);
        }
        else{

          swal({
            title: "Error!",
            text:signUpApiResponse.data.message ,
            type: "Error",
            timer: 1500,
           button:false,
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
  //----------------------------------


  //OTP validation
  const [varstate, setVarstate] = useState({
    inputone: "",
    inputtwo: "",
    inputthree: "",
    inputfour: "",
  });
  const [shoeError, setShowError] = useState("");
  const handleChanger = (e) => {
    const value = e.target.value;
    setVarstate({
      ...varstate,
      [e.target.name]: value,
    });
  };
  let otp2 =
    varstate.inputone +
    "" +
    varstate.inputtwo +
    "" +
    varstate.inputthree +
    "" +
    varstate.inputfour +
    "";
  const handleBlur = () => {
    if (otp2.length < 4) {
      setShowError("Please Enter 4 Digits!");
    } else {
      setShowError();
    }
  };
  const handleSubmiter = () => {
    if (otp2.length < 4) {
      setShowError("Please Enter Valid OTP");
    } else {
      setShowError();
      // console.log(otp2);
    }
  };
  //HearAbout Us Console log values
  const [hearAbout, sethearAbout] = useState("");
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
// console.log(checked)
// console.log(totalSec)
// console.log(hearAbout)
  return (
    <>
      <Row>
        <Col lg="5" md="4" sm="4"></Col>
        <Col lg="10" md="9" sm="9">
          <div className="change_text ms-5">
            <b>Sign up or</b> <span>log in to your account</span>
          </div>
        </Col>
      </Row>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="ms-2">
          <Col lg="1" md="4" sm="4"></Col>
          <Col lg="8" md="9" sm="9">
            <Form.Control
              placeholder="Enter Your Name"
              type="text"
              id="fullName"
              name="fullName"
              {...formik.getFieldProps("fullName")}
              className="mb-2 mt-3"
              onKeyDown={handleEnter}
              onKeyUp={handleUpArrowEvent}

            ></Form.Control>

            {formik.touched.fullName && formik.errors.fullName && (
              <div className="mb-2" style={{ color: "red" }}>
                {formik.errors.fullName}
              </div>
            )}

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

          </Col>
        </Row>

        <Row className="ms-2">
          <Col lg="1" md="4" sm="4"></Col>

          <Col lg="8" md="9" sm="9">
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
            {formik.errors.phoneNumber&& (
              <div className="mt-1" style={{ color: "red" }}>
                {formik.errors.phoneNumber}
              </div>
            )}
          </Col>
          <Col>
            <Button
              lg="3"
              className="get_otp"
              type="submit"
              onClick={getSignUpOtpApi}
              disabled={timerCount!=="00:00" && timerCount!==null?true:false}

            >
                <small>{timerCount===null? "Get OTP" :"Resend OTP"}</small>
            </Button>
          </Col>
        </Row>
      </Form>
      <div></div>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="ms-5">
          <Col lg="1" />
          <Col lg="6">
            <Row>
              <Col lg="3">
                <Form.Control
                  type="text"
                  name="inputone"
                  id="inputone"
                  className="input1 mt-4 mb-3"
                  placeholder=""
                  maxlength="1"
                  value={varstate.inputone}
                  onChange={handleChanger}
                  onBlur={handleBlur}
                  onKeyDown={handleOtpEnter}

                ></Form.Control>
              </Col>
              <Col lg="3">
                <Form.Control
                  className="input2 mt-4 mb-3"
                  type="text"
                  maxlength="1"
                  onBlur={handleBlur}
                  value={varstate.inputtwo}
                  id="inputtwo"
                  name="inputtwo"
                  onChange={handleChanger}
                  placeholder=""
                  onKeyDown={handleOtpEnter}

                />
              </Col>
              <Col lg="3">
                <Form.Control
                  className="input3 mt-4 mb-3"
                  type="text"
                  value={varstate.inputthree}
                  id="inputthree"
                  name="inputthree"
                  onChange={handleChanger}
                  maxlength="1"
                  onBlur={handleBlur}
                  placeholder=""
                  onKeyDown={handleOtpEnter}

                />
              </Col>
              <Col lg="3">
                <Form.Control
                  className="input4 mt-4 mb-3"
                  type="text"
                  value={varstate.inputfour}
                  id="inputfour"
                  name="inputfour"
                  onChange={handleChanger}
                  maxlength="1"
                  onBlur={handleBlur}
                  placeholder=""

                />
              </Col>
              <Row>
                <Col lg="12">
                {timerCount!==null && timerCount!=="00:00"?
(<div><small className="TimerCountValue">Time left  { timerCount}  </small><span id="timer"></span></div>):
null
}
                </Col>
              </Row>
              {/* {timerCount!==null && timerCount!=="00:00"?
(<div><small className="TimerCountValue">Time left  { timerCount}  </small><span id="timer"></span></div>):
null
} */}
              <p style={{ color: "red" }}> {shoeError}</p>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col lg="3" />
          <Col lg="5">

          </Col>
        </Row>

        <Row className="ms-2">
          <Col lg="1" />
          <Col lg="8">
            <p className="write_here_text ms-2">How did you hear about us?</p>
          </Col>
        </Row>
        <Row className="ms-2 mb-2">
          <Col lg="1" />
          <Col lg="5">
            <Form.Select
              name="about"
              className="select_shared_source ms-2"
              value={hearAbout}
              aria-label="Default select example"
              onChange={handle}
            >
              {userList.map((item, index) => (
                <option value={item.name} key={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>{" "}
          </Col>
        </Row>

        <Row>
          <Col lg="1" />
          {hearAbout === "Other"  || hearAbout==="" ? (
            <Col lg="7" className="ms-3">
              <Form.Control
                className="HearAbout_Write_text ms-2 mt-1 mb-3"
                type="text"
                id="hearAboutInputText"
                name="hearAboutInputText"
                placeholder="Write here"
                value={hearAboutInputText}
                onChange={handleHearAboutValue}
              />
            </Col>
          ) : null}
        </Row>

        <Row>
          <Col lg="1" />

          <Col lg="1" className=" mt-2 ms-3">
            <Form.Check
              type="checkbox"
              checked={checked}
              onChange={handleRememberMe}
              name="rememberMe"
              id="rememberMe"
              className="ms-2"
            />
          </Col>
          <Col lg="9">
            <small>
              By creating an account.I accept the Terms &
              <br />
              Conditions & Privacy Policy
            </small>
            <p style={{ color: "red" }} className="mt-1">
              {checked===false?checkedError:null }
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg="1" />

          <Col lg="8" md="9" sm="9" className="mt-3 ms-3">
            <Button
              type="submit"
              className="signup_button_form ms-2"
              onClick={() => {
                handleSubmiter();
                getSignUpVerifyApi();
                handleChecked();
              }}
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
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
