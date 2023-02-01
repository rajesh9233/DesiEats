import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Col, Row } from "react-bootstrap";
import { BsCircleFill
} from "react-icons/bs";
import imageiem from'../../../Asserts/RestaurentList/grocery.PNG'

import { IoIosCloseCircle } from "react-icons/io";
function CartIconPopup(props) {

  const handleClose = () => {
    props.closePopUp(false);
  };
 
  return (
    <>
      

      <Modal  show={props.show} onHide={handleClose} animation={true}>
   
        <Modal.Header  closeButton>
        </Modal.Header>
        
        <Modal.Body>
        <Form.Control className='mt-3' placeholder='would You like to eat'></Form.Control>


        </Modal.Body>
        
      </Modal>
    



    </>
  )
}

export default CartIconPopup