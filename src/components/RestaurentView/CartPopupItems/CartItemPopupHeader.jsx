import { React, useState } from "react";
import { RiShoppingBag3Line, RiNotification3Line } from "react-icons/ri";
import { PersonFill } from "react-bootstrap-icons";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import Switch from "@mui/material/Switch";
import { Col, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getName } from "../../../constants/Utils";
import NotificationPopup from "../../Landing/PopUp/NotificationPopup";
import "./CartItemPopupHeader.css";
function CartItemPopupHeader() {
  let navigate = useNavigate();
  function handleClickSearch() {
    navigate("/search");
  }
  function handleClickHome() {
    navigate("/");
  }
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const closePopUp = (value) => {
    setShow(value);
  };
  let userName = getName() ? getName()[0] : null;

  const handleUserClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="userProfileFilled">
        <PersonFill className="cart_cardbutton" />
      </div>
      <div className="userProfileFilled higlight">
        <u onClick={() => handleUserClick()}>
          <small>{userName}</small>
        </u>
      </div>
      <div className="icons-container">
        <div className="icons-style">
          <AiOutlineHome className="all-icon" onClick={handleClickHome} />
        </div>
        <div className="icons-style">
          <FiSearch className="all-icon" onClick={handleClickSearch} />
        </div>
        <div className="icons-style">
          <RiNotification3Line className="all-icon" onClick={handleShow} />
        </div>
        <div className="icons-style">
          <RiShoppingBag3Line className="all-icon" />
        </div>
      </div>

      <Card.Title className="your-cart-text">
        <b>Your Cart</b>
      </Card.Title>

      <p className="cart-desc">
        <small>
          Good Food is always cooking! Go ahead,order some Yummy items from the
          Menu.
        </small>
      </p>
      <div className="cutlery-content">
        <b>
          <small>Do You Really Need Cutlery? </small>
          <Switch defaultChecked />
        </b>
      </div>

      <NotificationPopup show={show} closePopUp={closePopUp} />
    </>
  );
}

export default CartItemPopupHeader;
