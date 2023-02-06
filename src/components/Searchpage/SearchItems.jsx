import { React, useEffect, useState } from "react";
import { Container, Col, Row, Card, Badge } from "react-bootstrap";
import menu from "../../Asserts/RestaurentList/beverages.jpeg";
import "./SearchItems.css";
import { useNavigate } from "react-router-dom";
import RatingStart from "../../Asserts/RestaurentList/RatingStar.png";
import { useDispatch, useSelector } from "react-redux";
import { restaurantIdDataMethod } from "../../containers/app/features/CounterSlice";
import {
  homePageDetailsApi,
  whishListPostApi,
} from "../../services/HomePageServices";
import { WhishListApi } from "../../services/ProfilePageServices";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const DummyItem = ({ searchDatas }) => {
  const allRestaurents = [
    {
      imgUrl: menu,
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",

      restaurant_id: "73",
      rest_name: "Ibaco",
      res_description: "Tasty and Delicious Ice Creams",
      min_order_value: "0",
      delivery_handled_by: "2",
      time_mode: "1",
      rest_status: "1",
      banner_image:
        "https://keralaeats.appplaza.io/assets/merchant/merchant_banner_image/default.png",
      avg_rating: "0",
      latitude: "12.9653847",
      longitude: "80.246198",
      del_prep_time: "0hr 35min",
      offline_status: [],
      isWishList: "1",
      distance: 2902,
      restro_is_open: "1",
      next_open_time: "",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-10",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-11",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-12",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-13",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-14",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-15",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-16",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
    {
      imgUrl: menu,
      title: "BIRIYANI-16",
      subtitle: "Indian & Western cuisine",
      open_hours: "9.00AM-11.00PM",
      break_hours: "11.00AM-12.00PM",
      Delivery_by: "Delivery Handled By Paradise",
      minimum_value: "$20",
    },
  ];

  // let navigate = useNavigate();

  function handleClick() {
    navigate("/restaurent");
  }
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
  const [wishListData, setWishListData] = useState([]);

  const [homepageResponse, setHomepageResponse] = useState();

  const [clickedItems, setClickedItems] = useState([]);
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
    // navigate("/restaurants");
    dispatch(restaurantIdDataMethod(item.restaurant_id));
    // sessionStorage.setItem("restaurantData", item.restaurant_id);
  };

  let trending = homepageResponse?.trending_on;
  const [postHomePage, setPostHomePage] = useState({
    page: 0,
    lat: "1.3005317",
    lng: "103.8452356",
  });

  useEffect(() => {
    const whishListApiValuesApi = async () => {
      let postWishListObject = {
        restaurant_id: "55",
        action_type: "",
      };

      try {
        let WishListResponse = await WhishListApi(postWishListObject);
        setWishListData(WishListResponse);
        // console.log(WishListResponse);
        // window.location.reload(true); //refresh the page
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
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col lg="5"></Col>
          <Col lg="5">
            <h2 className="mt-4">Search Results</h2>
          </Col>
        </Row>

        <Row className="scrollbutton mt-4">
          {searchDatas?.map((item, index) => (
            <Col lg="3" mb="3" sm="3" className="d-flex grid-margin mb-5 gap-3">
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

                    <Badge className="delivery_by mt-2 mb-5" variant="outlined">
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
                    <Badge className="open_hours_badge ms-2" variant="outlined">
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
          {!searchDatas || searchDatas.length == 0 ? (
            <p className="no-data">Search for restaurents or food</p>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default DummyItem;
