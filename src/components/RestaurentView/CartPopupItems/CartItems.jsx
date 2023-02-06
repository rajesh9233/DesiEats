import { React, useState, useEffect } from "react";
import "./CartItems.css";
import * as yup from "yup";
import { useFormik } from "formik";

import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  cartValueApi,
  applyPromoCodeApi,
  customizeItemsApi,
  emptyCartApi,
  addRemoveProductCartApi,
} from "../../../services/CartCheckOutServices";
import CartItemPopupHeader from "./CartItemPopupHeader";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { cartQuantityChangeViceVersa } from "../../../containers/app/features/CounterSlice";

function CartItems({ globalCheckoutDetails, globalCheckoutCallback }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurantLocation = useLocation();

  const [cartValue, setCartValue] = useState();
  const [stateValue, setStateValue] = useState(0);
  const [promocodeMessage, setPromoCodeMessage] = useState();

  function handleClickProfile() {
    navigate("/payment");
  }

  const cartValueValuesApi = async (data) => {
    try {
      let cartValueResponse = await cartValueApi();
      setCartValue(cartValueResponse.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    cartValueValuesApi();
  }, []);

  useEffect(() => {
    cartValueValuesApi();
  }, [globalCheckoutDetails]);

  const formik = useFormik({
    initialValues: {
      promocode: "",
    },
    validationSchema: yup.object({
      promocode: yup.string(),
    }),
  });

  useEffect(() => {
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
    customizeItemsValuesApi();
  }, []);

  useEffect(() => {
    dispatch(cartQuantityChangeViceVersa(stateValue));
  }, [stateValue]);

  const addRemoveProductCartApiValuesApi = async (data) => {
    let postpostProductListingValuesObjectValuesObject = {
      product_id: data?.product_id,
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : null,
      is_variant_selected: "2",
      prod_quantity: parseInt(data.product_quantity),
    };

    try {
      let addRemoveProductCartApiValuesApiValuesResponse =
        await addRemoveProductCartApi(
          postpostProductListingValuesObjectValuesObject
        );
      if (
        addRemoveProductCartApiValuesApiValuesResponse?.data?.status === 200
      ) {
        setStateValue((f) => f + 1);
        cartValueValuesApi();
        globalCheckoutCallback();
      }
    } catch (e) {}
  };

  const emptyCartApiValuesApi = async () => {
    try {
      let emptyCartApiResponse = await emptyCartApi();
      if (emptyCartApiResponse) {
        setStateValue((f) => f + 1);
        globalCheckoutCallback();
      }
    } catch (e) {}
  };

  const handleIncrement = (obj) => {
    obj.product_quantity = parseInt(obj.product_quantity) + 1;
    addRemoveProductCartApiValuesApi(obj);
  };

  const handleDecrement = (obj) => {
    obj.product_quantity = parseInt(obj.product_quantity) - 1;
    addRemoveProductCartApiValuesApi(obj);
  };

  //Apply PromoCode
  //-----------------

  const applyPromoCodeApiValuesApi = async (data) => {
    let applyPromoCodeValuesObject = {
      promo_code: formik.values.promocode,
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : null,
      item_total: cartValue?.item_total,
      order_type: "1",
      pickup_time: "1648215000",
    };

    try {
      let applyPromoCodeResponse = await applyPromoCodeApi(
        applyPromoCodeValuesObject
      );
      if (applyPromoCodeResponse?.data?.status === 201) {
        setPromoCodeMessage(applyPromoCodeResponse.data.message);
      } else {
        setPromoCodeMessage("");
      }
    } catch (e) {}
  };

  return (
    <>
      <Card className="cartpopup_card">
        <Card.Body>
          <CartItemPopupHeader />
          <div className="cutlery-content">
            <small style={{ fontWeight: "500" }}>
              Consider using your own cutlery to reduce plastic use
            </small>
          </div>
          <div className="order-text">
            {globalCheckoutDetails?.restaurant_detail?.rest_name ? (
              <p>
                <b>
                  {`Your Order from the ${globalCheckoutDetails?.restaurant_detail?.rest_name}`}
                </b>
              </p>
            ) : null}
            {globalCheckoutDetails?.restaurant_detail?.rest_pin_address ? (
              <p>
                <b>{`(${globalCheckoutDetails?.restaurant_detail?.rest_pin_address})`}</b>
              </p>
            ) : null}
          </div>
          <div className="clear-all">
            <small onClick={emptyCartApiValuesApi}>Clear All</small>
          </div>

          <div className="cart-scroll-container">
            {globalCheckoutDetails?.cart_products &&
              globalCheckoutDetails?.cart_products.map(
                (checkoutdataObj, index) => {
                  return (
                    <div className="item-card">
                      <div className="image-cart-div">
                        <small
                          className="foodTitle"
                          style={{ fontWeight: "600", fontSize: "110%" }}
                        >
                          {checkoutdataObj.product_name}
                        </small>
                        <p className="itemDescription">
                          {checkoutdataObj.product_description}
                        </p>
                        <p className="price"> ${checkoutdataObj.price}</p>
                      </div>
                      <div className="button-cart-div">
                        <div>
                          <img
                            src={checkoutdataObj.product_image}
                            alt="item content"
                            className="itemImage"
                          ></img>
                        </div>
                        <div className="add-btn">
                          <Button id={index}>
                            <div
                              className="in-de-btn"
                              onClick={() => handleDecrement(checkoutdataObj)}
                            >
                              -
                            </div>
                            <div className="count">
                              {checkoutdataObj.product_quantity}
                            </div>
                            <div
                              className="in-de-btn"
                              onClick={() => {
                                handleIncrement(checkoutdataObj);
                              }}
                            >
                              +
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
          <div className="cont-promo">
            <b>Promo Code</b>
            <div className="promo-container">
              <div className="input-promo">
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
                <p className="error-msg">{promocodeMessage}</p>
              </div>
              <div className="btn-promo">
                <Button
                  className="Apply_button"
                  onClick={() => {
                    applyPromoCodeApiValuesApi();
                  }}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
          <hr className="horizontalLine" />
          <div className="total-container">
            <div>
              <small className="amount_details">Subtotal</small>
            </div>
            <div>
              <small className="amount_details">${cartValue?.item_total}</small>
            </div>
            <div>
              <small className="amount_details">Delivery fee</small>
            </div>
            <div>
              <small className="amount_details">Free</small>
            </div>
          </div>
          <hr className="horizontalLine" />
          <div className="total-container">
            <div>
              <p style={{ fontWeight: "600" }}>Total </p>
            </div>
            <div>
              <p style={{ fontWeight: "600" }}>${cartValue?.item_total}</p>
            </div>
          </div>
          <div>
            {restaurantLocation.pathname === "/restaurants" ? (
              <Button className="checkout_button" onClick={handleClickProfile}>
                Go To CheckOut
              </Button>
            ) : null}
          </div>
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
