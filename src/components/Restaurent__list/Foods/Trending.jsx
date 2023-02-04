import React, { useState } from "react";
import { Container, Col, Row, Button, Card, Badge } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import {
  trendingOnApi,
  whishListPostApi,
} from "../../../services/HomePageServices";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { GrStar } from "react-icons/gr";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Trending.css";
import {
  homepagedetailsmethod,
  restaurantIdDataMethod,
} from "../../../containers/app/features/CounterSlice";
import BestSeller from "./Bestseller";
import CartItemBody from "../../RestaurentView/CartItemsList/CartItemBody";
import { connect } from "react-redux";
import {
  homePageDetailsApi,
  searchTrendingonApi,
} from "../../../services/HomePageServices";
import { HomepageDetail } from "../../../constants/TrendingBestSellerResponse";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { WhishListApi } from "../../../services/ProfilePageServices";
function Trending({ restaurentValues, TrendingRestaurent }) {
  //calling the name is the biggest error for that
  const restaurentPerRow = 4;
  const [next, setNext] = useState(restaurentPerRow);
  const [index, setIndex] = useState(0);
  const [homepageData, setHomepageData] = useState();
  const TrendingData = homepageData?.data.data.trending_on;
  const [trendingData, setTrendingData] = useState(TrendingData);

  let navigate = useNavigate();
  // console.log(HomepageDetail.trending_on);
  // const [restaurentData, setRestaurentData] = useState();

  // // restaurentValues(restaurentData)
  // const handleMoreButton = () => {
  //   setNext(next + 4);
  // };
  // // console.log(TrendingRestaurent)
  // const prevBtn = () => {
  //   if (TrendingRestaurent.length > 4) {
  //     setNext(next - 4);
  //     setIndex((i) => {
  //       const newIndex = i - 4;
  //       setNext(newIndex);
  //       return loopIndex(newIndex);
  //     });
  //   }
  // };

  // const nextBtn = () => {
  //   setIndex((i) => {
  //     const newIndex = next + 4;
  //     setNext(newIndex);

  //     return loopIndex(newIndex);
  //   });
  // };

  // const loopIndex = (i) => {
  //   if (i < 0) {
  //     return TrendingRestaurent.length - 1;
  //   } else if (i > TrendingRestaurent.length - 1) {
  //     return 0;
  //   }
  //   return i;
  // };
  // console.log(nextBtn);
  // console.log(trending.isWishList)
  const [isMobile, setIsMobile] = useState(false);
  const [wishListData, setWishListData] = useState([]);
  const [homepageResponse, setHomepageResponse] = useState();
  const [clickedItems, setClickedItems] = useState([]);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setIsMobile(true);
    }
  }, []);

  const HandleClick = (item) => {
    setClickedItems((prevState) => {
      if (prevState.includes(item.restaurant_id)) {
        return prevState.filter((value) => value !== item.restaurant_id);
      }
      return [...prevState, item.restaurant_id];
    });
  };

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const HomePageDataItems = useSelector(
    (state) => state.counter.homepagedatadeatils
  );
  const dispatch = useDispatch();

  const ShowRestaurantData = (item) => {
    navigate("/restaurants");
    dispatch(restaurantIdDataMethod(item.restaurant_id));
    sessionStorage.setItem("restaurantData", item.restaurant_id);
  };

  useEffect(() => {
    const HomePageDetailsDataApi = async () => {
      let postHomePageDetailsObject = {
        lat: "1.3005317",
        lng: "103.8452356",
        date_timestamp: "1652364149",
      };

      try {
        let HomePageApiResponse = await homePageDetailsApi(
          postHomePageDetailsObject
        );

        setHomepageResponse(HomePageApiResponse.data.data);
      } catch (e) {}
    };
    HomePageDetailsDataApi();
  }, []);

  dispatch(homepagedetailsmethod(homepageResponse));

  let trending = homepageResponse?.trending_on;
  const [postHomePage, setPostHomePage] = useState({
    page: 0,
    lat: "1.3005317",
    lng: "103.8452356",
  });

  const trendingDatailsDataApi = async (item) => {
    try {
      let trendingDatailsDataResponse = await searchTrendingonApi(postHomePage);
      setTrendingData(trendingDatailsDataResponse.data.data.trending_on);
    } catch (e) {}
  };

  useEffect(() => {
    trendingDatailsDataApi();
  }, [postHomePage]);

  useEffect(() => {
    const whishListApiValuesApi = async (isfavourite) => {
      let postWishListObject = {
        restaurant_id: "55",
        action_type: isfavourite,
      };
      try {
        let WishListResponse = await WhishListApi(postWishListObject);
        setWishListData(WishListResponse);
      } catch (e) {}
    };
    whishListApiValuesApi();
  }, []);
  const nextButton = () => {
    setPostHomePage({ ...postHomePage, page: postHomePage.page + 1 });

    // Next Button

    // example records:40
    // let count=records/limit
    // if(count===postHomePage.page){
    //   return
    // }else if{
    //   if(count<postHomePage.page){
    //     setPostHomePage({...postHomePage,page:postHomePage.page+1})

    // }

    // else{
    //   setCount({...postHomePage,page:postHomePage.page+1})

    // }
  };

  const PreviousButton = () => {
    setPostHomePage({ ...postHomePage, page: postHomePage.page - 1 });
  };

  const handleFavourites = async (isfavourite, item) => {
    let postData = {
      restaurant_id: item.restaurant_id,
      action_type: isfavourite,
    };
    let wishListResp = await whishListPostApi(postData);
    console.log(wishListResp);
    if (wishListResp) {
      trendingDatailsDataApi();
    }
  };
  return (
    <>
      {/* -------------------------------------TRENDING ON --------------------------------------------*/}
      <Container>
        <div className="trending-container">
          <div>
            <h2>Trending on Desi Eats</h2>
          </div>
          <div className="navigation-btn">
            <Button className="navigation-left-arrow" onClick={PreviousButton}>
              <ArrowLeft className="arrow-leftIcon" />
            </Button>
            <Button className="navigation-right-arrow" onClick={nextButton}>
              <ArrowRight className="arrow_rightIcon" />
            </Button>
          </div>
        </div>
      </Container>

      {/* ----------------------------TRENDING RESTAURANTS LIST---------------------------------------*/}
      {!isMobile ? (
        <>
          <Container>
            <Row>
              {trendingData &&
                trendingData?.slice(0, next)?.map((item, index) => (
                  <Col
                    lg="3"
                    mb="3"
                    sm="3"
                    className="d-flex grid-margin mb-5 gap-3"
                  >
                    <Card
                      className="TrendingCardHomepage"
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
                            <small className="RatingCountItemsRestaurant">
                              {item.avg_rating}/5
                            </small>
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
                              className="break_hours_badge mt-2 mb-3"
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
                        {item.isWishList === "1" ? (
                          <AiFillHeart
                            className="favourite"
                            onClick={() => handleFavourites(2, item)}
                          />
                        ) : (
                          <AiOutlineHeart
                            className="favourite"
                            onClick={() => handleFavourites(1, item)}
                          />
                        )}
                      </Badge>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      ) : (
        <Container>
          <Row className="mt-4">
            <Carousel className="trendingCarousel">
              {trending?.map((item, index) => (
                //Card Size splits 3 - 3
                <Carousel.Item>
                  <Col
                    lg="3"
                    mb="3"
                    sm="3"
                    xs="12"
                    className="TrendingCard_Homepage d-flex grid-margin mb-3 gap-3"
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
                          <small className="rating_count_homepage">
                            <GrStar className="Restaurent_Rating_star mx-1" />
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
                        {item.isWishList === "1" ? (
                          <AiFillHeart
                            className="favourite"
                            onClick={() => handleFavourites(2, item)}
                          />
                        ) : (
                          <AiOutlineHeart
                            className="favourite"
                            onClick={() => handleFavourites(1, item)}
                          />
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
//  connect(null,mapDispatchToProps)
export default Trending;
