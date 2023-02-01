import React from "react";
import { Row, Col } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import Instagram from "../../Asserts/social_media_icons/instagram.png";
import facebook from "../../Asserts/social_media_icons/facebook.png";
import twitter from "../../Asserts/social_media_icons/twitter.png";
import desi from "../../Asserts/Frame 37 (1).png";
import PlayStore from "../../Asserts/social_media_icons/Google-play.png";
import AppStore from "../../Asserts/social_media_icons/apple-store.png"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../Footer/footer.css";
function Footer() {
  let navigate = useNavigate();
  const restaurantLocation = useLocation()

const navigateHome=()=>{
  if(restaurantLocation.pathname!=="/"){
    navigate("/");

  }

}
  return (
    <>

      <Row className="footerSection mx-5 mt-5">
        <div className="top">
          <ScrollToTop className="one" smooth />
        </div>
        <Row>
          <Col lg="12" md="12" sm="12" className="mb-3 mt-3">
            <div className="style5" />
          </Col>
        </Row>

        <Row className="ms-2">
          <Col lg="4" md="4" sm="4">
            <img src={desi} alt="kerala-eats"></img>
            <p
              className="desiEats_Description mt-3 ms-2"
              style={{
                color: "black",
                textAlign: "justify",
                fontWeight: "700",
                fontSize:"1vw"
              }}
            >
              Desi eats is specially catered to delivery
              <br />
              Desi Food in island-wide Singapore. Are
              <br /> you a fan of authentic Desi spices? think
              <br /> no more Desi eats is here to satisfy your
              <br /> cravings.
            </p>
            <img
              src={facebook}
              width="12%"
              className="FaceBookFooter ms-3  mt-3"
              alt="Card img cap"
            ></img>
            <img
              src={Instagram}
              width="12%"
              className="InstagramFooter ms-5 mt-3"
              alt="Card img cap"
            ></img>
            <img
              src={twitter}
              width="12%"
              className="TwitterFooter ms-5 mt-3"
              alt="Card img cap"
            ></img>
          </Col>

          <Col lg="2" md="3" sm="3 " className="ms-4 mt-3">
            <h3 className="useful ">Useful Links</h3>
            <p className="mt-5 ">
              <small className="hometextinfooter" onClick={navigateHome}>Home</small>
            </p>
            <p className="mt-3 ">
              <small  className="hometextinfooter">About us</small>
            </p>
          </Col>
          <Col lg="3" md="3" sm="3" className="ms-4 mt-3">
            <h3 className="useful">Product Help</h3>
            <p className="mt-5">
              {" "}
              <small  className="hometextinfooter">Contact</small>
            </p>
          </Col>

          <Col lg="2" md="2" sm="2" className="DownloadOptions mt-3">
            <h3 className="useful ms-3">Download</h3>
            <img className="media_icon mt-4" src={PlayStore} alt="no pic"></img>
          
            <img className="AppStoreIcon ms-2" src={AppStore} alt="no pic"></img>

          </Col>
          

        </Row>

        <Row>
          <Col lg="12" md="12" sm="12" className="mt-3">
            <div class="style5" />
          </Col>
        </Row>

        <Row>
          <Col>
            <p className="mt-4">&#169; Copyrights 2022 All Rights Reserved</p>
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default Footer;
