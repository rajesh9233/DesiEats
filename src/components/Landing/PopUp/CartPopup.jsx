import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import imageitem from "../../../Asserts/RestaurentList/grocery.PNG";
import "./CartPopUp.css";
import { IoIosCloseCircle } from "react-icons/io";
function CartIconPopup(props) {
  const handleClose = () => {
    props.closePopUp(false);
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={true}>
        <Row>
          <Col lg="5" />
          <Col lg="5" className="mt-3">
            <Modal.Title>CART</Modal.Title>
          </Col>
          <Col lg="1" className="mt-3">
            <Modal.Header closeButton></Modal.Header>
          </Col>
        </Row>

        <Modal.Body>
          <Card className="cartItem mx-4">
            <Row>
              <Col lg="2" className=" ms-3">
                <img className="itemImages mt-3"
                 width="113%"
                 height="53%"
                src={imageitem} alt="no" ></img>
              </Col>
              <Col lg="8" className="mt-3">
                <BsCircleFill className="itemType px-1 py-1" />
                <small className="itemText ms-3">Salad Set</small>
                <br />
                <small className=" itemDescription mt-2 ms-4">Served with choice</small>
                <br />
                <p className="ms-4 mt-1 mb-2" >$82.39</p>
              </Col>
              <Col lg="1">
                <IoIosCloseCircle className="closeButton"/>
              </Col>
            </Row>
          </Card>
          <Row>
            <Col lg="3" />
            <Col lg="3">
              <Button className="CartButton mt-5 mb-3">View Cart</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartIconPopup;
