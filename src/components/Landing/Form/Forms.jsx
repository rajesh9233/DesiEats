import { React, useState } from "react";
import { Container, Col, Row, Button, Modal} from "react-bootstrap";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Location from "../Location/Location";
import "./Form.css";
const Forms = ({closeFormsPopUp,showResponse,showForms,loginResposeFunctionValues}) => {
  // Modal close
  const handleCloseFormsPopUp = () => {
    closeFormsPopUp(false);
  };

  
  const [showLocation, setShowLocation] = useState(false);
const handleOpenLocation=(value)=>{
  setShowLocation(value)
}
const loginResposeFunction=(loginData)=>{
  //loginResposeFunctionValues(loginData)
//  console.log(loginData) 
}
const LocationPopUp = (value) => {
  setShowLocation(value);
};
  //LOGIN form condition
  
  const [isShowLogin, setShowForm] = useState(true);
  const toggleForm = (type) => {
    let toggleData = type === "login" ? true : false;
    setShowForm(toggleData);
  };
  //-------------------------------------------------------------
  //Login or SignUp which button is clicked
const [activeButton,SetActiveButton]=useState("1")
const handleClicked = (value) => {
  SetActiveButton(value)
  }
  // console.log(activeButton)
  return (
    <>
      <Modal show={showForms} onHide={handleCloseFormsPopUp} animation={true}>
          <Row>
           <Col lg="2"/>
           <Col lg="8" className="mt-4 mb-2">
           <Modal.Title className="Account">
            <span>ACCOUNT</span>
          </Modal.Title>
            </Col> 
            <Col lg="1">
            <Modal.Header className="FormsPopupHeader" closeButton/>
            </Col>
          </Row>
         
        <Modal.Body>
            <Row>
            <Col lg="1"/>

              <Col lg="5" md="5" sm="5" >
                <Button
                 className={activeButton==="1" ?  "login_button Activebutton mb-4":"login_button   mb-4"}
                 onClick={() => {toggleForm("login");handleClicked("1");}}
                >
                  Have an Account? <br />
                  LOG IN
                </Button>
              </Col>
              <Col lg="5" md="5" sm="5">
                <Button
                 className={activeButton==="2"? "login_button1 Activebutton mb-4":"login_button1   mb-4"}
                  onClick={() =>{ toggleForm("signup");handleClicked("2");}}
                >
                  New to Desi eats? SIGN UP
                </Button>
              </Col>
              <Col lg="1"/>

            </Row>
            {isShowLogin ? ( <Login  loginResposeFunction={loginResposeFunction}
             handleCloseFormsPopUp={handleCloseFormsPopUp} loginResposeFunctionValues={loginResposeFunctionValues}
             handleOpenLocation={handleOpenLocation}
             />) :
            
            (<Signup  handleCloseFormsPopUp={handleCloseFormsPopUp}
            handleOpenLocation={handleOpenLocation}/>)}
        </Modal.Body>
      </Modal>
     <Location  showLocation={showLocation} LocationPopUp={LocationPopUp}/> 
      
        {/*
      //LocationPopUp={LocationPopUp}/> */}
    </>
  );
};

export default Forms;
