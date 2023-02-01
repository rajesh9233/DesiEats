import { React, useState, useEffect } from "react";
import { Col, Row, Badge, Card } from "react-bootstrap";
import FoodImage from "../../../Asserts/banners/image1.jpg";
import { AiFillStar } from "react-icons/ai";
import BasicTabs from "../CartItemsList/Tabpanelitems/TabPanel";
import "./CartItemBody.css";
import { useSelector } from 'react-redux';
import { ShowRestaurantData } from "../../../constants/Utils";
import Switch from "@mui/material/Switch";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";
import { ProductListingApi } from "../../../services/RestaurantViewPageServices";
import Trending from "../../Restaurent__list/Foods/Trending";
function CartItemBody({ restaurentlist }) {
  // const keys = Object.keys(ProductListing);
  // const ProductData = ProductListing[keys[0]]; // '1'
  // console.log(ProductData);
  // const ProductData = ProductListing;

  //Product Listing Data API :-
  //-----------------------------
  const [isToggle,setIsToggle]=useState()
  const restaurantDatas=useSelector((state) => state.counter.restaurantid)
// console.log(restaurantDatas)
  const [productItems, setProductItems] = useState([]);
  useEffect(() => {
    const productListingValuesApi = async () => {
      let postProductListingValuesObject = {
        page: "",
        limit: "",
        lat: "",
        lng: "",
        restaurant_id: sessionStorage.getItem("restaurantData")?sessionStorage.getItem("restaurantData"):restaurantDatas,
        date_timestamp: "1673524004",
        is_veg: "2", //# 1 - Veg 2 - Non veg
      };

      try {
        let productListingValuesResponse = await ProductListingApi(
          postProductListingValuesObject
        );
        setProductItems(productListingValuesResponse);
        // console.log(productListingValuesResponse);
        // window.location.reload(true); //refresh the page
      } catch (e) {}
    };
    productListingValuesApi();
  }, []);

//   productItems?.map((catagory)=>{
//     catagory.product_list.map((product) => {
//     console.log(product.is_product_veg)
//     })

// })

  let ProductData = productItems.data?.data;
const toggleSwitch=(event)=>{
  setIsToggle(event.target.checked)


}
// console.log(ProductData)
  return (
    <>
      {/*--------------------------------BODY Content------------------------*/}
      <Row className="mt-4">
        <Col lg="12" className="ItemBanner ">
          <img
            src={ProductData?.banner_image}
            alt="Food "
            className="ItemBanner "
          />
        </Col>
      </Row>

      <Card className="cartitem_card ">
        {/*
        <Row>
          <Col>
            <h2 className="ms-4 mt-5">{restaurentlist.rest_name?restaurentlist.rest_name:null}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <b className="ms-4 mb-3 mt-2">{restaurentlist.res_description?restaurentlist.rest_name:null}</b>
          </Col>
        </Row>
        <Row>
          <Col className="ms-4 mt-3 ">
            <p style={{ fontWeight: "600" }}>
              Address :30 Victoria St, #01-26/27 ,Singapore
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg="2">
          
            <Row>
              <Col lg="11">

                <AiFillStar
                  style={{ color: "yellow" }}
                  className="ms-5"
                ></AiFillStar>
               <small className="Rating_out_of ms-3">{restaurentlist.avg_rating}/5<br /></small> 
               <small className="Rating_Count ms-4 mt-2">1K+ Ratings</small> 
              </Col>
            </Row>
          </Col>
         
          <Col lg="4">
          <Row>
            <Col lg="1">
            <div className="Ratings_verticalLine mt-2 "></div>
            </Col>

              <Col lg="10">
                <p className="open_Hours">
                  Open Hours-{restaurentlist.open_time} AM- {restaurentlist.close_time} PM
                  <br />
                  <span className="mx-5">Shop Timing</span>
                </p>
              </Col>
              <Col lg="1">
                <div className="shopTiming_verticalLine mt-2"></div>
              </Col>
            </Row>
          </Col>

          <Col lg="4">
              <small className="delivery_Time">
              {restaurentlist.del_prep_time}
                <small className="kilometer_verticalLine ms-2 "> {restaurentlist.distance} KM</small>
                </small>
                <br/>
                <small className="Delivery_Time ms-3">Delivery Time</small>

                </Col>

        </Row>
        <Row>
          <Col lg="5" className="ms-4">
            <Badge className="delivery_Badge1 ">
              <p className="mt-2 pb-1" >
                Delivery Handled By {restaurentlist.delivery_handled_by}
              </p>
            </Badge>
          </Col>
          <Col lg="5">
            <Badge className="delivery_Badge2 ms-3 ">
              <p className="mt-2 pb-1">
                Delivery Handled By {restaurentlist.delivery_handled_by}
              </p>
            </Badge>
          </Col>
        </Row> */}
        <Row>
          <Col lg="8">
            <h2 className="ms-4 mt-5">{ProductData?.rest_name}</h2>
          </Col>
          <Col lg="2" className="ms-5 mt-5">
            <p>
              {" "}
              {<Switch  
              
              onChange={(e) => toggleSwitch(e)}
              />}
              <small className="VegOnlyRestaurant">Veg Only</small>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <b className="ms-4 mb-3 mt-2">{ProductData?.res_description}</b>
          </Col>
        </Row>
        <Row>
          <Col className="ms-4 mt-3 ">
            <p style={{ fontWeight: "600" }}>
              Address :30 Victoria St, #01-26/27 ,Singapore
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg="2">
            <Row>
              <Col lg="2" />
              <Col lg="10">
                <small>
                  <img
                    src={RatingStart}
                    alt="RatingCount"
                    className="Restaurent_Rating_star mx-1 pb-1"
                  />
                </small>
                <small className="Rating_out_of ms-2">
                  {ProductData?.avg_rating}/5
                  <br />
                </small>
                <small className="Rating_Count  mt-2 ">1K+ Ratings</small>
              </Col>
            </Row>
          </Col>

          <Col lg="4">
            <Row>
              <Col lg="1">
                <div className="Ratings_verticalLine mt-2 "></div>
              </Col>

              <Col lg="11">
                <p className="open_Hours">
                  Open Hours-{ProductData?.open_time} AM-{" "}
                  {ProductData?.close_time} PM
                  <br />
                  <span className="">
                    Break Hours-{ProductData?.break_start_time} AM-{" "}
                    {ProductData?.break_end_time} PM
                  </span>
                </p>
              </Col>
             
            </Row>
          </Col>

          <Col lg="4">
            <Row>
            <Col lg="1">
                <div className="shopTiming_verticalLine mt-2"></div>
              </Col>
              <Col lg="10">
              <small className="Delivery_Time ms-1">Delivery Time</small>
            <br />

            <small className="delivery_Time">
              {ProductData?.del_prep_time}
              <small className="kilometer_verticalLine ms-2 ">
                {" "}
                {ProductData?.distance} KM
              </small>
            </small>
              </Col>
            </Row>
           
          </Col>
        </Row>
        <Row>
          <Col lg="5" className="ms-4">
            <Badge className="delivery_Badge1 ">
              <p className="mt-2 pb-1">
                Delivery Handled By{" "}
                {ProductData?.delivery_handled_by === "1"
                  ? "restaurant"
                  : "Kerala Eats"}
              </p>
            </Badge>
          </Col>
          <Col lg="5">
            <Badge className="delivery_Badge2 ms-3 ">
              <p className="mt-2 pb-1">
                Minimum Order Value {ProductData?.min_order_value}
              </p>
            </Badge>
          </Col>
        </Row>

        <BasicTabs ProductData={ProductData} isToggle={isToggle}/>
        
        {/*--------------------item map---------------------*/}
      </Card>
      {/* <Trending showRestaurentItems={showRestaurentItems} restaurentData={restaurentData}/> */}
    </>
  );
}
// const mapStateToProps = state => {
//   return {

//     restaurentlist:state.restaurentlist,
//  }
// }
// connect (mapStateToProps)
export default CartItemBody;
