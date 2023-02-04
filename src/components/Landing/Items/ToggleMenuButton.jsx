import { React, useState, useEffect } from "react";
import { Col, Button, Collapse } from "react-bootstrap";
import { Grid3x3GapFill } from "react-bootstrap-icons";
import { AiOutlineHome } from "react-icons/ai";
import { RiShoppingBag3Line, RiNotification3Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import "./DesiEatsImage.css";
import { useNavigate } from "react-router-dom";
import { listAllNotificationApi } from "../../../services/Landingservice";
import NotificationPopup from "../PopUp/NotificationPopup";
import SearchPopup from "../PopUp/SearchPopUp";
import CartPopup from "../PopUp/CartPopup";
import ThreeDotsImage from "../../../Asserts/landingpage/Circled Menu.png";
function ToggleMenuButton() {
  //Get values for hear about us API
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCart, setShowCart] = useState(false);

  let navigate = useNavigate();

  const getNotificationsApi = async () => {
    let getNotificationsObject = {
      selected_tab: "1",
      page: "1",
      limit: "10",
    };
    try {
      let notificationsApiApiResponse = await listAllNotificationApi(
        getNotificationsObject
      );
      setNotifications(notificationsApiApiResponse.data.data);
    } catch (e) {}
  };

  //toggle button open close
  const navigateToHome = () => {
    navigate("/");
  };

  //SearchPopup close
  const handleSearch = () => setShowSearch(true);
  const closeSearchPopUp = (value) => {
    setShowSearch(value);
  };

  //NotificationPopup close
  const handleNotification = () => {
    setShowNotification(true);
    getNotificationsApi();
  };
  const closeNotificationPopUp = (value) => {
    setShowNotification(value);
  };

  //CartPopup close
  const handleCart = () => setShowCart(true);
  const closeCartPopUp = (value) => {
    setShowCart(value);
  };

  return (
    <>
      <div className="toggle-container">
        <div className="button-container">
          <Collapse in={open} dimension="width">
            <div id="example-collapse-text" className="button-toggle">
              <Button className="menuButton" onClick={navigateToHome}>
                <AiOutlineHome />
              </Button>
              <Button className="menuButton" onClick={handleSearch}>
                <FiSearch />
              </Button>
              <Button className="menuButton" onClick={handleNotification}>
                <RiNotification3Line />
              </Button>
              <Button className="menuButton" onClick={handleCart}>
                <RiShoppingBag3Line />
              </Button>
            </div>
          </Collapse>
        </div>
        <Button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <img
            src={ThreeDotsImage}
            alt="No icon"
            className="ThreeDotsIcon"
          ></img>
        </Button>
      </div>

      <SearchPopup show={showSearch} closePopUp={closeSearchPopUp} />
      <NotificationPopup
        show={showNotification}
        closePopUp={closeNotificationPopUp}
        notifications={notifications}
      />
      <CartPopup show={showCart} closePopUp={closeCartPopUp} />
    </>
  );
}

export default ToggleMenuButton;
