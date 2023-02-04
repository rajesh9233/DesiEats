import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import imageitem from "../../../Asserts/RestaurentList/grocery.PNG";
import "./CartPopUp.css";
import { IoIosCloseCircle } from "react-icons/io";
import { checkoutDetailsPostApi } from "../../../services/CartCheckOutServices";
import {
  addressValuesSession,
  getName,
  getUserData,
  sessionLocationData,
} from "../../../constants/Utils";
import { useNavigate } from "react-router-dom";
function CartIconPopup(props) {
  const [checkOutDetails, setCheckOutDetails] = useState();

  let userName = getName() ? getName()[0] : null;
  let navigate = useNavigate();

  const checkoutPostDetailsValuesApi = async (data) => {
    let postcheckoutDetailsObjectValuesObject = {
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : null,
      order_type: "1",
      pickup_time: "1675258591",
      latitude: addressValuesSession()?.latitude,
      longitude: addressValuesSession()?.longitude,
      pin_address: sessionLocationData()?.pin_address,
      delivery_name: userName ? userName : null,
      delivery_email: getUserData()?.email,
      delivery_mobile: getUserData()?.mobile,
      unit_number: sessionLocationData()?.unit_number,
      street_address: sessionLocationData()?.street_address,
      postal_code: sessionLocationData()?.postal_code,
      date_timestamp: "1675258591",
    };

    try {
      let checkoutPostDetailsResponse = await checkoutDetailsPostApi(
        postcheckoutDetailsObjectValuesObject
      );
      setCheckOutDetails(checkoutPostDetailsResponse?.data?.data);
    } catch (e) {}
  };

  useEffect(() => {
    checkoutPostDetailsValuesApi();
  }, []);

  const handleClose = () => {
    props.closePopUp(false);
  };

  const handleViewCart = () => {
    navigate("/restaurants");
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} animation={true}>
        <div className="notification-header">
          <Modal.Title className="tittle">CART</Modal.Title>
          <Modal.Header closeButton></Modal.Header>
        </div>

        <Modal.Body>
          {checkOutDetails?.cart_products &&
            checkOutDetails?.cart_products.map((checkoutdataObj, index) => {
              return (
                <Card className="cartItem">
                  <div className="cart-container">
                    <div className="cart-img">
                      <img
                        className="itemImages"
                        width="113%"
                        height="53%"
                        src={checkoutdataObj.product_image}
                        alt="no"
                      ></img>
                    </div>

                    <div className="cart-item">
                      <BsCircleFill className="itemType px-1 py-1" />
                      <small className="itemText">
                        {checkoutdataObj.product_name}
                      </small>
                      <br />
                      <small className="itemDescription">
                        {checkoutdataObj.short_desc}
                      </small>
                      <br />
                      <p className="itemDescription">{checkoutdataObj.price}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          {!checkOutDetails?.cart_products ? (
            <Card className="cartItem no-data"> No Items found! </Card>
          ) : null}
          <Row>
            <Button className="cart-btn" onClick={() => handleViewCart()}>
              View Cart
            </Button>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartIconPopup;
