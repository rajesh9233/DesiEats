import React, { useEffect, useState } from "react";
import { Col, Row, Button, Card, Form, Modal, Badge } from "react-bootstrap";
import OrderPlacedImage from "./../../../../../Asserts/TrackOrder/order-placed@2x.png";
import "./OrderTrackPopUp.css";
import {
  viewMoreOrderDetailApi,
  trackOrdersApi,
} from "../../../../../services/ProfilePageServices";
import CartBag from "../../../../../Asserts/TrackOrder/order-confirmed@2x.png";
import OrderPreparing from "../../../../../Asserts/TrackOrder/order-preparing@2x.png";
import RiderAssigned from "../../../../../Asserts/TrackOrder/rider-assigning-1@2x.png";
import OrderReady from "../../../../../Asserts/TrackOrder/order-ready-1@2x.png";
import OrderDispatched from "../../../../../Asserts/TrackOrder/order-dispatched@2x.png";
import OrderDelivered from "../../../../../Asserts/TrackOrder/order-delivered@2x.png";
import ChatOption from "../../../../../Asserts/ProfilePage/chatIcon.png";
import RoundFilled from "../../../../../Asserts/TrackOrder/RoundFilled.svg";
import RoundNotFilled from "../../../../../Asserts/TrackOrder/RoundHide.svg";

function OrderTrackPopUp({viewMoreOrder,trackOrderDetail,closePopUp,show}) {
  const handleClose = () => {
    closePopUp(false);
  };


  const viewMoreOrderDetails = viewMoreOrder?.order;
  console.log(viewMoreOrderDetails);
  const productListData = viewMoreOrder?.product_detail;

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  const trackDetails=trackOrderDetail?.tracker_info
  console.log(viewMoreOrderDetails?.rest_name)
  return (
    <>
      <Modal
        className="track_modalTrack .modal-dialog modal-xl mx-2"
        show={show}
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
            <p className="track_order_title">{viewMoreOrderDetails?.rest_name}</p>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            {/* -----------------------Order Placed ----------------------------------*/}
            {trackDetails?.map((item,index)=>(
    <Row className="mb-4">
              <Col lg="2" />
              <Col lg="1">
                { item.active_status===2||item.active_status===1?
                <img src={RoundFilled} alt="status done" />:null
               }
{ item.active_status===0?
                <img src={RoundNotFilled} alt="status done" />:null
               }
{ item.active_status===1?

<div className="OrderStatusCompleted mt-1"></div>:null}
              </Col>
              <Col lg="3">
                <img
                  className="order_Placed ms-3"
                  src={item.image_url}
                  alt={item.tracker_label}
                />
              </Col>
              <Col lg="6">
                <small className="Order_Placed_Text">{item.tracker_label}</small>
                <br />
                <small className="order_placed_date">{item.tracker_text}</small>
                { item.track_link!==""&&item.active_status===2?
                (<Row>
                  <Col lg="12" style={{ textAlign: "center" }}>
                    <u style={{ color: "#FF6838", fontWeight: "600" }}>
                      <small
                              onClick={() => openInNewTab(item.track_link)}

                      >Track</small>
                    </u>
                  </Col>
                </Row>):null
}
              </Col>
            </Row>
            ))}
        

            {/* -----------------------Order Confirmed ----------------------------------*/}

            {/* <Row className="mb-4">
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
            </Row> */}
            {/* -----------------------Order Preparing ----------------------------------*/}

            {/* <Row className="mb-4">
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
            </Row> */}
            {/* -----------------------Rider Assigning ----------------------------------*/}
{/* 
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
            </Row> */}
            {/* -----------------------Rider Assigned ----------------------------------*/}

            {/* <Row className="mb-4">
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
            </Row> */}
            {/* -----------------------Order is Ready ----------------------------------*/}

            {/* <Row className="mb-4">
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
            </Row> */}
            {/* -----------------------Order dispatched ----------------------------------*/}
{/* 
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
                  <Col lg="12" style={{ textAlign: "center" }}>
                    <u style={{ color: "#FF6838", fontWeight: "600" }}>
                      <small
                              onClick={() => openInNewTab(viewMoreOrderDetails?.track_link)}

                      >Track</small>
                    </u>
                  </Col>
                </Row>
              </Col>
            </Row> */}

            {/* -----------------------Order Delivered ----------------------------------*/}

            {/* <Row className="mb-4">
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
            </Row> */}
          </Col>
          <Col lg="7" className="ms-5">
            <Row>
              <Col lg="5">
                <small className="OrderNumberTrackOrder">
                  {viewMoreOrderDetails?.order_number}
                </small>
                <br />
                <div className="mt-4 DatainTrackOrder">
                  <p>Name:</p>
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
                  <p>{viewMoreOrderDetails?.delivery_name}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="5" >
                <p>{viewMoreOrderDetails?.address_label}:</p>
              </Col>
              <Col lg="7" className="DatainTrackOrderDetails mt-1 mb-1">
                <p>{viewMoreOrderDetails?.delivery_address}</p>
              </Col>
            </Row>
            <Row>
              <Col lg="5" className="DatainTrackOrder mt-1 mb-1">
                <p>Order Date & Time:</p>
                <p>Schedule Date of Time:</p>

                <p>Special Instruction:</p>
              </Col>
              <Col lg="7" className="DatainTrackOrderDetails mt-1 mb-1">
                <p>{viewMoreOrderDetails?.order_time}</p>
                <p>{viewMoreOrderDetails?.schedule_time}</p>
                <p>{viewMoreOrderDetails?.remark}</p>
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
                {productListData?.map((item,index)=>(
                <Row>
                  <Col lg="1" />
                  <Col lg="3">
                    <p className="itemNameTrackorder">{item.product_quantity}</p>
                  </Col>
                  <Col lg="4">
                    <small className="itemNameTrackorder">
                    {item.product_name}                    </small>
                  </Col>
                  <Col lg="4">
                    <p className="itemNameTrackorder">{item.product_total_price}</p>
                  </Col>

                  <Col lg="1" />
                </Row>
                                ))}

                <Row>
                  <Col lg="4" />
                  <Col lg="4">
                    <div className="TotalAmountTrackOrder mt-4">
                      <small>Item Total:</small>
                    </div>

                    <br />
                    <small className="TotalDeliveryChargesTrack">
                      Delivery Charges:
                    </small>

                    <br />
                    <div className="mt-2">
                      <small className="OrderTotalValueTrack">
                        Order Total:
                      </small>
                    </div>
                  </Col>
                  <Col lg="3">
                    <div className="mt-4  itemvaluestrackorder">
                      <small>$ {viewMoreOrderDetails?.sub_total}</small>
                    </div>
                    <br />
                    <small className=" itemvaluestrackorderMoney">
                      {" "}
                      $ {viewMoreOrderDetails?.dc_amount}
                    </small>

                    <br />
                    <div className="mt-2">
                      <small className="TotalMoneyValueTrack">$ {viewMoreOrderDetails?.grand_total}</small>
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
