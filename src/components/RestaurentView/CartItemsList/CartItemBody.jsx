import { React, useState, useEffect } from "react";
import { Col, Row, Badge, Card } from "react-bootstrap";
import FoodImage from "../../../Asserts/banners/image1.jpg";
import { AiFillStar } from "react-icons/ai";
import BasicTabs from "../CartItemsList/Tabpanelitems/TabPanel";
import "./CartItemBody.css";
import { useSelector } from "react-redux";
import { ShowRestaurantData } from "../../../constants/Utils";
import Switch from "@mui/material/Switch";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";
import { ProductListingApi } from "../../../services/RestaurantViewPageServices";
import Trending from "../../Restaurent__list/Foods/Trending";
function CartItemBody({ globalCheckoutDetails, globalCheckoutCallback }) {
  //Product Listing Data API :-
  //-----------------------------
  const [isToggle, setIsToggle] = useState();
  const restaurantDatas = useSelector((state) => state.counter.restaurantid);
  const [productItems, setProductItems] = useState([]);
  const [filterProductItems, setFilterProductItems] = useState([]);

  const productListingValuesApi = async () => {
    let postProductListingValuesObject = {
      page: "",
      limit: "",
      lat: "",
      lng: "",
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : restaurantDatas,
      date_timestamp: "1673524004",
      is_veg: "2", //# 1 - Veg 2 - Non veg
    };

    try {
      let productListingValuesResponse = await ProductListingApi(
        postProductListingValuesObject
      );
      setProductItems(productListingValuesResponse.data?.data);
      setFilterProductItems(productListingValuesResponse.data?.data);
    } catch (e) {}
  };

  useEffect(() => {
    productListingValuesApi();
  }, []);

  useEffect(() => {
    if(!globalCheckoutDetails?.cart_products){
      productListingValuesApi();
    }
  }, [globalCheckoutDetails])

  const toggleSwitch = (event) => {
    setIsToggle(event.target.checked);
  };

  return (
    <>
      {/*--------------------------------BODY Content------------------------*/}
      <Row className="mt-4">
        <Col className="ItemBanner">
          <img
            src={productItems?.banner_image}
            alt="Food "
            className="ItemBanner "
          />
        </Col>
      </Row>

      <Card className="cartitem_card">
        <div className="res-name-cont">
          <div>
            <h2>{productItems?.rest_name}</h2>
            <b>{productItems?.res_description}</b>
            <p style={{ fontWeight: "600" }}>
              Address :30 Victoria St, #01-26/27 ,Singapore
            </p>
          </div>
          <div>
            <p>
              {<Switch onChange={(e) => toggleSwitch(e)} />}
              <small className="VegOnlyRestaurant">Veg Only</small>
            </p>
          </div>
        </div>

        <div className="abt-res">
          <div className="rating-res">
            <small>
              <img
                src={RatingStart}
                alt="RatingCount"
                className="Restaurent_Rating_star"
              />
            </small>
            <small className="Rating_out_of">
              {productItems?.avg_rating}/5
              <br />
            </small>
            <small className="Rating_Count">1K+ Ratings</small>
          </div>
          <div>
            <div className="Ratings_verticalLine mt-2 "></div>
          </div>
          <div className="rating-res">
            <p className="open_Hours">
              Open Hours-{productItems?.open_time} AM -
              {productItems?.close_time} PM
              <br />
              <span className="">
                Break Hours-{productItems?.break_start_time} AM -
                {productItems?.break_end_time} PM
              </span>
            </p>
          </div>
          <div>
            <div className="Ratings_verticalLine"></div>
          </div>
          <div className="rating-res">
            <small className="Delivery_Time">Delivery Time</small>
            <br />
            <small className="delivery_Time">
              {productItems?.del_prep_time}
              <small className="kilometer_verticalLine">
                {productItems?.distance} KM
              </small>
            </small>
          </div>
        </div>

        <div className="badge-res">
          <div className="badge-cont-res">
            <Badge className="delivery_Badge1">
              Delivery Handled By
              {productItems?.delivery_handled_by === "1"
                ? " restaurant"
                : " Kerala Eats"}
            </Badge>
          </div>
          <div className="badge-cont-res">
            <Badge className="delivery_Badge2">
              Minimum Order Value {productItems?.min_order_value}
            </Badge>
          </div>
        </div>

        <BasicTabs
          ProductData={productItems}
          filterProductItems={filterProductItems}
          isToggle={isToggle}
          globalCheckoutDetails={globalCheckoutDetails}
          globalCheckoutCallback={globalCheckoutCallback}
        />
      </Card>
    </>
  );
}

export default CartItemBody;
