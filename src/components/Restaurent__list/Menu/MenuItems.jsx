import { React, useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import catagory1 from "../../../Asserts/category/foods.png";
import catagory2 from "../../../Asserts/category/groceries.svg";
import catagory3 from "../../../Asserts/category/beverages.svg";
import catagory4 from "../../../Asserts/category/dinein.svg";
import Bestseller from "../Foods/Bestseller";
import Trending from "../Foods/Trending";
import ActiveGroceries from "../../../Asserts/RestaurentList/Shop-1.png";
import AllRestaurent from "../Foods/AllRestaurent";
import GroceryDelivery from "../Groceries/GroceryDelivery";
import Beverages from "../Beverages/Beverages";
import { useSelector, useDispatch } from "react-redux";
import DineinRestaurents from "../Dinein/DineinRestaurents";
import { restaurentByCatagoryDatas } from "../../../containers/app/features/CounterSlice";
import FoodsCatagory from "../Foods/FoodsCatagory";
import {
  restaurentByCatagory,
  productListingApi,
  homePageDetailsApi,
} from "../../../services/HomePageServices";
import "./MenuItems.css";
import BeveragesTerms from "../PopUP/BeveragesTerms";

function Menu() {
  const [food, setFood] = useState([
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
  ]);

  //------------------RestaurentByCatagory API--------------------------------
  //---------------------------------------------------------
  const [restByCatagory, setRestByCatagory] = useState();
  const [isActive, setIsActive] = useState();
  const [defaultValue, setDefaultValue] = useState("all");
  const [activeIconImage, setActiveIconImage] = useState(false);
  const restaurantDatas = useSelector(
    (state) => state.counter.restaurentbycatagory
  );
  const [restaurantId, setRestaurantId] = useState();
  const [beverageTerms, setBeverageTerms] = useState(false);
  const beverageTermsPopUpData = () => setBeverageTerms(true);

  const beverageTermsData = (value) => {
    setBeverageTerms(value);
  };
  const restaurantTab = (data) => {
    RestaurentCatagory(restaurantId, data);
  };

  const RestaurentCatagory = async (itemId, foodTypeId) => {
    let postRestaurentCatagoryObject = {
      page: "0",
      limit: "10",
      order_type: "1",
      lat: "22.9406434",
      lng: "78.52852",
      category_type: itemId,
      food_type: foodTypeId ? foodTypeId : "1",
      date_timestamp: "1648044959",
    };
    try {
      let restaurantCatagoryValues = await restaurentByCatagory(
        postRestaurentCatagoryObject
      );
      setRestByCatagory(restaurantCatagoryValues.data.data);
    } catch (e) {
      // console.log(e);
    }
  };
  const dispatch = useDispatch();
  dispatch(restaurentByCatagoryDatas(restByCatagory));

  const [checkBoxState, setChckBoxState] = useState(false);
  const [acceptButtonPopup, setAcceptButtonPopup] = useState(false);

  useEffect(() => {
    if (acceptButtonPopup && restaurantId === "3") {
      setDefaultValue("beverages");
      setIsActive("3");
    }

    if (acceptButtonPopup && checkBoxState) {
      sessionStorage.setItem("DontShowAgain", "true");
    }
  }, [acceptButtonPopup]);

  const checkBoxFunc = (data) => {
    setChckBoxState(data);
  };

  const acceptButtonDontShow = (data) => {
    setAcceptButtonPopup(data);
  };

  const HandleClick = (item) => {
    let itemId = isActive == item.id ? null : item.id;
    setActiveIconImage(true);
    if (itemId) {
      switch (itemId) {
        case "1":
          setIsActive(itemId);
          setDefaultValue("restaurent");
          break;
        case "2":
          setIsActive(itemId);
          setDefaultValue("grocery");
          break;
        case "3":
          if (
            sessionStorage.getItem("DontShowAgain") === "false" ||
            sessionStorage.getItem("DontShowAgain") === "undefined" ||
            sessionStorage.getItem("DontShowAgain") === "" ||
            sessionStorage.getItem("DontShowAgain") === null
          ) {
            if (!acceptButtonPopup) {
              beverageTermsPopUpData();
            } else {
              setIsActive(itemId);
              setDefaultValue("beverages");
            }
          } else {
            setIsActive(itemId);
            setDefaultValue("beverages");
          }

          break;
        case "4":
          setIsActive(itemId);
          setDefaultValue("dinein");
          break;

        default:
          return null;
      }
    } else {
      setDefaultValue("all");
      setIsActive(itemId);
    }

    let InActiveImgObj = {
      1: catagory1,
      2: catagory2,
      3: catagory3,
      4: catagory4,
    };
    let activeImgObj = {
      1: ActiveGroceries,
      2: ActiveGroceries,
      3: ActiveGroceries,
      4: ActiveGroceries,
    };

    food.map((data, index) => {
      if (item.id == data.id) {
        food[index] = {
          ...data,
          imgUrl: itemId ? activeImgObj[item.id] : InActiveImgObj[item.id],
        };
      } else {
        food[index] = {
          ...data,
          imgUrl: InActiveImgObj[data.id],
        };
      }
      return food[index];
    });

    setRestaurantId(itemId);
    RestaurentCatagory(itemId, "1");
  };

  return (
    <>
      {/*----- ----------------------------CATEGORY---------------------------------------------- */}

      <Container>
        <div className="menu-item-container">
          {food.map((item, index) => (
            <Card
              className={
                isActive === item.id
                  ? "activeclass menu-item-card"
                  : "menu-item-card"
              }
              onClick={() => {
                HandleClick(item);
              }}
            >
              <div>
                <img src={item.imgUrl} alt="Card img cap" />
              </div>
              <div>
                <b>{item.title}</b>
              </div>
            </Card>
          ))}
        </div>
      </Container>
      {defaultValue === "all" ? (
        <>
          <Trending />
          <Bestseller />
          <AllRestaurent />
        </>
      ) : null}
      {defaultValue === "restaurent" ? (
        <FoodsCatagory
          restByCatagory={restByCatagory}
          restaurantTab={restaurantTab}
        />
      ) : null}
      {defaultValue === "grocery" ? (
        <GroceryDelivery
          restByCatagory={restByCatagory}
          restaurantTab={restaurantTab}
        />
      ) : null}
      {defaultValue === "beverages" ? (
        <Beverages
          restByCatagory={restByCatagory}
          restaurantTab={restaurantTab}
        />
      ) : null}
      {defaultValue === "dinein" ? (
        <DineinRestaurents
          restByCatagory={restByCatagory}
          restaurantTab={restaurantTab}
        />
      ) : null}
      {sessionStorage.getItem("DontShowAgain") === "false" ||
      sessionStorage.getItem("DontShowAgain") === "undefined" ||
      sessionStorage.getItem("DontShowAgain") === "" ||
      sessionStorage.getItem("DontShowAgain") === null ? (
        <BeveragesTerms
          acceptButtonDontShow={acceptButtonDontShow}
          checkBoxFunc={checkBoxFunc}
          checkBoxState={checkBoxState}
          beverageTermsData={beverageTermsData}
          beverageTerms={beverageTerms}
        />
      ) : null}
    </>
  );
}
export default Menu;
