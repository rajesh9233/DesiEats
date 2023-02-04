import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Col, Row, Button } from "react-bootstrap";
import { FaCircle } from "react-icons/fa";
import FoodImage from "../../../../Asserts/banners/image1.jpg";
import { ProductListing } from "../../../../constants/HomePageResponse";
// import { increment, decrement } from "../../Redux/Actions/counterActions";
// import { connect } from "react-redux";
import {
  addRemoveProductCartApi,
  manageProductCheckoutApi,
  addRemoveVariantCartApi,
  checkoutDetailsPostApi,
} from "../../../../services/CartCheckOutServices";
import { useSelector, useDispatch } from "react-redux";
import {
  cartQuantityChange,
  decrementValue,
  incrementValue,
} from "../../../../containers/app/features/CounterSlice";

import "./Popular.css";
import {
  addressValuesSession,
  getName,
  getUserData,
  sessionLocationData,
} from "../../../../constants/Utils";
import "./TabPanel.css";
function TabPanel({ children, value, index }) {
  //storing onjects in props
  return <div>{value === index && <>{children}</>}</div>;
}
// let products = ProductListing.category_list[0].product_list;
// const valProd = ProductListing.category_list;
// console.log(valProd.category_list);
// console.log(ProductListing.category_list);
//implementing proptypes to identifying
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
//identify function
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({ ProductData, isToggle, filterProductItems }) => {
  const [value, setValue] = useState(0);
  const [productItems, setProductItems] = useState();
  const [checkOutDetails, setCheckOutDetails] = useState();

  let userName = getName() ? getName()[0] : null;
  const dispatch = useDispatch();
  const CartQuantityChange = useSelector(
    (state) => state.counter.cartQuantityChange
  );
  const CartQuantityChangeViceVersa = useSelector(
    (state) => state.counter.cartQuantityChangeViceVersa
  );

  let filterProduct = filterProductItems?.category_list;

  useEffect(() => {
    dispatch(cartQuantityChange(CartQuantityChange + 1));
  }, [productItems]);

  useEffect(() => {
    setProductItems(ProductData?.category_list);
  }, [ProductData]);

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
      setCheckOutDetails(
        checkoutPostDetailsResponse?.data?.data?.cart_products
      );
    } catch (e) {}
  };
  useEffect(() => {
    checkoutPostDetailsValuesApi();
  }, []);

  useEffect(() => {
    if (ProductData) {
      cartQuantityUpdate(checkOutDetails);
    }
  }, [checkOutDetails, ProductData]);

  useEffect(() => {
    checkoutPostDetailsValuesApi();
  }, [CartQuantityChangeViceVersa]);

  const cartQuantityUpdate = (productQuantityList) => {
    if (ProductData) {
      productQuantityList?.map((productQuantityObj) => {
        setProductItems(() =>
          ProductData?.category_list?.map((obj, i) => {
            if (obj.category_id === productQuantityObj.category_id) {
              obj.product_list.forEach((obj2) => {
                if (obj2.product_id === productQuantityObj.product_id) {
                  obj2.counter = productQuantityObj.product_quantity;
                }
              });
              return obj;
            }
            return obj;
          })
        );
      });
    }
  };

  useEffect(() => {
    if (isToggle) {
      // setProductItems(() =>
      //   filterProduct.filter((obj, i) => {
      //     const list = obj.product_list;
      //     let result = list.filter((obj2) => {
      //       return obj2.is_product_veg == "1";
      //     });
      //     obj.product_list = result;
      //     return obj;
      //   })
      // );
      let newArray = [...filterProduct];
      let resultArray = [];
      newArray.map((obj, i) => {
        const list = obj.product_list;
        let result = list.filter((obj2) => {
          return obj2.is_product_veg == "1";
        });
        let object = {
          ...obj,
          product_list: result,
        };
        resultArray.push(object);
      });
      setProductItems(resultArray);
    } else {
      setProductItems(filterProduct);
    }
  }, [isToggle]);

  const addRemoveProductCartApiValuesApi = async (data) => {
    let postpostProductListingValuesObjectValuesObject = {
      product_id: data?.product_id,
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : null,
      is_variant_selected: "2",
      prod_quantity: data.counter,
    };

    try {
      let addRemoveProductCartApiValuesApiValuesResponse =
        await addRemoveProductCartApi(
          postpostProductListingValuesObjectValuesObject
        );
      console.log(
        "addRemoveProductCartApiValuesApiValuesResponse",
        addRemoveProductCartApiValuesApiValuesResponse
      );
      // setProductItems(addRemoveProductCartApiValuesApiValuesResponse);
    } catch (e) {}
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = (data, item) => {
    setProductItems(() =>
      productItems.map((obj, i) => {
        if (obj.category_id === item.category_id) {
          obj.product_list.forEach((obj2) => {
            if (obj2.product_id === data.product_id) {
              obj2.counter = 1;
              addRemoveProductCartApiValuesApi(obj2);
            }
          });
          return obj;
        }

        return obj;
      })
    );
  };
  // };
  const handleIncrement = (data, item) => {
    setProductItems((f) =>
      f.map((obj, i) => {
        if (obj.category_id === item.category_id) {
          obj.product_list.forEach((obj2) => {
            if (obj2.product_id === data.product_id) {
              obj2.counter = parseInt(obj2.counter) + 1;
              addRemoveProductCartApiValuesApi(obj2);
            }
          });
          return obj;
        }

        return obj;
      })
    );
  };
  const handleDecrement = (data, item) => {
    setProductItems(() =>
      productItems.map((obj, i) => {
        if (obj.category_id === item.category_id) {
          obj.product_list.forEach((obj2) => {
            if (obj2.product_id === data.product_id) {
              obj2.counter = parseInt(obj2.counter) - 1;
              addRemoveProductCartApiValuesApi(obj2);
            }
          });
          return obj;
        }
        return obj;
      })
    );
  };

  return (
    <>
      <div className="tab-container">
        <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {productItems?.map((item, index) => (
            <Tab label={item.category_name} value={index}></Tab>
          ))}
        </Tabs>
      </div>

      {productItems?.map((item, index) => {
        return (
          <TabPanel index={index} value={value}>
            <div className="category-theme">
              <div className="cat-name">
                <b>{item.category_name}</b>
              </div>
              <div className="item-card-container">
                {item.product_list.map((data, index) => {
                  return (
                    <div className="item-card">
                      <div className="card1">
                        {data.is_product_veg === "1" ? (
                          <FaCircle className="itemTypeVeg" />
                        ) : (
                          <FaCircle className="itemTypeNonVeg" />
                        )}
                      </div>
                      <div className="card2">
                        <small
                          className="foodTitle"
                          style={{ fontWeight: "600", fontSize: "110%" }}
                        >
                          {data.product_name}
                        </small>
                        <p className="itemDescription">
                          {data.product_description}
                        </p>
                        <p className="price"> ${data.price}</p>
                      </div>
                      <div className="btn-div-cont card3">
                        <div>
                          <img
                            src={data.product_image}
                            alt="item content"
                            className="itemImage"
                          ></img>
                        </div>
                        <div className="add-btn">
                          {data.counter && data.counter > 0 ? (
                            <Button id={index}>
                              <small>
                                <span
                                  onClick={() => {
                                    handleDecrement(data, item);
                                  }}
                                >
                                  -
                                </span>
                                <span className="count"> {data.counter} </span>
                                <span
                                  onClick={() => {
                                    handleIncrement(data, item);
                                  }}
                                >
                                  +
                                </span>
                              </small>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                handleAdd(data, item);
                              }}
                            >
                              <small>Add</small>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {item.product_list?.length === 0 ? (
                  <p className="no-data">No data found</p>
                ) : null}
              </div>
            </div>
          </TabPanel>
        );
      })}
    </>
  );
};

export default BasicTabs;
