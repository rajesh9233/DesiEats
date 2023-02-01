import React, { useEffect, useState } from "react";
import { Col, Row, Button, Card, Form, Modal, Badge } from "react-bootstrap";
import OrderPlacedImage from "./../../../../../Asserts/TrackOrder/order-placed@2x.png";
import "./OrderTrackPopUp.css";
import { viewMoreOrderDetailApi } from "../../../../../services/ProfilePageServices";
import CartBag from "../../../../../Asserts/TrackOrder/order-confirmed@2x.png";
import OrderPreparing from "../../../../../Asserts/TrackOrder/order-preparing@2x.png";
import RiderAssigned from "../../../../../Asserts/TrackOrder/rider-assigning-1@2x.png";
import OrderReady from "../../../../../Asserts/TrackOrder/order-ready-1@2x.png";
import OrderDispatched from "../../../../../Asserts/TrackOrder/order-dispatched@2x.png";
import OrderDelivered from "../../../../../Asserts/TrackOrder/order-delivered@2x.png";
import ChatOption from "../../../../../Asserts/ProfilePage/chatIcon.png";
import RoundFilled from "../../../../../Asserts/TrackOrder/RoundFilled.svg";
import RoundNotFilled from "../../../../../Asserts/TrackOrder/RoundHide.svg";

function OrderTrackPopUp(props) {
  const handleClose = () => {
    props.closePopUp(false);
  };

  const[viewMoreOrder,setViewMoreOrder] = useState();

  useEffect(()=>{
    const viewMoreOrderDetailValuesApi = async () => {
      let postviewMoreOrderDetailObj = {
        order_id:""
      };

      try {
        let viewMoreOrderDetailApidataResponse = await viewMoreOrderDetailApi(postviewMoreOrderDetailObj);
        setViewMoreOrder(viewMoreOrderDetailApidataResponse.data)
      } catch (e) {}
    };
    viewMoreOrderDetailValuesApi()
  },[])

  // console.log(viewMoreOrder)
  return (
    <>
      <Modal
        className="track_modalTrack .modal-dialog modal-xl mx-2"
        show={props.show}
        onHide={handleClose}
      >
        <Row>
          <Modal.Header className="ModalHeaderTrackPopup" closeButton>
            <Col lg="12">
              <p className="Track_Order_Title mt-4">TRACK ORDER</p>
            </Col>
          </Modal.Header>
        </Row>

        <Row>
          <Col lg="12">
            <p className="track_order_title">The Soup Spoon (Bugis Junction)</p>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            {/* -----------------------Order Placed ----------------------------------*/}
            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_Placed ms-3"
                  src={OrderPlacedImage}
                  alt="order Placed"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Placed_Text">Order Placed</small>
                <br />
                <small className="order_placed_date">08.24 AM,sept 2022</small>
              </Col>
            </Row>
            
            {/* -----------------------Order Confirmed ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_Confirmed ms-3"
                  src={CartBag}
                  alt="Order Confirmed"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Confirmed_Text">Order Confirmed</small>
                <br />
                <small className="order_Confirmed_date">
                  08.26 AM,sept 2022
                </small>
              </Col>
            </Row>
            {/* -----------------------Order Preparing ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_Preparing ms-3"
                  src={OrderPreparing}
                  alt="Order Preparing"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Preparing_Text">Order Preparing</small>
                <br />
                <small className="order_Preparing_date">
                  08.28 AM,sept 2022
                </small>
              </Col>
            </Row>
            {/* -----------------------Rider Assigning ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_Assigning ms-3"
                  src={RiderAssigned}
                  alt="Order Assigning"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Assigning_Text">Rider Assigning</small>
                <br />
                <small className="order_Assigning_date">
                  08.33 AM,sept 2022
                </small>
              </Col>
            </Row>
            {/* -----------------------Rider Assigned ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_Assigned ms-3"
                  src={RiderAssigned}
                  alt="Order Assigned"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Assigned_Text">Rider Assigned</small>
                <br />
                <small className="order_Assigned_date">
                  08.36 AM,sept 2022
                </small>
              </Col>
            </Row>
            {/* -----------------------Order is Ready ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_is_Ready ms-3"
                  src={OrderReady}
                  alt="Order is Ready"
                />
              </Col>
              <Col lg="6">
                <small className="Order_is_Ready_Text">Order is Ready</small>
                <br />
                <small className="order_is_Ready_date">
                  08.40 AM,sept 2022
                </small>
              </Col>
            </Row>
            {/* -----------------------Order dispatched ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
                <div className="OrderStatusCompleted mt-1"></div>

              </Col>
              <Col lg="3">
                <img
                  className="order_Dispatched ms-3"
                  src={OrderDispatched}
                  alt="Order Dispatched"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Dispatched_Text">
                  Order Dispatched
                </small>
                <br />
                <small className="order_Dispatched_date">
                  08.43 AM,sept 2022
                </small>
                <Row>
                  <Col lg="12"  style={{textAlign:"center"}}>
                    <u style={{color:"#FF6838",fontWeight:"600"}}><small></small>Track</u>
                  </Col>
                </Row>
              </Col>

            </Row>

            {/* -----------------------Order Delivered ----------------------------------*/}

            <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                <img src={RoundFilled} alt="status done" />
              
              </Col>
              <Col lg="3">
                <img
                  className="order_Delivered ms-3"
                  src={OrderDelivered}
                  alt="Order Delivered"
                />
              </Col>
              <Col lg="6">
                <small className="Order_Delivered_Text">Order Delivered</small>
                <br />
                <small className="order_Delivered_date">
                  08.50 AM,sept 2022
                </small>
              </Col>
            </Row>
          </Col>
          <Col lg="7" className="ms-5">
            <Row>
              <Col lg="5">
                <small className="OrderNumberTrackOrder">#DE81267</small>
                <br />
                <div className="mt-4 DatainTrackOrder">
                  <p>Name:</p>
                  <p>Delivery Address:</p>
                  <p>Order Date & Time:</p>
                  <p>Schedule Date of Time:</p>
                  <p>Special Instruction:</p>
                </div>
              </Col>

              <Col lg="7">
                <img
                  src={ChatOption}
                  alt="chat Icon"
                  className="chatTrackOrder"
                />
                <u>
                  <small className=" ms-3 ChatOptionTrack">Chat</small>
                </u>
                <br />
                <div className="mt-4 DatainTrackOrderDetails">
                  <p>John Doe</p>
                  <p>68,ricchard street</p>
                  <p>Sep 22,2022 at 8 pm</p>
                  <p>Sep 22,2022 at 10 pm</p>
                  <p>None</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <Badge className="OrderItemTrackPopup mb-3">
                  <Row className="mt-1 mb-1">
                    <Col lg="1" />
                    <Col lg="3">
                      <small className="QuantityTrackPopup ">Quantity</small>
                    </Col>
                    <Col lg="4">
                      <small className="ItemTrackPopup">Item</small>
                    </Col>
                    <Col lg="3">
                      <small className="PriceTrackPopup">Price</small>
                    </Col>
                    <Col lg="1" />
                  </Row>
                </Badge>
                <Row>
                  <Col lg="1" />
                  <Col lg="3">
                    <p className="itemNameTrackorder">1</p>
                  </Col>
                  <Col lg="4">
                    <small className="itemNameTrackorder">
                      Chicken Biriyani
                    </small>
                  </Col>
                  <Col lg="4">
                    <p className="itemNameTrackorder">$ 21.32</p>
                  </Col>

                  <Col lg="1" />
                </Row>
                <Row>
                  <Col lg="4" />
                  <Col lg="4">
                    <div className="TotalAmountTrackOrder mt-4">
                      <small>Item Total:</small>
                    </div>

                    <br />
                    <small className="TotalDeliveryChargesTrack">Delivery Charges:</small>

                    <br />
                    <div className="mt-2">
                      <small className="OrderTotalValueTrack">Order Total:</small>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="mt-4  itemvaluestrackorder">
                      <small>$ 24.00</small>
                    </div>
                    <br />
                    <small className=" itemvaluestrackorderMoney"> $ 15.00</small>

                    <br />
                    <div className="mt-2">
                      <small className="TotalMoneyValueTrack">$ 39.00</small>
                    </div>

                    <br />
                  </Col>
                  <Col lg="1" />
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default OrderTrackPopUp;
