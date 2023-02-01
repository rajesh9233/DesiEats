import { React, useState,useEffect } from "react";
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


      const getNotificationsApi = async () => {
        let getNotificationsObject = {
          selected_tab: "1",
          page: "1",
          limit:"10"
        };
        try {
            let notificationsApiApiResponse = await listAllNotificationApi(getNotificationsObject);
            // setUserList()
            setNotifications(notificationsApiApiResponse.data.data)
         
        } catch (e) {}
      };
    
  //toggle button open close
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const navigateToHome=()=>{
    navigate("/")

  }
  //SearchPopup close
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const closePopUp = (value) => {
    setShow(value);
  };

  //NotificationPopup close

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => 
  {
    setShow1(true);
    getNotificationsApi()


  }
  const closePopUp1 = (value) => {
    setShow1(value);
  };

  //CartPopup close
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => setShow2(true);
  const closePopUp2 = (value) => {
    setShow2(value);
  };

  return (
    <>
      <Col lg="3" md="1" sm="1" xs="2" className="mt-3">
        <div>
          <Collapse in={open} dimension="width">
            <Button className="menu1  ms-1" onClick={navigateToHome}>
              <AiOutlineHome />
            </Button>
          </Collapse>
          <Collapse in={open} dimension="width">
            <Button className="menu2 ms-3 " onClick={handleShow}>
              <FiSearch />
            </Button>
          </Collapse>
          <Collapse in={open} dimension="width">
            <Button className="menu3 ms-3  " onClick={handleShow1}>
              <RiNotification3Line />
            </Button>
          </Collapse>
          <Collapse in={open} dimension="width">
            <Button className="menu4 ms-3 " onClick={handleShow2}>
              <RiShoppingBag3Line />
            </Button>
          </Collapse>
        </div>

        <Button
          className="menu "
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
      </Col>

      <SearchPopup show={show} closePopUp={closePopUp}/>
      <NotificationPopup show={show1} closePopUp={closePopUp1}  notifications={notifications}/>
      <CartPopup show={show2} closePopUp={closePopUp2} />
    </>
  );
}

export default ToggleMenuButton;
