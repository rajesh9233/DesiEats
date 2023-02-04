import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import desi from "../../../Asserts/Frame 37 (1).png";
import "./DesiEatsImage.css";


function DesiEatsImage() {
  let navigate = useNavigate();
  
  const restaurantLocation = useLocation();

  const navigateHome = () => {
    if (restaurantLocation.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <>
      <div className="logo-container">
        <img
          src={desi}
          className="DesiEatsImageLanding"
          alt="kerala-eats"
          onClick={navigateHome}
        ></img>
      </div>
    </>
  );
}

export default DesiEatsImage;
