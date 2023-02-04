import { React, useState, useEffect } from "react";
import { Col, Row, Button, Card, Badge } from "react-bootstrap";
import ellipse from "../../../Asserts/landingpage/Group 316.png";
import mobile from "../../../Asserts/landingpage/Group 315.png";
import playstore from "../../../Asserts/landingpage/Group 167 (1).png";
import appstore from "../../../Asserts/landingpage/Appstore.png";
import { AiFillStar } from "react-icons/ai";
import Popcornimage from "../../../Asserts/landingpage/popcorn.png";
import { RiSearchLine } from "react-icons/ri";
import { addressId } from "../../../constants/Utils";
import { landingFormsData } from "../../../constants/Utils";
import { sessionLocationData } from "../../../constants/Utils";
import { addressValuesSession } from "../../../constants/Utils";
import BurgerImage from "../../../Asserts/landingpage/Hamburger.png";
// import { getGuestResponse } from "../.././RestaurentView/Redux/Actions/counterActions";
//import { connect } from "react-redux";

import Location from "../Location/Location";
import { useNavigate } from "react-router-dom";
import { signupVerifyContinueApi } from "../../../services/Landingservice";
import { getUserType } from "../../../constants/Utils";
import "./Landingbody.css";
import App from "../Location/App";

function Landingbody() {
  let navigate = useNavigate();

  const [resetForm, setResetForm] = useState(false);
  const [showLocation, setShowLocation] = useState(false); //Location modal
  const [isMobileLandind, setIsMobileLanding] = useState(false);

  const navigateToHome = () => {
    navigate("/home");
  };

  if (
    sessionLocationData() === undefined &&
    sessionLocationData().initialVal === undefined
  ) {
    const locationObj = {
      pin_address: "",
      street_address: "",
      postal_code: "",
      unit_number: "",
      latitude: "",
      longitude: "",
      initialVal: 0,
    };
    sessionStorage.setItem("userLocation", JSON.stringify(locationObj));
  }

  const showLocationPopup = () => {
    if (landingFormsData() === null || landingFormsData() === undefined) {
      setShowLocation(true);
    } else {
      let locationData = Object.keys(sessionLocationData())?.length;
      if (locationData !== 0) {
        if (getUserType() === 2) {
          if (
            sessionLocationData().pin_address === "" ||
            sessionLocationData().postal_code === ""
          ) {
            setShowLocation(true);
          } else {
            setShowLocation(false);
            navigateToHome();
          }
        } else {
          if (
            sessionLocationData().pin_address === "" ||
            sessionLocationData().street_address === "" ||
            sessionLocationData().postal_code === "" ||
            sessionLocationData().unit_number === ""
          ) {
            setShowLocation(true);
          } else {
            setShowLocation(false);
            navigateToHome();
          }
        }
      } else {
        setShowLocation(true);
      }
    }
  };

  const LocationPopUp = (value) => {
    setShowLocation(value);
  };

  // Guest User Signup API function:
  const getGuestUserApi = async () => {
    setResetForm(!resetForm);
    let postObject = {
      fullname: "",
      email: "",
      mobile: "",
      device_id: "",
      device_type: "2",
      device_token: "123456789",
      hear_about_us: "",
      hear_about_us_val: "",
      app_id: "2",
      user_type: "2",
    };

    try {
      let user = JSON.parse(sessionStorage.getItem("otpResponse"));
      if (!user) {
        let response = await signupVerifyContinueApi(postObject);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (window.innerWidth > 500) {
      setIsMobileLanding(true);
    }
  }, []);

  return (
    <>
      {isMobileLandind ? (
        <Row className="body-container">
          <Col>
            <div>
              <Button className="FoodDeliveryButtonLanding ">
                <small>
                  Food Delivery
                  <img
                    src={BurgerImage}
                    className="ms-2 mb-2 BurgerImageLanding"
                    alt="Burger"
                  />
                </small>
              </Button>
            </div>
            <div>
              <h1 className="QuickestText">
                <div className="textDivision">
                  Quickest<small className="FoodLanding ms-2">Food</small>
                  <br />
                  <small className="DeliveryLanding">
                    Delivery <span className="inTownTextLanding"> in Town</span>
                  </small>
                </div>
              </h1>
            </div>
            <div className="our_text">
              <b>we will deliver your food within 30 minutes in your town,if</b>
              <br />
              <b>we would fail,we will give the food free.</b>
            </div>
            <div>
              <Button
                type="button"
                className="order_button"
                onClick={() => {
                  getGuestUserApi();
                  showLocationPopup();
                }}
              >
                Order your Food
                <RiSearchLine className="SearchIconLanding ms-1 py-1" />
              </Button>
            </div>
          </Col>
          <Col>
            <img className="ellipse" src={ellipse} alt="no"></img>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col xs="5">
              <img className="ellipse" src={ellipse} alt="no"></img>
            </Col>
          </Row>
          <Row>
            <Col xs="1" />
            <Col xs="10" className="">
              <div>
                <h1 className="QuickestText ">
                  <div className="textDivision">
                    Quickest<small className="FoodLanding ms-2">Food</small>
                    <small className="DeliveryLanding">
                      Delivery
                      <br />
                    </small>
                  </div>
                </h1>
              </div>
            </Col>
            <small className="inTownTextLanding">in Town</small>
            <Col xs="1" />
          </Row>
          <Row>
            <Col xs="12">
              <div className="our_text  ms-3 mt-3 ">
                <b>we will deliver your food within 30 minutes in your</b>
                <br />
                <b>town ,if we would fail,we will give the food free.</b>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12" xs="4" sm="3" />
            <Col sm="8" md="10" xs="4">
              <Button
                className="order_button mt-5"
                onClick={() => {
                  getGuestUserApi();
                  showLocationPopup();
                }}
              >
                {" "}
                Order your Food{" "}
                <RiSearchLine className="SearchIconLanding ms-1 py-1" />
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/*---------------------------CARD DESIGN-------------------------------------*/}
      <Row className="ms-2 CardDesignLanding">
        <Col lg="1" md="1" sm="1" />
        <Col lg="10" md="10" sm="10" xs="12" className="card-body-change mt-5">
          <Card className="landingCard mt-5 mb-5">
            <Card.Body>
              <Card.Title className="landingCard_Title ms-5 mb-5 mt-4">
                <small>
                  Our Mobile App
                  <small>
                    <img src={Popcornimage} className="ms-3" alt="popcorn" />
                  </small>
                </small>
              </Card.Title>

              <Row className="">
                <Col lg="3" md="3" sm="3" xs="3">
                  <Card className="card_appstore mx-4 mt-2 ">
                    <Card.Body>
                      <Card.Title className="title_card ">
                        On App Store
                      </Card.Title>
                      <Card.Img
                        className="appstore_image mt-3"
                        src={appstore}
                      />
                      <Row>
                        <Col lg="12" className="RatingsCountLanding">
                          <Badge className="appstore_rating mt-3">
                            {" "}
                            <AiFillStar className="fillstart" />
                            <span>4.9</span>&nbsp;
                            <small className="ReviewCountlanding">
                              (5578 Reviews)
                            </small>{" "}
                          </Badge>
                        </Col>
                      </Row>

                      <Button className="download_button mt-3">Download</Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg="3" md="3" sm="3" xs="3">
                  <Card className="card_playstore mt-2" card_appstore>
                    <Card.Body>
                      <Card.Title className="title_card ">
                        On Play Store
                      </Card.Title>
                      <Card.Img
                        className="playstore_image mt-3 ms-5 mb-4"
                        src={playstore}
                      />
                      <Row>
                        <Col lg="12" className="RatingsCountLanding">
                          <Badge className="playstore_rating ">
                            {" "}
                            <AiFillStar className="fillstart" />{" "}
                            <span>4.8</span>&nbsp;
                            <small className="ReviewCountlanding">
                              (2536 Reviews)
                            </small>
                          </Badge>
                        </Col>
                      </Row>

                      <Button className="download_button mt-3 mb-3 ">
                        Download
                      </Button>
                    </Card.Body>
                  </Card>
                  <Col lg="3" md="3" sm="3" xs="3"></Col>
                  <Col lg="3" md="3" sm="3" xs="3">
                    <img className="mobile" src={mobile} alt="no ime"></img>
                  </Col>
                </Col>
                <Col lg="1" md="1" sm="1" xs="1" />
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Location
        showLocation={showLocation}
        LocationPopUp={LocationPopUp}
        resetForm={resetForm}
      />
      {/* <App/> */}
    </>
  );
}

export default Landingbody;
