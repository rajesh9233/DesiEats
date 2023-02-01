import React, { useState } from 'react';
import { Card, Form, FormCheck, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Col, Row } from "react-bootstrap";
import { BsCircleFill
} from "react-icons/bs";
function MyorderTrackPopup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Button variant="primary" onClick={handleShow}>
    Launch demo modal
  </Button>

  <Modal show={show} onHide={handleClose}>

    <Modal.Header  closeButton>
    </Modal.Header>
    
    <Modal.Body>
      <Row>
        <Col lg="4"/>
        <Col lg="4">
          <b>Logout</b>
        </Col>
      </Row>
<Row>
  <Col lg="3"/>
<Col lg="8">
  <b>Are You Sure?Do You Want LogOut</b>
</Col>
</Row>
<Row>
  <Col lg="3"/>
  <Col lg="3">
    <Button>Cancel</Button>
  </Col>
  <Col lg="3">
    <Button>ok</Button>
  </Col>
</Row>
    </Modal.Body>
    
  </Modal>
    </>
  )
}

export default MyorderTrackPopup