import React from "react";
import { Row, Col } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import Instagram from "../../Asserts/social_media_icons/instagram.png";
import facebook from "../../Asserts/social_media_icons/facebook.png";
import twitter from "../../Asserts/social_media_icons/twitter.png";
import desi from "../../Asserts/Frame 37 (1).png";
import PlayStore from "../../Asserts/social_media_icons/Google-play.png";
import AppStore from "../../Asserts/social_media_icons/apple-store.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../Footer/footer.css";
function Footer() {
  let navigate = useNavigate();
  const restaurantLocation = useLocation();

  const navigateHome = () => {
    if (restaurantLocation.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo(0, 0);
  };

  const handleAndroidAppNavigation = () => {
    let url =
      "https://play.google.com/store/apps/details?id=com.onedigital.desieats";
    window.open(url, "_blank").focus();
  };

  const handleIosAppNavigation = () => {
    let url = "https://apps.apple.com/in/app/desi-eats/id1626964947";
    window.open(url, "_blank").focus();
  };

  return (
    <>
      <Row className="footerSection mx-5 mt-5">
        <ScrollToTop className="one" smooth />
        <div className="footer-box">
          <div className="style5" />
          <div className="footer-container">
            <div className="footer-content">
              <img className="desi-img" src={desi} alt="kerala-eats"></img>
              <p className="desiEats_Description">
                Desi eats is specially catered to delivery Desi Food in
                island-wide Singapore. Are you a fan of authentic Desi spices?
                think no more Desi eats is here to satisfy your cravings.
              </p>
              <div>
                <img
                  src={facebook}
                  width="12%"
                  className="FaceBookFooter"
                  alt="Card img cap"
                ></img>
                <img
                  src={Instagram}
                  width="12%"
                  className="InstagramFooter"
                  alt="Card img cap"
                ></img>
                <img
                  src={twitter}
                  width="12%"
                  className="TwitterFooter"
                  alt="Card img cap"
                ></img>
              </div>
            </div>
            <div className="footer-content extra">
              <h3 className="useful ">Useful Links</h3>
              <div>
                <small
                  className="hometextinfooter"
                  onClick={() => navigateHome()}
                >
                  Home
                </small>
              </div>
              <div>
                <small className="hometextinfooter">About us</small>
              </div>
            </div>
            <div className="footer-content extra">
              <h3 className="useful">Product Help</h3>
              <div>
                <small className="hometextinfooter">Contact</small>
              </div>
            </div>
            <div className="footer-content extra">
              <h3 className="useful download-text">Download</h3>
              <div>
                <img
                  className="media_icon"
                  src={PlayStore}
                  alt="no pic"
                  onClick={() => handleAndroidAppNavigation()}
                ></img>
              </div>
              <div>
                <img
                  className="AppStoreIcon"
                  src={AppStore}
                  alt="no pic"
                  onClick={() => handleIosAppNavigation()}
                ></img>
              </div>
            </div>
          </div>
          <div class="style5" />
          <div>
            <p className="mt-4">&#169; Copyrights 2022 All Rights Reserved</p>
          </div>
        </div>
      </Row>
    </>
  );
}

export default Footer;
