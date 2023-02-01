import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./OrderDonePopup.css"
function OrderDonePopup(props) {
  const handleClose = () => {
    props.closePopUp(false);
  };
  let navigate = useNavigate();

  function handleClickprofile() {

    navigate("/profile");
  }
  return (
    <>
      

      <Modal show={props.show} onHide={handleClose}>
   
        <Modal.Header className='OrderDonePopUpHeader' closeButton>
        </Modal.Header>
        
        <Modal.Body>
            <Row>
            <Col lg="2"/>
<Col lg="9">
    <p className='OrderPlacedText'>Order Placed Successfully</p>
    <p className='mt-4 mb-5'>Order No. #DE23516 Successfully Placed</p><br/>
    <Button  onClick={handleClickprofile}>Okay</Button>
</Col>
            </Row>


        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default OrderDonePopup