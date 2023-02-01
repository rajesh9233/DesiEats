import { React, useState, useEffect } from "react";
import { Container, Col, Row, Button, Card, Badge } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { whishListApi } from "../../../services/HomePageServices";
import { useNavigate } from "react-router-dom";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import { TrendingRestaurent } from "../../../constants/HomePageResponse";
import "./Bestseller.css";
import { restaurantIdDataMethod } from "../../../containers/app/features/CounterSlice";
import { HomepageDetail } from "../../../constants/TrendingBestSellerResponse";
import { restaurentValues } from "../../RestaurentView/Redux/Actions/counterActions";

import { bestSellerApi } from "../../../services/HomePageServices";
function Best_seller({ TrendingRestaurent }) {
  const homePageDatas = useSelector(
    (state) => state.counter.homepagedatadeatils
  );
  const BestSellerDatas = homePageDatas?.best_sellers;
  

  const [postBestSeller, setPostBestSeller] = useState({
    page: 0,
    lat: "1.3005317",
    lng: "103.8452356",
  });
  const [bestSellerResponse, setBestSellerResponse] = useState();

  useEffect(() => {
    const bestSellerDataApi = async (item) => {
      try {
        let bestSellerDataResponse = await bestSellerApi(postBestSeller);

        setBestSellerResponse(bestSellerDataResponse.data.data.best_sellers);
      } catch (e) {}
    };
    bestSellerDataApi();
  }, [postBestSeller]);

  // console.log(postBestSeller)
  const nextButton = () => {
    setPostBestSeller({ ...postBestSeller, page: postBestSeller.page + 1 });
//  console.log(bestSellerResponse)
  };

  //Update Data 
  // setFormdata((f) => ({
  //   ...f,
  //   fullname: "",
  //   email: "",
  //   createpassword: "",
  //   repeatpassword: "",
  // }));
  const PreviousButton = () => {
    setPostBestSeller({ ...postBestSeller, page: postBestSeller.page - 1 });
  };
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const ShowRestaurantData = (item) => {
    navigate("/restaurant");
    dispatch(restaurantIdDataMethod(item.restaurant_id));
    sessionStorage.setItem("restaurantData", item.restaurant_id);
  };
  const restaurantDataId = useSelector((state) => state.counter);
  // console.log(restaurantDataId);
  const whishListApiData = async () => {
    let postBestSellerObject = {
      lat: "22.9406434",
      lang: "78.52852",
      page: "0",
    };
    try {
      await whishListApi(postBestSellerObject);
    } catch (e) {
      // console.log(e);
    }
  };
  const [clickedItems, setClickedItems] = useState([]);
  const HandleClick = (item) => {
    // setIsSelected(item.id)
    //   if (favItems.indexOf(item.id) === -1) {
    //     favItems.push(item.id);
    //   } else {
    //     favItems.splice(index, 1);
    //   }
    //   console.log(favItems)

    setClickedItems((prevState) => {
      if (prevState.includes(item.restaurant_id)) {
        return prevState.filter((value) => value !== item.restaurant_id);
      }
      return [...prevState, item.restaurant_id];
    });

    // console.log(clickedItems);
  };

  const [isMobileBestSeller, setIsMobileBestSeller] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 500) {
      setIsMobileBestSeller(true);
    }
  }, []);

  return (
    <>
      {/*--------------------------- BEST SELLER------------------------------------------- */}
      <Container>
        <Row className="mt-2">
          <Col lg="6" md="6" sm="6">
            <h2>Best Seller on Desi Eats</h2>
          </Col>
          <Col lg="6" md="6" sm="6" style={{ textAlign: "right" }}>
            <Button className="arrow_left " onClick={() => {PreviousButton();}}>
              <ArrowLeft className="arrow-leftIcon" />
            </Button>{" "}
            {""}
            <Button className="arrow_right" onClick={() => nextButton()}>
              <ArrowRight className="arrow_rightIcon" />
            </Button>
          </Col>
        </Row>
        <Row></Row>
      </Container>

      {/* -------------BEST SELLET RESTAURANTS LIST -------------------------*/}

      {!isMobileBestSeller ? (
        <Container>
          <Row className="mt-3">
            {bestSellerResponse?.slice(0, 4)?.map((item, index) => (
              //Card Size splits 3 - 3
              <Col
                lg="3"
                mb="3"
                sm="3"
                className="d-flex grid-margin mb-5 gap-3"
              >
                <Card
                  className="BestSellerCardHomepage"
                  onClick={() => {
                    ShowRestaurantData(item);
                  }}
                >
                  <img
                    src={item.banner_image}
                    alt="no valid data"
                    className="
         trendingImage 
         img-responsive img-portfolio img-hover
         img-fluid "
                  />
                  <Badge className="minimum_value mb-3" variant="outlined">
                    Minimum Order Value :{item.min_order_value}
                  </Badge>

                  <Badge className="DeliveryHandledBy mb-3" variant="outlined">
                    Delivery Handled By
                    {item.delivery_handled_by === "1"
                      ? "restaurant"
                      : " Kerala Eats"}
                  </Badge>
                  <Badge
                    className="Favourite_Badge_HomePage"
                    onClick={(e) => {
                      e.stopPropagation();

                      HandleClick(item);
                    }}
                  >
                    {clickedItems.indexOf(item.restaurant_id) === -1 ? (
                      <AiOutlineHeart className="favourite" />
                    ) : (
                      <AiFillHeart className="favourite" />
                    )}
                  </Badge>
                  <Row>
                    {/* inside card splitting size 8-4 */}
                    <Col lg="8">
                      <div className="ms-2 mt-2 ">
                        <small className=" Restaurent_Title">
                          {" "}
                          {item.rest_name}
                        </small>
                        <br />
                        <small className="mb-2 Restaurent_SubTitle text-muted">
                          {item.res_description}
                        </small>
                      </div>

                      <Badge
                        className="delivery_by mt-2 mb-5"
                        variant="outlined"
                      >
                        {item.Delivery_by}
                      </Badge>
                    </Col>
                    <Col lg="4">
                      <Badge className="Restaurent_Open_Close mt-2">
                        <small>Open</small>
                      </Badge>
                      <br />
                      <small>
                        <img
                          src={RatingStart}
                          alt="RatingCount"
                          className="Restaurent_Rating_star mx-1 pb-1"
                        />
                      </small>
                      <small className="RatingCountItemsRestaurant">
                        {item.avg_rating}/5
                      </small>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="7">
                      <Badge
                        className="open_hours_badge ms-2"
                        variant="outlined"
                      >
                        Open Hours-{item.open_time}-{item.close_time}
                      </Badge>
                    </Col>
                    <Col lg="4">
                      <Badge className="delivery_time">
                        {item.del_prep_time} | {item.distance}km{" "}
                      </Badge>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="7">
                      <div className="ms-2">
                        <Badge
                          className="break_hours_badge mt-2 mb-4"
                          variant="outlined"
                        >
                          Break Hours-{item.break_start_time} -{" "}
                          {item.break_end_time}
                        </Badge>
                      </div>
                    </Col>
                    <Col lg="3" />
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="mt-4">
            <Carousel className="trendingCarousel">
              {BestSellerDatas?.map((item, index) => (
                //Card Size splits 3 - 3
                <Carousel.Item>
                  <Col
                    lg="3"
                    mb="3"
                    sm="3"
                    xs="12"
                    className="TrendingCard_Homepage d-flex grid-margin mb-5 gap-3"
                  >
                    <Card
                      onClick={() => {
                        ShowRestaurantData(item);
                      }}
                    >
                      <img
                        src={item.banner_image}
                        alt="no valid data"
                        className="
         trendingImage 
         img-responsive img-portfolio img-hover
         img-fluid "
                      />

                      <Badge
                        className="minimum_value_trending mb-3"
                        variant="outlined"
                      >
                        Minimum Order Value :{item.min_order_value}
                      </Badge>

                      <Badge
                        className="DeliveryHandledByTrending mb-3"
                        variant="outlined"
                      >
                        Delivery Handled By{" "}
                        {item.delivery_handled_by === "1"
                          ? "restaurant"
                          : " Kerala Eats"}
                      </Badge>

                      <Row>
                        <Col lg="8" sm="8" md="8" xs="8">
                          <div className="ms-2 mt-2 ">
                            <small className=" Restaurent_Title">
                              {" "}
                              {item.rest_name}
                            </small>
                            <br />
                            <small className="mb-2 Restaurent_SubTitle text-muted">
                              {item.res_description}
                            </small>
                          </div>

                          <Badge
                            className="delivery_by mt-2 mb-5"
                            variant="outlined"
                          >
                            {item.Delivery_by}
                          </Badge>
                        </Col>
                        <Col lg="4" md="4" sm="4" xs="4">
                          <Badge className="Restaurent_Open_Close mt-2">
                            <small>Open</small>
                          </Badge>
                          <br />

                          <small>
                            <img
                              src={RatingStart}
                              alt="RatingCount"
                              className="Restaurent_Rating_star mx-1 pb-1"
                            />
                          </small>
                          <small className="RatingCountItemsRestaurant">
                            {item.avg_rating}/5
                          </small>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="7">
                          <Badge
                            className="open_hours_badge ms-2"
                            variant="outlined"
                          >
                            Open Hours-{item.open_time}-{item.close_time}
                          </Badge>
                        </Col>
                        <Col lg="4">
                          <Badge className="delivery_time">
                            {item.del_prep_time} | {item.distance}{" "}
                          </Badge>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="7">
                          <div className="ms-2">
                            <Badge
                              className="break_hours_badge  mb-3"
                              variant="outlined"
                            >
                              Break Hours-{item.break_start_time} -{" "}
                              {item.break_end_time}
                            </Badge>
                          </div>
                        </Col>
                        <Col lg="3" />
                      </Row>
                      <Badge
                        className="Favourite_Badge_HomePage"
                        onClick={(e) => {
                          e.stopPropagation();
                          HandleClick(item);
                        }}
                      >
                        {clickedItems.indexOf(item.restaurant_id) === -1 ? (
                          <AiOutlineHeart className="favourite" />
                        ) : (
                          <AiFillHeart className="favourite" />
                        )}
                      </Badge>
                    </Card>
                  </Col>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        </Container>
      )}
    </>
  );
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     restaurentValues: (data) => dispatch(restaurentValues(data)),
//   };
// };
// connect(null,mapDispatchToProps)
export default Best_seller;
