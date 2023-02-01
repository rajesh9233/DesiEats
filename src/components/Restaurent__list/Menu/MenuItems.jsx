import { React, useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import catagory1 from "../../../Asserts/category/foods.png";
import catagory2 from "../../../Asserts/category/groceries.svg";
import catagory3 from "../../../Asserts/category/beverages.svg";
import catagory4 from "../../../Asserts/category/dinein.svg";
import Bestseller from "../Foods/Bestseller";
import Trending from "../Foods/Trending";
import ActiveGroceries from"../../../Asserts/RestaurentList/Shop-1.png"
import AllRestaurent from "../Foods/AllRestaurent";
import GroceryDelivery from "../Groceries/GroceryDelivery";
import Beverages from "../Beverages/Beverages";
import { useSelector, useDispatch } from "react-redux";
import DineinRestaurents from "../Dinein/DineinRestaurents";
import { connect } from 'react-redux';
import { restaurentByCatagoryDatas } from "../../../containers/app/features/CounterSlice";
import FoodsCatagory from "../Foods/FoodsCatagory";
import {restaurentByCatagory,productListingApi,homePageDetailsApi} from"../../../services/HomePageServices"
import "./MenuItems.css";
import BeveragesTerms from "../PopUP/BeveragesTerms";



function Menu() {
  const [food,setFood] =useState( [
    {
      imgUrl: catagory1,
      title: "Foods",
      id: "1",
    },
    {
      imgUrl: catagory2,
      title: "Groceries",
      id: "2",
    },
    {
      imgUrl: catagory3,
      title: "Beverages",
      id: "3",
    },
    {
      imgUrl: catagory4,
      title: "Dine-in",
      id: "4",
    },
  
  ]
  );
  
  //------------------RestaurentByCatagory API--------------------------------
//---------------------------------------------------------
 const[restByCatagory,setRestByCatagory]=useState()
  const [isActive, setIsActive] = useState();
  const [defaultValue, setDefaultValue] = useState("all");
  const [activeIconImage,setActiveIconImage]=useState(false)
  const restaurantDatas = useSelector((state) => state.counter.restaurentbycatagory);
const[restaurantId,setRestaurantId]=useState()
  const [beverageTerms, setBeverageTerms] = useState(false);
  const beverageTermsPopUpData = () => setBeverageTerms(true);
  
  const beverageTermsData = (value) => {
    setBeverageTerms(value);

  };
  const restaurantTab= (data)=>{
    RestaurentCatagory(restaurantId,data)
    //dispatch(data)
  }
  const RestaurentCatagory = async (itemId,foodTypeId) => {
    let postRestaurentCatagoryObject = {
      page: "0",
      limit: "10",
      order_type: "1",
      lat: "22.9406434",
      lng:"78.52852",
      category_type:itemId ,
      food_type: foodTypeId?foodTypeId:"1",
      date_timestamp: "1648044959",
    };
    // console.log(postRestaurentCatagoryObject)
    try {
    let restaurantCatagoryValues=  await restaurentByCatagory(postRestaurentCatagoryObject)
    setRestByCatagory(restaurantCatagoryValues.data.data)
  
  } catch (e) {
      // console.log(e);
    }
  };
// console.log(isActive)
  const dispatch = useDispatch();
  dispatch(restaurentByCatagoryDatas(restByCatagory));

// console.log(restaurantDatas)

const[checkBoxState,setChckBoxState]=useState(false)
const checkBoxFunc=(data)=>{
  setChckBoxState(data)
}

const [acceptButtonPopup,setAcceptButtonPopup]=useState(false)
useEffect(()=>{
  if(acceptButtonPopup && restaurantId==="3"){
    setDefaultValue("beverages");

  }

},[acceptButtonPopup])
const acceptButtonDontShow=(data)=>{
  // console.log(data)

  setAcceptButtonPopup(data)

}




  const HandleClick = (item) => {
    const ActiveImage=
    food.map((data, index) => {
      if(item.id===data.id&&item.id==="2"){
        food[index]={...data,imgUrl:isActive?catagory2: ActiveGroceries}
      }else if(item.id===data.id&&item.id==="3"){
        food[index]={...data,imgUrl:isActive?catagory3: ActiveGroceries}

      }
      return food[index]
    }
    )
    console.log(ActiveImage)
    // setFood(ActiveImage)
      let itemId= isActive==item.id? null:item.id
    // console.log(isActive)
    // console.log(item.id)
    // console.log(itemId)

    setIsActive(itemId);

    setActiveIconImage(true)
if(itemId){

    switch (itemId) {



      
      case "1":
        setDefaultValue("restaurent");
        break;
      case "2":
        // setIsActive(itemId);
        setDefaultValue("grocery");
        break;
      case "3":
        // setIsActive(itemId);
        // setDefaultValue("beverages");
        if(!acceptButtonPopup){
          beverageTermsPopUpData()

        }else{
                  setDefaultValue("beverages");

        }

        break;
      case "4":
        // setIsActive(itemId);
        setDefaultValue("dinein");

        break;

      default:
        return null;
    }
  }else{
    setDefaultValue("all")
  }

  setRestaurantId(itemId)
  RestaurentCatagory(itemId,"1")

  };

  /* ---------------Navigate date with state values--------------
  const {state} = useLocation();
  console.log(state.addressLine)
  */



  // let userResponse = JSON.parse(sessionStorage.getItem("otpResponse"));
  // console.log(userResponse.token)     


 
  //---------------------------------API---------------------------------

  // const person = { firstName: "Robin", lastName: "Wieruch" };

  // localStorage.setItem("user", JSON.stringify(person));

  // const stringifiedPerson = localStorage.getItem("user");
  // const personAsObjectAgain = JSON.parse(stringifiedPerson);
  return (
    <>
      {/*----- ----------------------------CATEGORY---------------------------------------------- */}

      <Container>
        <Row className="gap">
          <Col lg="2" md="2" sx="4"></Col>
          {food.map((item, index) => (

            <Col
              lg="2"
              md="2"
              sm="3"
              xs="3"
              key={index}
              className="menu_list mt-5 mb-4 gap-3"
            >
              <Card 
                // style={{     width: "92%",height: "89%" }}
                className={
                  isActive === item.id 
                    ? "activeclass card_item_menu_home"
                    : "menucard_restaurant card_item_menu_home"
                }
                onClick={() => {
                  HandleClick(item);
                }}
              >
            
                <Card.Body>
                  <Row>
                    <Col lg="6">
                    <div className="foods menu-container  d-grid gap-3 text-center px-4 py-2 mb-4">
                    <img
                  className="food_items_menu_home"
                    src={item.imgUrl}
                  
                    alt="Card img cap"
                  />
                  </div>
                    </Col>
                  </Row>
                 
                    <p className="mt-4  item_title_homepage" >{item.title}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {defaultValue === "all" ? (
        <>
          <Trending />
          <Bestseller />
          <AllRestaurent />
        </>
      ) : defaultValue === "restaurent" ? (<>
         <FoodsCatagory restaurantTab={restaurantTab} restByCatagory={restByCatagory} />

      </>
      ) : defaultValue === "grocery" ? (
        <GroceryDelivery restByCatagory={restByCatagory}/>
      ) : defaultValue === "beverages" ? (
        <Beverages restByCatagory={restByCatagory}/>
      ) : (
        <DineinRestaurents restByCatagory={restByCatagory}/>
      )}
      {!checkBoxState&&
      <BeveragesTerms acceptButtonDontShow={acceptButtonDontShow} checkBoxFunc={checkBoxFunc} checkBoxState={checkBoxState} beverageTermsData={beverageTermsData} beverageTerms={beverageTerms}/>

      }
    </>
  );
}
// const mapDispatchToProps = dispatch => {
//   return {
//     loginResponse: data => dispatch((data)),
//     signupresponse:data => dispatch((data)),
//     guestresponse:data => dispatch((data)),
//   }
// }
// connect (null,mapDispatchToProps)
export default (Menu);
