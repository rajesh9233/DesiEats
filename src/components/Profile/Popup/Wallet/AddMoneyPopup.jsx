import React, { useState } from 'react';
import { Card, Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  Col, Row } from "react-bootstrap";
import PaymentPopup from './PaymentPopup'
function AddMoneyPopup(props) {
    
  const handleClose = () => {
    props.closePopUp(false);
  };


  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const closePopUp = (value) => {
    setShow(value);
  };


  return (
    <>
        

  <Modal show={props.show} onHide={handleClose}>

    <Modal.Header  closeButton>
    </Modal.Header>
    
    <Modal.Body>
        <Row>
        <Col lg="4"/>
<Col lg="6">
    <b>Add Money</b>
</Col>
        </Row>
        <Row>
            <Col lg="1"/>
            <Col lg="10" className='mt-3 mb-5'>
                <b>Amount</b> <br/>
                <br/> 
                <FormControl placeholder='Enter Amount'></FormControl>
            </Col>
        </Row>
<Row>
    <Col lg='3'/>
    <Col lg='5'>
        <Button onClick={handleShow}> Proceed To Pay</Button>
    </Col>

</Row>
    </Modal.Body>
    
  </Modal>
  <PaymentPopup show={show} closePopUp={closePopUp} />

    </>
  )
}

export default AddMoneyPopup