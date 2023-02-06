import { React, useState } from "react";
import { Col, Row, Button, Badge, Form } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import Forms from "../../Landing/Form/Forms";
import Landingbody from "../../Landing/LandingBody/Landingbody";
import { getUserType } from "../../../constants/Utils";
import "./LoginView.css";
import CheckMark from "../../../Asserts/PaymentandLogin/Checkmark.png";
function LoginView({ guestResponseData }) {
  const [showForms, setShowForms] = useState(false);
  const handleShowForms = () => {
    // if(getUserType()!=="3"){
    //   setShowForms(true);
    // }
    setShowForms(true);
  };

  const closeFormsPopUp = (value) => {
    setShowForms(value);
  };
  // console.log(guestResponseData)
  let user = JSON.parse(sessionStorage.getItem("otpResponse"));
  // console.log(user);
  return (
    <>
      <>
        {user?.user_type === 2 ? (
          <>
            <Row>
              <Col lg="1" />
              <Col lg="8" className="mt-4">
                <h4>
                  Account
                  <img
                    src={CheckMark}
                    alt="checkmark"
                    className="checkmarkpaymentLogin ms-4"
                  />
                </h4>
              </Col>
            </Row>
            <Row>
              <Col lg="1" />

              <Col>
                <p>
                  To Place an order now, please login to continue or sign up
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg="1" />
              <Col lg="8">
                <Button
                  className="Login_Or_Sign mb-1"
                  onClick={handleShowForms}
                >
                  <small className="have_an_accoubt">Have an Account?</small>
                  <br />
                  <small className="login_signup">LOG IN or SIGN UP</small>
                </Button>
              </Col>
            </Row>
          </>
        ) : null}

        <Row>
          <Col lg="1" />
          <Col lg="11">
            <Badge className="contactless mt-4">
              <Row>
                <Col lg="7">
                  <div className="contactless_deliveryBadgePayment">
                    <p className="contactless_delivery mt-2">
                      Contactless Delivery
                    </p>

                    <small className="order_content_details mb-2">
                      To keep You safe,the rider will place your order at your
                      door
                    </small>
                  </div>
                </Col>
                <Col lg="1" />

                <Col lg="2">
                  <Switch defaultChecked />
                </Col>
              </Row>
            </Badge>
          </Col>
        </Row>
        <Row>
          <Col lg="1" />
          <Col lg="5" className="mt-4">
            <h5>Delivery Time:</h5>
          </Col>
        </Row>
        <Row>
          <Col lg="1" />
          <Col lg="4" className="">
            <Form.Select aria-label="Default select example">
              <option>04:01:2023</option>
              <option>05:01:2023</option>
              <option>06:01:2023</option>
            </Form.Select>
          </Col>
          <Col lg="4" className="">
            <Form.Select aria-label="Default select example">
              <option>01:00</option>
              <option>01:15</option>
              <option>01:30</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col lg="1" />
          <Col lg="10">
            <hr className="mb-4 mt-5" />
          </Col>
        </Row>
      </>

      <Forms showForms={showForms} closeFormsPopUp={closeFormsPopUp} />
    </>
  );
}
export default LoginView;
