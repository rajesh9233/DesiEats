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
} from "../../../../services/CartCheckOutServices";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementValue,
  incrementValue,
} from "../../../../containers/app/features/CounterSlice";

import "./Popular.css";
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

//Redux function for increment,decreament

// const mapStateToProps = (state) => {
//   return {
//     count: state.count
//   };

// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => {
//       dispatch(increment());

//     },
//     decrement: () => {
//       dispatch(decrement());
//     }
//   };
// };
//setting tab values for showing tabs

const BasicTabs = ({ ProductData, isToggle }) => {
  // const count = useSelector((state) => state.counter.countervalues);
  // const dispatch = useDispatch();
  // console.log(count)
  // console.log(isToggle);
  const latLangval = useSelector((state) => state.counter.latdatas);

  const [value, setValue] = useState(0);
  const addRemoveProductCartApiValuesApi = async (data) => {
    let postpostProductListingValuesObjectValuesObject = {
      product_id: "6693",
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
      // setProductItems(addRemoveProductCartApiValuesApiValuesResponse);
    } catch (e) {}
  };

  //Manage Product Quantity
  //---------------------------
  const manageProductCheckoutValuesApi = async (data) => {
    let popstmanageProductCheckoutValuesObject = {
      product_id: "6693",
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : null,
      order_type: "3",
      prod_quantity: data.counter,
    };

    try {
      let addRemoveProductCartApiValuesApiValuesResponse =
        await manageProductCheckoutApi(popstmanageProductCheckoutValuesObject);
    } catch (e) {}
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log("handlechange");
  };

  // const [isActived, setIsActived] = useState("");
  // const HandleClicker = (item) => {
  //   setIsActived(item.id);
  //   console.log("1");
  //     //  if(item)
  //     console.log(item)
  // // console.log(props.decrement)
  // // console.log(item.id)
  // };
  const [productItems, setProductItems] = useState();
  const [filterProduct, setFilterProduct] = useState();
  // console.log(restaurentItems)
  useEffect(() => {
    setProductItems(ProductData?.category_list);
    setFilterProduct(ProductData?.category_list);
  }, [ProductData]);

  useEffect(() => {
    var newArray = filterProduct;
    setProductItems(() =>
      newArray?.map((obj, i) => {
        obj.product_list.filter((obj2) => {
          // console.log(obj2.is_product_veg )
          return obj2.is_product_veg == "1";
        });
        // console.log(obj);
        return obj;
      })
    );
    // console.log(newArray);
  }, [isToggle]);
  // const onDelete = (id) => {
  //   setRestaurentItems((oldValues) => {
  //     return oldValues.filter((restaurentItems) => restaurentItems.id !== id);
  //   });
  // };
  // console.log(ProductListing.category_list[0].category_name)

  // let sampleArraydata = ["oneData", "twoData", "threeData", "fourData"];

  //Counter Function
  // console.log(counterState[0].counter+1)
  const handleAdd = (data, item) => {
    var newArray = productItems;

    setProductItems(() =>
      newArray.map((obj, i) => {
        if (obj.category_id === item.category_id) {
          obj.product_list.forEach((obj2) => {
            if (obj2.product_id === data.product_id) {
              // console.log("Add clicked");

              obj2.counter = 1;
            }
          });
          return obj;
        }

        return obj;
      })
    );
    // console.log(data, productItems, item);

    // addRemoveProductCartApiValuesApi()
    // console.log(newArray);
  };
  // };
  const handleIncrement = (data, item, event) => {
    var newArray = productItems;
    event.preventDefault();
    setProductItems(() =>
      newArray.map((obj, i) => {
        if (obj.category_id === item.category_id) {
          obj.product_list.forEach((obj2) => {
            if (obj2.product_id === data.product_id) {
              // console.log("clicked");
              obj2.counter = obj2.counter + 1;
            }
          });
          return obj;
        }

        return obj;
      })
    );
  };
  const handleDecrement = (data, item) => {
    var newArray = productItems;

    setProductItems(() =>
      newArray.map((obj, i) => {
        if (obj.category_id === item.category_id) {
          obj.product_list.forEach((obj2) => {
            if (obj2.product_id === data.product_id) {
              obj2.counter = obj2.counter - 1;
            }
          });
          return obj;
        }

        return obj;
      })
    );
  };
  // console.log(productItems);
  const addRemoveVariantCartValuesApi = async (data) => {
    let postaddRemoveVariantCartValuesValuesObject = {
      product_id: "6693",
      variant_id: "",
      variant_type_id: "",
      single_select: "",
      action: "",
      multi_select_limit: "",
    };

    try {
      let addRemoveVariantCartValuesResponse = await addRemoveVariantCartApi(
        postaddRemoveVariantCartValuesValuesObject
      );
    } catch (e) {}
  };

  return (
    <>
      <Row>
        <Col lg="12" className="ms-4">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {productItems?.map((item, index) => (
              <Tab label={item.category_name} value={index}></Tab>
            ))}
          </Tabs>
        </Col>
      </Row>

      {productItems?.map((item, index) => {
        return (
          <TabPanel index={index} value={value}>
            <Row>
              <p>{item.category_name}</p>
            </Row>
            <Row>
              {item.product_list.map((data, index) => {
                return (
                  <Col
                    lg="6"
                    mb="3"
                    sm="3"
                    className="d-flex grid-margin mb-5 gap-3"
                  >
                    <Row>
                      <Col lg="1">
                        {data.is_product_veg === "1" ? (
                          <FaCircle className="itemTypeVeg px-1 mx-5" />
                        ) : (
                          <FaCircle className="itemTypeNonVeg px-1 mx-5" />
                        )}
                      </Col>
                      <Col lg="5" className="items ms-5 ">
                        <small
                          className="foodTitle"
                          style={{ fontWeight: "600", fontSize: "110%" }}
                        >
                          {data.product_name}
                        </small>
                        <p className="itemDescription">
                          {data.product_description} <br />
                          <p className="price mt-1 "> ${data.price}</p>
                        </p>
                      </Col>
                      <Col lg="4">
                        <img
                          src={data.product_image}
                          alt="item content"
                          className="itemImage"
                        ></img>
                      </Col>

                      {data.counter && data.counter > 0 ? (
                        <Button
                          // onClick={() => {
                          //   HandleClicker(data);
                          // }}
                          className="item_count_button "
                          id={index}
                        >
                          <span
                            className="decreament"
                            onClick={() => {
                              handleDecrement(data, item);
                            }}
                          >
                            -
                          </span>
                          <span className="count"> {data.counter} </span>
                          <span
                            style={{ "padding-bottom": "30px" }}
                            className="increament"
                            onClick={(event) => {
                              handleIncrement(data, item, event);
                            }}
                          >
                            +
                          </span>
                        </Button>
                      ) : (
                        <Button
                          className="item_count_button"
                          onClick={() => {
                            handleAdd(data, item);
                          }}
                        >
                          <small>Add</small>{" "}
                        </Button>
                      )}
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </TabPanel>
        );
      })}
      {productItems?.map((item, index) => {
        // if(index===value)
        // {
        <TabPanel value={value} index={index}>
          <Row>
            <p className="popular ms-5 mt-5">{item.category_name}</p>
            {/* {item?.product_list?.map((data, index) => (
               
              ))} */}
          </Row>
        </TabPanel>;
        // }
      })}
    </>
  );
};

// connect(mapStateToProps, mapDispatchToProps)
export default BasicTabs;
