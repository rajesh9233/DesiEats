import { React, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import DesiEatsImage from "../Items/DesiEatsImage";
import ToggleMenuButton from "../Items/ToggleMenuButton";
import Forms from "../Form/Forms";
import { getUserType } from "../../../constants/Utils";
import { getName } from "../../../constants/Utils";
import "./Landingheader.css";
import { landingFormsData } from "../../../constants/Utils";
import { sessionLocationData } from "../../../constants/Utils";
import { addressValuesSession } from "../../../constants/Utils";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import Location from "../Location/Location";

function LandingHeader({loginresponse,signupresponse,guestresponse}) {

  let navigate = useNavigate();
  const navigateToProfile=()=>{
    navigate("/profile")
  }

  let userName=getName()?getName()[0]:null;
  const [resetForm, setResetForm] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  
  const handleShowForms = () => {
    if(landingFormsData() === null || landingFormsData() === undefined){
      setShowForms(true);
    }else{
      let locationData=Object.keys(sessionLocationData())?.length;
      if(locationData == 0){
        setShowLocation(true);
      }else{
        if(landingFormsData().user_type === 2){
          if(sessionLocationData().pin_address === "" || sessionLocationData().postal_code === ""){
            setShowLocation(true);
          }else{
            navigateToProfile()
          }
        }else{
          if(sessionLocationData().pin_address === "" || sessionLocationData().street_address === "" ||
            sessionLocationData().postal_code === "" || sessionLocationData().unit_number === ""){
            setShowLocation(true);
          }else{
            navigateToProfile()
          }
        }
      }
    }
  };

  const closeFormsPopUp = (value) => {
    setShowForms(value);
  };

  const LocationPopUp = (value) => {
    setShowLocation(value);
  };

  return (
    <>
      {/*---------------------------Header content-------------------------------------*/}
      <section>
        <Row>
          <DesiEatsImage />
          <Col xl="4" lg="4" md="6" sm="6" xs="3" className="mt-1"></Col>
          <ToggleMenuButton />
          <Col lg="2" md="2" sm="2" xs="3">
            <Button className="sign mt-3" onClick={handleShowForms}>
              {/* {parentState
                ? parentState.data.data.user_type === 2
                  ? parentState.data.data.name
                  : null
                : "signup"}{" "} */}
              {/* <small className="landingHeaderButtonClass mx-1">{userName?firstName:null}</small> */}
              {/* <small>{getName}</small> */}
              <small>{userName?userName:userName===null?"Sign Up":null}</small>
             &nbsp; <BsArrowRight />
            </Button>
          </Col>
        </Row>
      </section>

      <Forms showForms={showForms} closeFormsPopUp={closeFormsPopUp} />
      <Location
        showLocation={showLocation}
        LocationPopUp={LocationPopUp}
        resetForm={resetForm}
      />
    </>
  );
}
// const mapStateToProps = state => {
//   return {

//     loginresponse:state.loginresponse,
//     signupresponse:state.signupresponse,
//     guestresponse:state.guestresponse,
//  }
// }
// connect (mapStateToProps)

export default LandingHeader;
