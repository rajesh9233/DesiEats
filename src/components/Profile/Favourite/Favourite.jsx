import { React, useState, useEffect } from "react";
import { Col, Row, Button, Card, Badge } from "react-bootstrap";
import "./Favourite.css";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";

import menu from "../../../Asserts/RestaurentList/beverages.jpeg";
import { GrStar } from "react-icons/gr";
import { WhishListGetApi } from "../../../services/ProfilePageServices";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { WhishListApi } from "../../../services/ProfilePageServices";
import { whishListPostApi } from "../../../services/HomePageServices";
function Favourite() {
  const [clickedItems, setClickedItems] = useState([]);
  const ShowRestaurantData = (item) => {
    // let navigate=useNavigate()
    // navigate("/restaurent");
    // console.log(item.restaurant_id);
    //   const restaurantDatas = useSelector((state) => state.counter.restaurentbycatagory);
    // console.log(restaurantDatas)
  };
  const HandleClick = (item) => {
    //setRestaurent(item)
    // console.log(item);
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

  const [wishListData, setWishListData] = useState([]);

  const wishListGetValuesApi = async () => {
    let postWishListObject = {
      page: "0",
      limit: "10",
      date_timestamp: "1648101600",
    };

    try {
      let WishListResponse = await WhishListGetApi(postWishListObject);
      setWishListData(WishListResponse.data.data);
      // console.log(wishListData);
      // window.location.reload(true); //refresh the page
    } catch (e) {}
  };

  useEffect(() => {
    wishListGetValuesApi();
  }, []);

  const handleFavourites = async (isfavourite, item) => {
    let postData = {
      restaurant_id: item.restaurant_id,
      action_type: isfavourite,
    };
    let wishListResp = await whishListPostApi(postData);
    if (wishListResp) {
      wishListGetValuesApi();
    }
  };

  return (
    <>
      <Col lg="1" />
      <Col lg="8">
        <Card className="favourite_card ms-3 ">
          <Card.Body className="">
            <Row>
              <Col lg="6">
                <p className="Favourite_title mt-5 ms-5">Favourite</p>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Badge className="Favourite_Badge_profile pt-2 ms-5">
                  <p className="YourFavouriteRestaurent ms-4">
                    Your Favourite Restaurent
                  </p>
                </Badge>
              </Col>
            </Row>

            <Row>
              <Col lg="11" className="ms-4">
                <Row className="Favourite_item_card mt-4 ">
                  {wishListData.length > 0
                    ? wishListData.map((item, index) => (
                        <Col
                          lg="5"
                          mb="3"
                          sm="3"
                          className="d-flex grid-margin mb-5 mx-4 gap-3"
                        >
                          <Card
                            className="AllRestaurantHomepage"
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
                              className="minimum_valueAllrestaurant mb-3"
                              variant="outlined"
                            >
                              Minimum Order Value :{item.min_order_value}
                            </Badge>

                            <Badge
                              className="DeliveryHandledByAllRestuarant mb-3"
                              variant="outlined"
                            >
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
                              <AiFillHeart
                                className="favourite"
                                onClick={() => handleFavourites(2, item)}
                              />
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
                                  {item.del_prep_time} | {item.distance}{" "}
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
                          </Card>
                        </Col>
                      ))
                    : "No Data Found"}
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default Favourite;
