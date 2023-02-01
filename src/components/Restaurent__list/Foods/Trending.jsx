import React, { useState } from "react";
import { Container, Col, Row, Button, Card, Badge } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { trendingOnApi } from "../../../services/HomePageServices";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { GrStar } from "react-icons/gr";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Trending.css";
import { homepagedetailsmethod ,restaurantIdDataMethod
} from "../../../containers/app/features/CounterSlice";
import BestSeller from"./Bestseller"
import CartItemBody from "../../RestaurentView/CartItemsList/CartItemBody";
import { connect } from "react-redux";
import { homePageDetailsApi,searchTrendingonApi } from "../../../services/HomePageServices";
import { HomepageDetail } from "../../../constants/TrendingBestSellerResponse";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { WhishListApi } from "../../../services/ProfilePageServices";
function Trending({ restaurentValues, TrendingRestaurent }) {


  //calling the name is the biggest error for that
  const restaurentPerRow = 4;
  const [next, setNext] = useState(restaurentPerRow);
  const [index, setIndex] = useState(0);
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
  useEffect(() => {
    if (window.innerWidth < 500) {
      setIsMobile(true);
    }
  }, []);

  // const trendingOnApiData = async () => {
  //   let postTrendingOnObject = {
  //     lat: "22.9406434",
  //     lang: "78.52852",
  //     page: "0",
  //   };
  //   try {
  //     await trendingOnApi(postTrendingOnObject);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const [wishListData, setWishListData] = useState([]);






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

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  // onClick={prevBtn}
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
const [homepageData, setHomepageData] = useState();

    //Calling Object WithOut Crash
    const TrendingData = homepageData?.data.data.trending_on
    // console.log(homepageData?.data.data.trending_on);
    const HomePageDataItems=useSelector((state) => state.counter.homepagedatadeatils)
  // console.log(HomePageDataItems)
  const dispatch = useDispatch();
  


// console.log(restaurantDataId)

const ShowRestaurantData=(item)=>{
 navigate("/restaurant");
dispatch(restaurantIdDataMethod(item.restaurant_id))
sessionStorage.setItem("restaurantData",item.restaurant_id)

}
  const restaurantDataId=useSelector((state) => state.counter)
  // console.log(restaurantDataId)


const [trendingData,setTrendingData]=useState(TrendingData);
 
const[homepageResponse,setHomepageResponse]=useState()
useEffect(() => {
    const HomePageDetailsDataApi = async () => {
      let postHomePageDetailsObject = {
        lat:"1.3005317",
        lng:"103.8452356",
        date_timestamp:"1652364149"
      }

      try {
        let HomePageApiResponse = await homePageDetailsApi(postHomePageDetailsObject);

        setHomepageResponse(HomePageApiResponse.data.data);
      } catch (e) {}
    };
    HomePageDetailsDataApi();

  }, []);

  dispatch(homepagedetailsmethod(homepageResponse));








  let trending = homepageResponse?.trending_on;
const [postHomePage, setPostHomePage] = useState(
  {
    page: 0,
    lat: "1.3005317",
    lng: "103.8452356",
   }
);
useEffect(()=>{
  const trendingDatailsDataApi = async (item) => {
    

    try {
      let trendingDatailsDataResponse = await searchTrendingonApi(postHomePage);

     
      setTrendingData(trendingDatailsDataResponse.data.data.trending_on);
      // console.log(trendingData)
      // console.log(item)

    } catch (e) {}
  };
  trendingDatailsDataApi();

}, [postHomePage]);




useEffect(() => {
  const whishListApiValuesApi = async () => {
    let postWishListObject = {
      restaurant_id:"55",
      action_type:"",
    };

    try {
      let WishListResponse = await WhishListApi(
        postWishListObject
      );
      setWishListData(WishListResponse);
      // console.log(WishListResponse);
      // window.location.reload(true); //refresh the page
    } catch (e) {}
  };
  whishListApiValuesApi();
}, []);
const nextButton=()=>{
  setPostHomePage({...postHomePage,page:postHomePage.page+1})

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


}


const PreviousButton=()=>{
  setPostHomePage({...postHomePage,page:postHomePage.page-1})

}
// console.log()
  return (
    <>
      {/* -------------------------------------TRENDING ON --------------------------------------------*/}
      <Container>
        <Row className="mt-3">
          <Col lg="6" md="6" sm="6">
            <h2>Trending on Desi Eats</h2>
          </Col>

          <Col lg="6" md="6" sm="6" style={{ textAlign: "right" }}>
            <Button className="arrow_left " onClick={PreviousButton}
            >
              <ArrowLeft className="arrow-leftIcon" />
            </Button>
            {" "}
            {""}
            <Button className="arrow_right"
                        onClick={nextButton}

            >
              <ArrowRight className="arrow_rightIcon"  
 />
            </Button>
          </Col>
        </Row>
      </Container>

      {/* ----------------------------TRENDING RESTAURANTS LIST---------------------------------------*/}
      {!isMobile ? (
        <Container>
          <Row className="mt-3">
            {trendingData && trendingData?.slice(0, next)?.map((item, index) => (
              //Card Size splits 3 - 3
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
                    {clickedItems.indexOf(item.restaurant_id) === -1 ? (
                      <AiOutlineHeart className="favourite" />
                    ) : (
                      <AiFillHeart className="favourite" />
                    )}
                  </Badge>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
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
//  connect(null,mapDispatchToProps)
export default Trending;
