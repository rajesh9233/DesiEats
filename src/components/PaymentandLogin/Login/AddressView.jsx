import { React, useState } from "react";
import { Col, Row, Button, Card } from "react-bootstrap";
import Location from "../../Landing/Location/Location";
import { connect } from "react-redux";
import { AddressVals } from "../../../constants/HomePageResponse";
import "./AddressView.css";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

import LocationComponent from "../../Landing/Location/LocationComponent";
function AddressView({ addressdata }) {
  let navigate = useNavigate();
const navigateToProfile=()=>{
  navigate("/profile",{addressView:true});

}
// dispatch()
  const [showLocation, setShowLocation] = useState(false);
  const showLocationPopup = () => setShowLocation(true);

  const LocationPopUp = (value) => {
    setShowLocation(value);
  };
  // console.log(addressdata.AddressView)
  console.log(
    AddressVals.unit_number,
    AddressVals.street_address,
    AddressVals.street_address,
    AddressVals.pin_address,
    AddressVals.postal_code
  );

  return (
    <>
      <Row>
        <Col lg="1" />
        <Col lg="6">
          <p className="mb-1 " style={{ fontWeight: "700", fontSize: "120%" }}>
            Delivery Address
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="1" />
        <Col lg="5">
          <Card className="AddressCard mt-2">
            <Row>
              <Col lg="12" className="mt-4 mb-3">
                <b>
                  {" "}
                  <GrLocation className="HomeLocationPayment mx-2"/>
                  Home
                </b>
              </Col>
            </Row>
            <Row>
              <Col lg="1" />
              <Col lg="9" className="mb-5">
                <small className="DeliveryAddressPaymentPage ">
                  <span className="address">Address :</span>
                  <small>
                    {AddressVals.unit_number},{AddressVals.street_address},
                    {AddressVals.street_address},{AddressVals.pin_address},
                    {AddressVals.postal_code}
                  </small>
                </small>

                <br />
                {/* <small><span className="address">Note to rider :</span>None</small>
                <br />
                <small><span className="address">43 Mins</span></small>
                <br /> */}
              </Col>
            </Row>

            {/* <Row>
              <Col lg="4" />
              <Col lg="8" className="mb-4">
                <Button className="delivere_here">Delivere Here</Button>
              </Col>
            </Row> */}
          </Card>
        </Col>
        <Col lg="5" className="ms-3">
          <Card className="AddAddress  mt-2" style={{ width: "100%" }}>
            <Row>
              <Col lg="12" className="AddNewAddressPayment mt-4 mb-4">
                <b><MdOutlineAddLocationAlt className="AddAddressPayment mx-2"/>Add New Address</b>
              </Col>
            </Row>
            <Row>
              <Col lg="3" />

              <Col lg="6" className="mb-5">
                <Button className="Add_new mb-2" onClick={navigateToProfile}>
                  ADD NEW
                </Button>
              </Col>
              <Col lg="3" />
            </Row>
          </Card>
        </Col>
      </Row>
      <Location />

      <Row>
        <Col lg="1" />
        <Col lg="10">
          <hr className="mt-5 mb-5 " />
        </Col>
      </Row>
      <Location showLocation={showLocation} LocationPopUp={LocationPopUp} />
    </>
  );
}
// const mapStateToProps = state => {
//   return {
//     addressdata:state.addressdata,
//  }
// }
// connect(mapStateToProps,null)
export default AddressView;
