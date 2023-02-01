import {React,useState,useEffect} from "react";
import { Container, Col, Row, Button, Card, Dropdown } from "react-bootstrap";
import profile from "../../Asserts/Cartview/profile.png";
import HorizantalBorder from "./HorizantalBorder";
import { GiWallet } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi";
import { ProfiledetailApi } from "../../services/ProfilePageServices";
import DineinCart from "./Orders/DineIn/DineinCart";
import Myorders from "./Orders/Myorders";
import { useLocation } from "react-router-dom";
import { updateProfiledetailApi } from "../../services/ProfilePageServices";
import Wallets from "./Wallet/Wallets";
import Address from "./Address/Address";
import Terms from "./TermsCondition/Terms";
import MyorderTrackPopup from "./Popup/MyOrder/MyorderTrackPopup";
import Favourite from "./Favourite/Favourite";
import { GrMap } from "react-icons/gr";
import { getUserData } from "../../constants/Utils";
import { getName } from "../../constants/Utils";
import './ProfilePage.css'
import ProfileData from "./Popup/MyOrder/ProfileData";
function CartView() {
  let userName=getName()?getName()[0]:null

  //Active class
  const [active,setActive]=useState(true)

  const location = useLocation()

// show myorder or dine in
const [showorder,setShowOrder]=useState(true)
const [myorder,setMyorder]=useState("1")
const [tabValue,setTabValue] = useState("1")
// useEffect(()=>{

//   console.log(location.state.addressView)

// },[])
const handleClicked = (value) => {
setTabValue(value)
}
// console.log(tabValue)
const handleClick=(value)=>{
  setMyorder(value)
}
const [showLocation, setShowLocation] = useState(false);
const showLocationPopup = () => setShowLocation(true);

const LocationPopUp = (value) => {
  setShowLocation(value);
};
const [profileDetailsData, setProfileDetailsData] = useState([]);

useEffect(() => {
  const ProfiledetailValuesApi = async () => {
    let postProfiledetailObject = {
    };

    try {
      let ProfiledetailResponse = await ProfiledetailApi(
        postProfiledetailObject
      );
      setProfileDetailsData(ProfiledetailResponse.data.data);
      // window.location.reload(true); //refresh the page
    } catch (e) {}
  };
  ProfiledetailValuesApi();
}, []);

const updateProfiledetailValuesApi = async () => {
  let postUpdateProfiledetailObject = {
    fullname: "Dinesh New",
    email: "dinesh@gmail.com",
    mobile:"90038188",
  };

  try {
    let updateProfiledetailResponse = await updateProfiledetailApi(
      postUpdateProfiledetailObject
    );
    // console.log(updateProfiledetailResponse);
    // window.location.reload(true); //refresh the page
  } catch (e) {}
};

  return (
    <>
      <Container className="mt-5">
        {showorder===(tabValue==="1")?( <Row>
          <Col lg= "6"/>
          <Col lg="2" style={{fontWeight:"700",fontSize:"140%"}}>
           <p className= {tabValue==="1"&&myorder==="1" ?"order":"nullOrder"}
  onClick={() => handleClick("1")}> My Orders</p> 
          </Col>
          <Col lg="2" style={{fontWeight:"700",fontSize:"140%"}}>
            <p className= {tabValue==="1"&&myorder==="2" ?"order":"nullOrder"}
 onClick={() => handleClick("2")}>Dine In</p>
          </Col>
        </Row>):null}
       
        <Row>
          <Col lg="2">
            <Card className="ProfileCard" style={{ width: "18rem", borderRadius: "none" }}>
              <Card.Body>
                <Row>
                  <Col lg="3" />
                  <Col lg="6">
                    <img src={profile} width="100%" alt="profile" />
                  </Col>
                </Row>
<Row>
  <Col lg="12">
  <Card.Title className="UserNameProfilePage mt-2 ms-2" onClick={showLocationPopup}>{userName?userName:userName===null?"Sign Up":null}</Card.Title>

  </Col>
</Row>

                <Row>
                  <Col lg="12" className="EmailIdProfilePage">
                    <small>{getUserData()?.email}</small>
                  </Col>
                </Row>
                <HorizantalBorder />

                <Row>
                  <Col lg="2" />
                  <Col lg="8">
                    <p className={active===(tabValue==="1")?"active":null} onClick = {() => handleClicked("1")}>
                      <HiShoppingBag style={{ height: "1%", width: "15%" }} 
/>
                   <small>My Order</small>   
                    </p>
                  </Col>
                </Row>
                <HorizantalBorder />

                <Row>
                  <Col lg="2" />
                  <Col lg="8">
                    <p className={active===(tabValue==="2")?"active":null}onClick = {() => handleClicked("2")}>
                      <GiWallet style={{ height: "1%", width: "15%" }}

/> Wallet
                    </p>
                  </Col>
                </Row>
                <HorizantalBorder />
                <Row>
                  <Col lg="2" />
                  <Col lg="8">
                    <p className={active===(tabValue==="3")?"active":null} onClick = {() => handleClicked("3")}>
                      <GrMap style={{ height: "1%", width: "15%" }} />{" "}
                      Address
                    </p>
                  </Col>
                </Row>
                <HorizantalBorder />
                <Row>
                  <Col lg="2" />
                  <Col lg="8" className="">
                    <p  className={active===(tabValue==="4")?"active":null}onClick = {() => handleClicked("4")}>
                      <GiWallet style={{ height: "1%", width: "15%" }}  />{" "}
                      Favourite
                    </p>
                  </Col>
                </Row>
                <HorizantalBorder />
                <Row>
                  <Col lg="2" />
                  <Col lg="8">
                    <p  className={active===(tabValue==="5")?"active":null}onClick  = {() => handleClicked("5")}>
                      <GiWallet style={{ height: "1%", width: "15%" }}/> Terms
                      & Condition
                    </p>
                  </Col>
                </Row>
                <HorizantalBorder />
                <Row>
                  <Col lg="2" />
                  <Col lg="10">
                    <Row>
                      <Col lg="9">
                      <p className={active===(tabValue==="6")?"active mb-5":"mb-5"}  onClick = {() => handleClicked("6")}>
                      <GiWallet style={{ height: "1%", width: "15%" }} />{" "}
                      Contact Us </p>
                      </Col>
                      {/* <Col lg="2">
                      <Dropdown className="chat_with_us_dropdown ">
      <Dropdown.Toggle variant="chat_with_us_dropdown Secondary" >
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item >Action</Dropdown.Item>
        <Dropdown.Item >Another action</Dropdown.Item>
        <Dropdown.Item >Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                      </Col> */}
                    </Row> 
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {/* Card2---------------------*/}

          {tabValue==="1"&&myorder==="1" ?<Myorders/>:null}
          {tabValue==="1"&&myorder==="2" ?<DineinCart/>:null}

          {tabValue==="2"?<Wallets/>:null}
          {tabValue==="3"?<Address/>:null}
          {tabValue==="4"?<Favourite/>:null}
          {tabValue==="5"?<Terms/>:null}
          {tabValue==="6"?tabValue:null}
          {myorder===2?<DineinCart/>:null}

        </Row>
      </Container>
      <ProfileData showLocation={showLocation} LocationPopUp={LocationPopUp} profileDetailsData={profileDetailsData} />
    </>
  );
}

export default CartView;
