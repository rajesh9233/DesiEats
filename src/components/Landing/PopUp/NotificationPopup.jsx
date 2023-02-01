import {React,useState,useEffect} from "react";
import { Card } from "react-bootstrap";
import { listAllNotificationApi } from "../../../services/Landingservice";
import { Modal, Col, Row } from "react-bootstrap";
import imageiem from "../../../Asserts/RestaurentList/grocery.PNG";
import "./NotificationPopup.css";
function CartIconPopup({show,closePopUp,notifications}) {
  const handleClose = () => {
    closePopUp(false);
  };
  

// console.log(notifications)




  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Row>
          <Col lg="3" />
          <Col lg="7">
            <Modal.Title className="Title mt-4">NOTIFICATION</Modal.Title>
          </Col>
          <Col lg="1">
            <Modal.Header className="mt-3" closeButton></Modal.Header>
          </Col>
        </Row>
        <Modal.Body>
          <Card className="Itemcard mx-4">


            <Row>
            {notifications?.map((item, index) => (

              <>

<Col lg="3" className=" mt-2 ms-3">
  <img
  className="itemImage"
    src={item.image_url}
    alt="no data"
    width="80%"
    height="80%"
  ></img>
</Col>
<Col lg="8" className=" mt-3 mb-1">
  <small className="payment mt-3 mb-1">{item.title}</small>
  <br />
  <p className="mt-2">Your order is placed by desi eats</p>
</Col>
              </>
           
                          ))}

            </Row>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartIconPopup;
