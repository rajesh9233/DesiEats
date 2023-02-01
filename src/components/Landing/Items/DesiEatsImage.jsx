import React from 'react'
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import desi from "../../../Asserts/Frame 37 (1).png";
import './DesiEatsImage.css'
function DesiEatsImage() {
  let navigate = useNavigate();
  const restaurantLocation = useLocation()

const navigateHome=()=>{
  if(restaurantLocation.pathname!=="/"){
    navigate("/");

  }

}

  return (
    <>
     <Col lg='2' md='4' sm='4' xs="2" className=' mb-2  mt-1 mx-5'>
      <img src={desi} className="DesiEatsImageLanding" alt="kerala-eats" onClick={navigateHome}></img>
            </Col>
    </>
  )
}

export default DesiEatsImage