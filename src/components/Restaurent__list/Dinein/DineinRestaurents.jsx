import { React, useState } from "react";
import { Container, Col, Row, Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { restaurantIdDataMethod } from "../../../containers/app/features/CounterSlice";
import { restaurentValues } from "../../RestaurentView/Redux/Actions/counterActions";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png";
import { TrendingRestaurent } from "../../../constants/HomePageResponse";
import { Dinein } from "../../../constants/HomePageResponse";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./DineinRestaurant.css";
import ChangeDineinPopup from "../../Profile/Popup/MyOrder/Dinein/ChangeDineinPopup";
import { whishListPostApi } from "../../../services/HomePageServices";
function DineinRestaurents({
  restaurentValues,
  restByCatagory,
  restaurantTab,
}) {
  const [restaurantId, setRestaurantId] = useState();
  // const restaurantDataId=useSelector((state) => state.counter.restaurantid)
  const dispatch = useDispatch();

  // const dispatchRestaurantId=useDispatch();
  // dispatchRestaurantId(restaurantIdDataMethod(restaurantId))
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const closePopUp = (value) => {
    setShow(value);
  };

  const ShowRestaurantData = (item) => {
    setShow(true);
    // navigate("/restaurants");
    dispatch(restaurantIdDataMethod(item.restaurant_id));

    sessionStorage.setItem("restaurantData", item.restaurant_id);
  };
  const restaurantDataId = useSelector((state) => state.counter);
  // console.log(restaurantDataId);

  // const restaurentPerRow = 8;
  //    const [next, setNext] = useState(restaurentPerRow);

  //   const handleMoreButton = () => {
  //         setNext(next + TrendingRestaurent.length);
  //   }
  //   const [next, setNext] = useState(restaurentPerRow);

  //   const handleMoreButton = () => {
  //         setNext(next + Beverages.length);
  //   }
  const [clickedItems, setClickedItems] = useState([]);
  const HandleClick = (item) => {
    // console.log(item.restaurant_id)

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

    // console.log(clickedItems)
  };

  const handleFavourites = async (isfavourite, item) => {
    let postData = {
      restaurant_id: item.restaurant_id,
      action_type: isfavourite,
    };

    let wishListResp = await whishListPostApi(postData);
    if (wishListResp) {
      restaurantTab();
    }
  };

  return (
    <>
      <Container>
        <h2 className="mt-4">Dine-in Restaurents</h2>
        <Row className="mt-4">
          {restByCatagory?.slice(0, 10)?.map((item, index) => (
            //Card Size splits 3 - 3
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
        </Row>
      </Container>
      <ChangeDineinPopup show={show} closePopUp={closePopUp} />
    </>
  );
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     restaurentValues: (data) => dispatch(restaurentValues(data)),
//   };
// };
// connect(null,mapDispatchToProps)
export default DineinRestaurents;
