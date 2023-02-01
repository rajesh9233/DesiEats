import { React, useState,useEffect } from "react";
import "./CartItems.css";
import * as yup from "yup";
import { useFormik } from "formik";

import itemimage from "../../../Asserts/RestaurentList/grocery.PNG";
import { Col, Row, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { cartValueApi,productAvailabilityCheckApi ,applyPromoCodeApi,checkoutDetailsPostApi,customizeItemsApi,emptyCartApi,checkoutDetailsApi} from "../../../services/CartCheckOutServices";
import NotificationPopup from "../../Landing/PopUp/NotificationPopup";
import CartItemPopupHeader from "./CartItemPopupHeader";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
function CartItems(props) {
  let navigate = useNavigate();
  const count = useSelector((state) => state.counter.countervalues);
  const dispatch = useDispatch();
// console.log(count)
  function handleClickProfile() {
    navigate("/payment");
  }
  const restaurantLocation = useLocation()
// console.log(restaurantLocation.pathname)
const[cartValue,setCartValue]=useState()
useEffect(()=>{
  const cartValueValuesApi = async (data) => {
    
  
    try {
      let cartValueResponse = await cartValueApi();
      setCartValue(cartValueResponse.data.data)
    } catch (e) {}
  };
  cartValueValuesApi()
},[])
const formik = useFormik({
  initialValues: {
    promocode: "",
  },
  validationSchema: yup.object({
    promocode: yup
      .string()
  }),
});
useEffect(()=>{
  const customizeItemsValuesApi = async (data) => {
    let postcustomizeItemsValuesValuesObject = {
      page: "0",
      limit: "10",
      product_id: "",
     
    };
  
    try {
      let customizeItemsApiResponse = await customizeItemsApi(
        postcustomizeItemsValuesValuesObject
      );
    } catch (e) {}
  };
  customizeItemsValuesApi()
},[])



const emptyCartApiValuesApi = async (data) => {
  try {
    let emptyCartApiResponse = await emptyCartApi( );
  } catch (e) {}
};
const latlangval = useSelector((state) => state.counter.latdatas);
// console.log(formik.values.promocode)
useEffect(()=>{
  const checkoutDetailsValuesApi = async (data) => {
    let checkoutDetailsObject = {
      restaurant_id: sessionStorage.getItem("restaurantData")?sessionStorage.getItem("restaurantData"):null,
      order_type: "1",
      pickup_time: "1648215000",
      latitude:latlangval?.lat,
      longitude:latlangval?.lng,
      pin_address:"",
      delivery_name:"",
      delivery_mobile:"",
      unit_number:"",
      street_address:"",
      postal_code:"",
      date_timestamp:""
    };
  
    try {
      let checkoutDetailsResponse = await checkoutDetailsPostApi(
        checkoutDetailsObject
      );
    } catch (e) {}
  };
  checkoutDetailsValuesApi()
},[])


//post Checkout Request

const checkoutPostDetailsValuesApi = async (data) => {
  let postcheckoutDetailsObjectValuesObject = {
    restaurant_id: sessionStorage.getItem("restaurantData")?sessionStorage.getItem("restaurantData"):null,
    order_type: "1",
    pickup_time: "1648215000",
    latitude:latlangval?.lat,
    longitude:latlangval?.lng,
    pin_address:"",
    delivery_name:"",
    delivery_mobile:"",
    unit_number:"",
    street_address:"",
    postal_code:"",
    date_timestamp:""
  };

  try {
    let checkoutPostDetailsResponse = await checkoutDetailsApi(
      postcheckoutDetailsObjectValuesObject
    );
  } catch (e) {}
};

//Apply PromoCode
//-----------------

const applyPromoCodeApiValuesApi = async (data) => {
  let applyPromoCodeValuesObject = {
    promo_code: "",
    restaurant_id:sessionStorage.getItem("restaurantData")?sessionStorage.getItem("restaurantData"):null,
    item_total: cartValue?.item_total,
    order_type:"1",
    pickup_time:"1648215000",
   
  };

  try {
    let applyPromoCodeResponse = await applyPromoCodeApi(
      applyPromoCodeValuesObject
    );
  } catch (e) {}
};

const productAvailabilityCheckValuesApi = async (data) => {
  let applyproductAvailabilityCheckObject = {
    restaurant_id:sessionStorage.getItem("restaurantData")?sessionStorage.getItem("restaurantData"):null,
    order_value: "233.33",
   
   
  };

  try {
    let productAvailabilityCheckResponse = await productAvailabilityCheckApi(
      applyproductAvailabilityCheckObject
    );
  } catch (e) {}
};




  return (
    <>
      <Card className="cartpopup_card">
        <Card.Body>
          <CartItemPopupHeader />
          <Row>
            <Col lg="12" className="ms-2">
              <small style={{ fontWeight: "500" }}>
                Consider using your own cutlery to reduce plastic use{" "}
              </small>
            </Col>
          </Row>
          <Row>
            <Col lg="2" />
            <Col lg="10"></Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="11">
              <p
                style={{ fontWeight: "700", fontSize: "110%" }}
                className="mt-3"
              >
                Your Order from the Soup Spoon
                <Row>
                  <Col lg="2" />
                  <Col lg="6">
                    <small className="ms-2">
                      {" "}
                      <small
                        className="ms-4 mt-2"
                        style={{ fontWeight: "700", fontSize: "120%" }}
                      >
                        (Raffles City)
                      </small>
                    </small>
                  </Col>
                </Row>
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="9" />
            <Col lg="3">
              <small onClick={emptyCartApiValuesApi}>Clear All</small>
            </Col>
          </Row>
          <Row>
            <Col lg="2" />

            {/*-------------------- ---------------Map Function*/}

            <>
              <Col lg="7" className="mb-3 mt-2">
                
                <h6 style={{ color: "orangered" }}>Sandwitch</h6>
                <small style={{ fontWeight: "600" }}>
                  Tangy Tomato with Basil
                </small>
                <br />
                <small style={{ fontWeight: "600" }}>$29.09</small>
              </Col>
              <Col lg="2" className="mb-3 mt-2">
                <img
                  className="popup_item_image"
                  src={itemimage}
                  width="100%"
                  height="100%"
                  alt="item one"
                ></img>
                <div className="item_count_ButtonPopup">
                  {props.count > 0 ? (
                    <Button className="item_count_ButtonPopup">
                      <small
                        style={{ fontSize: "100%" }}
                        className="decreament pb-1"
                        onClick={props.decrement}
                      >
                        -
                      </small>
                      <small>
                        <small
                          style={{ fontSize: "85%" }}
                          className="count_button"
                        >
                          {props.count}
                        </small>
                      </small>

                      <small
                        className="increament"
                        style={{ fontSize: "100%" }}
                        onClick={props.increment}
                      >
                        +
                      </small>
                    </Button>
                  ) : (
                    <Button className="count_button" onClick={props.increment}>
                      <small>Add</small>{" "}
                    </Button>
                  )}
                </div>
              </Col>
            </>
          </Row>
          <Row>
            <Col lg="2" />
            <Col lg="7">
              <b>Promo Code</b>
            </Col>
            <Row>
              <Col lg="2" />
              <Col lg="7" className="mt-1">
                <input
                  className="promocode"
                  placeholder=" Type Promo Code"
                  id="promocode"
                  maxLength="8"
                   name="promocode"
                    aria-label="Username" 
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("promocode")}
                ></input>
              </Col>
              <Col lg="3">
                <Button className="Apply_button pb-3 pt-1 py-2"
                onClick={()=>{applyPromoCodeApiValuesApi();}}
                >Apply</Button>
              </Col>
            </Row>

            <Row>
              <Col lg="1" />
              <Col lg="11">
                <hr className="horizontalLine" />
              </Col>
            </Row>
            <Row>
              <Col lg="1" />
              <Col lg="8" className="amount_details">
                <small>Subtotal</small>
                <br />
                <small>Delivery fee</small>
                <br />
                <small>platform fee</small>
                <br />
                <small>GST(7%)</small>
              </Col>
              <Col lg="3" className="amount_details">
                <small>$15.90</small>
                <br />
                <small>Free</small>
                <br />
                <small>$0.29</small>
                <br />
                <small>$0.01</small>{" "}
              </Col>
            </Row>
            <Row>
              <Col lg="1" />
              <Col lg="11">
                <hr className="horizontalLine" />
              </Col>
            </Row>
            <Row>
              <Col lg="1" />
              <Col lg="8">
                <p style={{ fontWeight: "600" }}>Total(Incl.GST) </p>
              </Col>
              <Col lg="3">
                <p style={{ fontWeight: "600" }}>${cartValue?.item_total}</p>
              </Col>
            </Row>
            <Row>
              <Col lg="1" />
              <Col lg="10" className="ms-4">
                {restaurantLocation.pathname==="/restaurant"?(<Button
                  className="checkout_button"
                  onClick={handleClickProfile}
                >
                  Go To CheckOut
                </Button>):null}
                
              </Col>
            </Row>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     count: state.count,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => {
//       dispatch(increment());
//     },
//     decrement: () => {
//       dispatch(decrement());
//     },
//   };
// };
// connect(mapStateToProps, mapDispatchToProps)
export default CartItems;
