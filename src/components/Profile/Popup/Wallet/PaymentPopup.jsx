import React, { useState } from 'react';
import { Card, Form, FormCheck, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Col, Row } from "react-bootstrap";
import { BsCircleFill
} from "react-icons/bs";
function PaymentPopup(props) {
   
  const handleClose = () => {
    props.closePopUp(false);
  };

  return (
    <>
      
  <Modal show={props.show} onHide={handleClose}>

    <Modal.Header  closeButton>
    </Modal.Header>
    
    <Modal.Body>
      <Row>
        <Col lg="4"/>
        <Col lg="5">
          <b>Add Money</b>
        </Col>
      </Row>
      <Row>
        <Col lg="1"/>
        <Col lg="7">
          <b>$12.00</b><br/>
          <p>Add Money to John Deo</p>
        </Col>
      </Row>
      <Row>
        <Col lg="1"/>
        <Col lg="7">
          <b>Payment Methods</b>
        </Col>
      </Row>
      <Row>
        <Col lg="1"/>
        <Col lg="7">
        <FormCheck></FormCheck><b>Credit/Debit Card Details</b>
        <FormCheck></FormCheck><b>PayNow</b>

        </Col>
      </Row>
      <Row>
        <Col lg="4"/>
        <Col lg="3">
          <Button >Add $717</Button> <br/>
          <small>Back</small>
        </Col>
      </Row>
    </Modal.Body>
    
  </Modal>
    </>
  )
}

export default PaymentPopup