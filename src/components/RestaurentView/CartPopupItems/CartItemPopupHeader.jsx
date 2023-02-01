
import {React,useState} from "react";
import { RiShoppingBag3Line, RiNotification3Line } from "react-icons/ri";
import { PersonFill } from "react-bootstrap-icons";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import Switch from "@mui/material/Switch";
import { Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getName } from "../../../constants/Utils";
import NotificationPopup from'../../Landing/PopUp/NotificationPopup'
import './CartItemPopupHeader.css'
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
  let userName=getName()?getName()[0]:null


  return (
    <>
     <Row>
              <Col lg="10" className="userProfileFilled">
                <PersonFill className="cart_cardbutton ms-4 mb-3 px-1" />
              </Col>
            </Row>
            <Row>
                            <Col lg="10" className="userProfileFilled ms-3 mb-3">
                <u ><small>{userName}</small></u>
              </Col>
            </Row>
            <Row>
              <Col lg="3" />
              <Col lg="1" className="iconsRestaurentView">
                  <AiOutlineHome onClick={handleClickHome} className="homeIcon px-1 "  />
              </Col>
              <Col lg="1" className="iconsRestaurentView">
                  <FiSearch onClick={handleClickSearch} className="SearchIcon px-1 ms-2"/>
              </Col>
              <Col lg="1" className="iconsRestaurentView">
                  <RiNotification3Line className="NotificationIcon px-1 ms-3" 
                  onClick={handleShow}
                  />
              </Col>
              <Col lg="1" className="iconsRestaurentView">
                  <RiShoppingBag3Line className="ShopIcon px-1 ms-4" />
              </Col>
            </Row>
            <Row>
              <Col lg="4" />
              <Col lg="7">
                <Card.Title  className="cardTitle mt-3">Your Cart</Card.Title>
              </Col>
            </Row>
            <small style={{fontWeight:"600"}} className="ms-2">
              Good Food is always cooking! Go ahead,order some
              </small>

              <Row>
                <Col lg="1"/>
<Col lg="9" className="ms-4">
<small style={{fontWeight:"600"}} className="ms-4">Yummy items from the Menu.</small>
                </Col>
              </Row>
             
            <Row>
              <Col lg="6" style={{fontWeight:"700"}} className="ms-2 mt-1">
                <small>Do You Really Need Cutlery? </small>
              </Col>
              <Col lg="2">
                <Switch defaultChecked />
              </Col>
            </Row>
            <NotificationPopup show={show} closePopUp={closePopUp}/>

    </>
  )
}

export default CartItemPopupHeader