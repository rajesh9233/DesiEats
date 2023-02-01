import React, { useEffect } from "react";
import { Container, Col, Row, Button, Card, Badge } from "react-bootstrap";
import Allrestaurent from "./AllRestaurent";
import Bestseller from "./Bestseller";
import "./FoodCatagory.css";
import RestaurentFoods from "./RestaurentFoods";
import HomeMadeFoods from "./HomeMadeFoods";
function FoodsCatagory({ restByCatagory, handleClicker, restaurantTab }) {
  const [tabValues, setTabValues] = React.useState("1");
  const handleClicked = async (value) => {
    await restaurantTab(value);

    setTabValues(value);
  };
  // console.log(tabValues);

  return (
    <>
      <Row>
        <Col lg="4" />
        <Col lg="2">
          <p
            className={
              tabValues === "1" || tabValues === ""
                ? "activeRestaurent"
                : "FoodsCatagory"
            }
            onClick={() => handleClicked("1")}
          >
            <u>Restaurants</u>
          </p>
        </Col>
        <Col lg="3">
          <p
            className={tabValues === "2" ? "activeRestaurent" : "FoodsCatagory"}
            onClick={() => handleClicked("2")}
          >
            <u>Homemade</u>
          </p>
        </Col>
      </Row>
      {tabValues === "1" || tabValues === "" ? (
        <RestaurentFoods restByCatagory={restByCatagory} />
      ) : (
        <HomeMadeFoods restByCatagory={restByCatagory} />
      )}
    </>
  );
}

export default FoodsCatagory;
