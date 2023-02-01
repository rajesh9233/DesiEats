import { React, useState,useEffect } from "react";
import { Container, Col, Row, Button, Card, Badge } from "react-bootstrap";
import menu from "../../../Asserts/pngwing 20 (1).png";
import "./AllRestaurent.css";
import { useNavigate } from "react-router-dom";
import { searchRestaurantsApi } from "../../../services/HomePageServices";
import { useSelector, useDispatch } from 'react-redux';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { GrStar} from "react-icons/gr";
import { restaurantIdDataMethod } from "../../../containers/app/features/CounterSlice";
import Carousel from "react-bootstrap/Carousel";
import RatingStart from "../../../Asserts/RestaurentList/RatingStar.png"
import { HomepageDetail } from "../../../constants/TrendingBestSellerResponse";
import { restaurentValues } from "../../RestaurentView/Redux/Actions/counterActions";
import { connect } from "react-redux";
import { restaurentdatas } from "../../../containers/app/features/CounterSlice";
import {TrendingRestaurent} from "../../../constants/HomePageResponse"
import FoodsCatagory from "./FoodsCatagory";
function All_restaurent({restaurentValues}) {
   const username = useSelector((state)=>state.counter.restaurentlistvalues);
  // console.log(username)
  let allRestaurant=HomepageDetail.all_restaurant
  // console.log(HomepageDetail.all_restaurant)
      let navigate=useNavigate()
      const ShowRestaurantData = (item) => {
        navigate("/restaurant");
        dispatch(restaurantIdDataMethod(item.restaurant_id));
        sessionStorage.setItem("restaurantData", item.restaurant_id);
      };
      const restaurantDataId = useSelector((state) => state.counter);
      // console.log(restaurantDataId);
    
  const restaurentPerRow = 8;
  
  const [next, setNext] = useState(restaurentPerRow);

  const handleMoreButton = () => {
    setNext(next + allRestaurant.length);
  };


  const [postAllRestaurant, setPostAllRestaurant] = useState(
    {
      page: 0,
      lat: "1.3005317",
      lng: "103.8452356",
     }
  );
  const [postAllResponse, setPostAllResponse] = useState()
  useEffect(()=>{
    const postAllRestaurantDataApi = async (item) => {
      
  
      try {
        let  bestSellerDataResponse = await searchRestaurantsApi(postAllRestaurant);
  
       
        setPostAllResponse(bestSellerDataResponse.data.data.all_restaurant
          );
  
      } catch (e) {}
    };
    postAllRestaurantDataApi();
  
  }, [postAllRestaurant]);

  const viewMoreButton=()=>{
    setPostAllRestaurant({...postAllRestaurant,page:postAllRestaurant.page+1})
  
  }

  // console.log(postAllResponse)

  
  const [clickedItems, setClickedItems] = useState([]);
  const HandleClick =(item)=> {
    //setRestaurent(item)
    dispatch(restaurentdatas())
// console.log(item)
    // setIsSelected(item.id)
  //   if (favItems.indexOf(item.id) === -1) {
  //     favItems.push(item.id);
  //   } else {
  //     favItems.splice(index, 1);
  //   }
  //   console.log(favItems)

setClickedItems((prevState)=>{
  if(prevState.includes(item.restaurant_id)){
    return prevState.filter(value=>value!==item.restaurant_id)
  }
  return [...prevState,item.restaurant_id]
})

// console.log(clickedItems)
   };
  
//          {allRestaurents?.slice(0, next)?.map((item, index) => (

const dispatch = useDispatch();
// dispatch(restaurent)
const [isMobileAllRestaurant, setIsMobileAllRestaurant] = useState(false);
       useEffect(() => {
         if (window.innerWidth < 500) {
          setIsMobileAllRestaurant(true);
         }
       }, []);
       const homePageDatas = useSelector((state) => state.counter.homepagedatadeatils);
       const AllRestaurantDatas=homePageDatas?.all_restaurant

  return (
    <>
            {!isMobileAllRestaurant ? (

        <Container>
        <h2 className="mb-3">All Restaurants</h2>

 <Row className="mt-4">
 {postAllResponse?.slice(0,next)?.map((item, index) => (

     //Card Size splits 3 - 3
     <Col lg="3" mb="3" sm="3" className="d-flex grid-margin mb-5 gap-3">
       <Card className="AllRestaurantHomepage" onClick={()=>{ShowRestaurantData(item)}}>
       <img src={item.banner_image} alt="no valid data" className="
         trendingImage 
         img-responsive img-portfolio img-hover
         img-fluid " />
<Badge className="minimum_valueAllrestaurant mb-3" variant="outlined">
     Minimum Order Value :{item.min_order_value}
   </Badge>
   
   <Badge className="DeliveryHandledByAllRestuarant mb-3" variant="outlined">
          Delivery Handled By{item.delivery_handled_by==="1"?"restaurant":" Kerala Eats"}
          </Badge>
   <Badge
   className="Favourite_Badge_HomePage"
               onClick={(e) => {
                 e.stopPropagation()

                 HandleClick(item)}}
             >
               {clickedItems.indexOf(item.restaurant_id)===-1 ? (
                 <AiOutlineHeart   className="favourite"
                 />
               ) : (
                 <AiFillHeart className="favourite"
                 />
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
            

             <Badge className="delivery_by mt-2 mb-5" variant="outlined">
               {item.Delivery_by}
             </Badge>
           </Col>
           <Col lg="4">
             <Badge className="Restaurent_Open_Close mt-2"><small>Open</small></Badge>
           <br/>
           <small>
                        <img src={RatingStart} alt="RatingCount" className="Restaurent_Rating_star mx-1 pb-1" />
                      </small>
                      <small className="RatingCountItemsRestaurant">
                          {item.avg_rating}/5
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
           <Col lg="3"/>
         </Row>
         
       </Card>
     </Col>
   ))}
</Row>

</Container>
)
: (
        <Container>
          <Row className="mt-4">
            <Carousel className="trendingCarousel">
              {AllRestaurantDatas?.map((item, index) => (
                //Card Size splits 3 - 3
                <Carousel.Item>
                  <Col
                    lg="3"
                    mb="3"
                    sm="3"
                    xs="12"
                    className="TrendingCard_Homepage d-flex grid-margin  gap-3"
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
                            <small className="mb-2 Restaurent_SubTitle ">
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
        
    


      {/* --------------------------------------- VIEW MORE BUTTON ---------------------------------------------- */}
      <section>
        <Container>
          <Row>
            <Col xs="12" className="mb-3 text-center">
              <Button
                className="view_more"
                id="viewmore"
                variant="link"
                onClick={viewMoreButton}
              >
                <small className="viewMore_AllRestaurant">View More</small>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>   

    </>
  );
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     restaurentValues: (data) => dispatch(restaurentValues(data)),
//   };
// };
// connect(null,mapDispatchToProps)
export default All_restaurent;
