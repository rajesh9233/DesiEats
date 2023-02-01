import { React, useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Container,
  Badge,
  FormSelect,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
// import Location from "../../Landing/Location/Location";
// import { connect } from "react-redux";
// import { HomepageDetail } from "../../../constants/TrendingBestSellerResponse";
// import { AddressVals } from "../../../constants/HomePageResponse";
// import image1 from "../../../Asserts/banners/image1.jpg";
// import image2 from "../../../Asserts/banners/image2.jpg";
import { PersonFill } from "react-bootstrap-icons";
import ToggleMenuButton from "../../Landing/Items/ToggleMenuButton";
import DesiEatsImage from "../../Landing/Items/DesiEatsImage";
import { sessionLocationData } from "../../../constants/Utils";
import "./MenuHeader.css";
import { getBannerValue } from "../../../services/HomePageServices";
import { ImLocation } from "react-icons/im";
import { useLocation } from "react-router-dom";
import { addressValuesSession, addressId,addressDatasValues } from "../../../constants/Utils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getName } from "../../../constants/Utils";
function MenuHeader({}) {
  //addressdata,tabvalue
  // let user=JSON.parse(sessionStorage.getItem("otpResponse"))
  // let userName=user?.name
  // let [firstName] = userName?.split(' ');
  let userName = getName() ? getName()[0] : null;

  // console.log(HomepageDetail.ad_banners[0].image_url);
  const location = useLocation();
  // console.log(addressdata)
  // console.log(tabvalue)
  // let userResponse = JSON.parse(sessionStorage.getItem("otpResponse"));
  // console.log(userResponse)
  let navigate = useNavigate();
  const navigateToProfile = () => {
    navigate("/profile");
  };
  // console.log(AddressVals.unit_number);

  //  let HeaderAddressType=tabvalue?tabvalue:null
  //  console.log(HeaderAddressType)
  // console.log(addressValuesSession().user_unit_number)
  const HomePageDataItems = useSelector(
    (state) => state.counter.homepagedatadeatils
  );
  const bannerImage = HomePageDataItems?.ad_banners;

  // console.log(bannerImage);
const[loginAddress,setLoginAddress]=useState()
useEffect(()=>{
  setLoginAddress(addressDatasValues())

},[])

let menuHeaderData=Object.keys( sessionLocationData())?.length

  return (
    <>
      <Row>
        <DesiEatsImage />

        <Col lg="4" md="6" sm="6" xs="1" className=" mt-3">
          <Badge className="Address_Badge_header mt-2">
            <Row>
              <Col lg="2" className="mt-2 ms-2">
                <small className="DeliveryTo ">Delivering To</small>
              </Col>

              {/* <Col lg="1"className="mt-1 "> */}

              {/* {(HeaderAddressType==="Home")?
      <AiFillHome className="Home_Icon ms-4 px-1 "/>:
      
      HeaderAddressType==="Office"?
"office":"others"}
      </Col>
      <Col lg="1" className="home_button_text mt-2 ms-4">
    <span >{HeaderAddressType?.HeaderAddressType}</span> */}
              {/* </Col> */}
              <Col lg="1">
                <ImLocation className="LocationIconHeader ms-3 mt-1" />
              </Col>
              <Col lg="8">
                <FormSelect className="address_view_data">
                  {/* <option>{addressdata.addressLine}{addressdata.house}{addressdata.UnitNumber}
{addressdata.postalCode}</option>  */}
                  <option>
                    {/* addressValuesSession -otp response */}
                    {menuHeaderData!==0? sessionLocationData()?.pin_address +",":null}
                   
                    {menuHeaderData!==0?sessionLocationData().street_address +",":null}
                    
                    {menuHeaderData!==0?sessionLocationData().postal_code +",":null}
                   
                    {menuHeaderData!==0?sessionLocationData().unit_number +",":null}
                  </option>
                </FormSelect>
              </Col>
            </Row>
          </Badge>
        </Col>
        <ToggleMenuButton />
        <Col lg="2" md="2" sm="2">
          <Button onClick={navigateToProfile} className="sign mt-3 ">
            <PersonFill></PersonFill>
            <small>{userName}</small>
            {/* <small className="mx-1">{userName?firstName:null}</small> */}
          </Button>
        </Col>
      </Row>

      {/*------------------------- BANNER IMAGE DISPLAY------------------------------------------------ */}
      <Container>
        <Row className="mt-2">
          <Carousel className="trendingCarousel">
            {bannerImage?.map((item, index) => (
              <Carousel.Item>
                <Col lg="12" md="11" sm="11" className="mt-5 ">
                  <img
                    src={item.image_url}
                    alt="no valid data"
                    className="
         BannerImageHome 
         img-responsive img-portfolio img-hover
         img-fluid "
                  />
                </Col>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </Container>
    </>
  );
}
// const mapStateToProps = state => {
//   return {
//     addressdata:state.addressdata,
//     tabvalue:state.tabvalue
//  }
// }
// connect(mapStateToProps)
export default MenuHeader;
