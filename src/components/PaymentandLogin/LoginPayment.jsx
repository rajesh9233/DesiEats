import { React } from "react";
import LoginView from "./Login/LoginView";
import { Col, Row, Card } from "react-bootstrap";
import "./Login.css";
import CartItems from "../RestaurentView/CartPopupItems/CartItems";
import DesiEatsImage from "../Landing/Items/DesiEatsImage";
import AddressView from "./Login/AddressView";
import Payment from "./Payment/Payment";
function Login() {
  const popular = [
    {
      id: "1",
      title: "Sandwitch Set",
      price: "$29.09",
    },
    {
      id: "1",
      title: "Sandwitch Set",
      price: "$29.09",
    },
    {
      id: "1",
      title: "Sandwitch Set",
      price: "$29.09",
    },
    {
      id: "1",
      title: "Sandwitch Set",
      price: "$29.09",
    },
  ];

  return (
    <>
      <Row>
        <Col lg="8">
          <DesiEatsImage />
          <br />
          {/*--------------------------------BODY Content------------------------*/}

          <Card className="guestLogin_card ms-5">
            <LoginView />
            <AddressView />

            {/*----------------------------------------- Payment Method------------------*/}

            <Payment />
          </Card>
        </Col>{" "}
        <Col lg="4">
          <CartItems />
        </Col>
      </Row>
    </>
  );
}

export default Login;
