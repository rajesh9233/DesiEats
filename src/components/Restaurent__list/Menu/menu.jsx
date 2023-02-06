import { React, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import catagory1 from "../../../Asserts/category/foods.png";
import catagory2 from "../../../Asserts/category/groceries.svg";
import catagory3 from "../../../Asserts/category/beverages.svg";
import catagory4 from "../../../Asserts/category/dinein.svg";
import Bestseller from "../Foods/Bestseller";
import Trending from "../Foods/Trending";
import AllRestaurent from "../Foods/AllRestaurent";
import GroceryDelivery from "../Groceries/GroceryDelivery";
import Beverages from "../Beverages/Beverages";
import DineinRestaurents from "../Dinein/DineinRestaurents";
import axios from "axios";

import "./menu.css";

const food = [
  {
    imgUrl: catagory1,
    title: "Food",
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
];

function Menu(props) {
  const [isActive, setIsActive] = useState("");

  const [defaultValue, setDefaultValue] = useState("all");

  const HandleClick = (item) => {
    let itemId = isActive == item.id ? null : item.id;
    setIsActive(itemId);

    if (itemId) {
      switch (itemId) {
        case "1":
          setDefaultValue("restaurent");
          break;
        case "2":
          setIsActive(itemId);
          setDefaultValue("grocery");
          break;
        case "3":
          setIsActive(itemId);
          setDefaultValue("beverages");

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
    }
  };

  /* ---------------Navigate date with state values--------------
  const {state} = useLocation();
  console.log(state.addressLine)
  */

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const closePopUp = (value) => {
    setShow(value);
  };

  //---------------------------------API---------------------------------

  const person = { firstName: "Robin", lastName: "Wieruch" };

  localStorage.setItem("user", JSON.stringify(person));

  const stringifiedPerson = localStorage.getItem("user");
  const personAsObjectAgain = JSON.parse(stringifiedPerson);

  const confirmLocation = async () => {
    let postObject = {
      page: "0",
      limit: "10",
      order_type: "1",
      lat: "22.9406434",
      category_type: "1",
      food_type: "1",
      date_timestamp: "1648044959",
    };

    try {
      let SearchByCatagory = await axios({
        // Endpoint to send files
        url: "https://desieatsapi.appplaza.io/restaurants/restaurant_by_category",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          //Authorization: dummy.token,
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjUyMTMiLCJhcHBJZCI6IjIiLCJuYW1lIjoiRGluZXNoIiwiZW1haWwiOiJkaW5lc2hAZ21haWwuY29tIiwicm9sZSI6IjMiLCJ1c2VyX3R5cGUiOiIzIiwidGltZXN0YW1wIjoxNjY5MDE0MDI2fQ.pxVJ26qZx4R_4YwRpYUKtvL1Hg_ST6nUbU8D_8sQy1w",
        },

        method: "POST",
        // Attaching the form data
        data: postObject,
      });

      sessionStorage.setItem("SearchByCatagory", SearchByCatagory);
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
      {/*----- ----------------------------CATEGORY---------------------------------------------- */}
      <p>ok</p>
      <P>KIOJDIO</P>
      OKIYUHK
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
              className="menu_list mt-5 mb-5 gap-3"
            >
              <Card
                // style={{ width: "94%", height: "90%" }}
                className={
                  isActive === item.id ? "activeclass" : "menucard_restaurant"
                }
                onClick={() => {
                  HandleClick(item);
                  confirmLocation();
                }}
              >
                <Card.Body></Card.Body>
                <div className="foods menu-container d-grid gap-3 text-center px-5 py-3 mb-3">
                  <img
                    src={item.imgUrl}
                    style={{
                      position: "absolute",
                      width: "35%",
                      top: "10%",
                      left: "31%",
                    }}
                    alt="Card img cap"
                  />
                  <b className="mt-5">{item.title}</b>
                </div>
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
      ) : defaultValue === "restaurent" ? (
        <AllRestaurent />
      ) : defaultValue === "grocery" ? (
        <GroceryDelivery />
      ) : defaultValue === "beverages" ? (
        <Beverages />
      ) : (
        <DineinRestaurents />
      )}
      <AllRestaurent />
    </>
  );
}

export default Menu;
