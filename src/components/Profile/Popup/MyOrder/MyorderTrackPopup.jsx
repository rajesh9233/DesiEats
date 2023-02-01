import React, { useState,useEffect } from 'react';
import { Card, Form, FormCheck, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Col, Row } from "react-bootstrap";
import { BsCircleFill
} from "react-icons/bs";
import { trackOrdersApi } from '../../../../services/ProfilePageServices';
function MyorderTrackPopup(props) {
  const handleClose = () => {
    props.closePopUp(false);
  };

  const [trackOrders, setTrackOrders] = useState([]);

  useEffect(() => {
    const trackOrdersValuesApi = async () => {
      let posttrackOrdersObject = {
        order_id: "24926",
      };

      try {
        let trackOrdersResponse = await trackOrdersApi(
          posttrackOrdersObject
        );
        setTrackOrders(trackOrdersResponse.data.data);
        // console.log(trackOrders);
        // window.location.reload(true); //refresh the page
      } catch (e) {}
    };
    trackOrdersValuesApi();
  }, []);




  return (
    <>
       

  <Modal show={props.show} onHide={handleClose}>

    <Modal.Header className='TrackOrderPopupProfile'  closeButton>
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