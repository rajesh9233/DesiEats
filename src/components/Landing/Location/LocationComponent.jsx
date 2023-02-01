import { React, useState,useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Location.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { connect } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import PropTypes from "prop-types";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { LocationPopupApi } from "../../../services/Landingservice";
import {
  getAddressData,
  tabValueData,
} from "../../RestaurentView/Redux/Actions/counterActions";
import App from "./App";
function LocationComponent({
    resetForm,
    LocationPopUp,
    showLocation,
    loginresponse,
    getAddressData,
    tabValueData,
  }) {
    const CloseLocationPopUp = () => {
        LocationPopUp(false);//callback function
      };
      const [tabValue, setTabValue] = useState("");
      const handleClicked = (value) => {
        setTabValue(value);
      };
      tabValueData(tabValue);
      //    const Token=loginresponse?.data.data.token
      // console.log(Token)
      const getLocationPopupApi = async () => {
        let locationPopUpObject = {
          latitude: formik.values.addressLine,
          longitude: formik.values.house,
          pin_address: "New MGR Road",
          unit_number: formik.values.UnitNumber,
          street_address: "",
          postal_code: formik.values.postalCode,
          valuebutton: tabValue,
        };
    
        try {
          if (
            Object.keys(formik.errors).length === 0 &&
            Object.keys(formik.touched).length !== 0
    
          ) {
    
            let LocationApiResponse = await LocationPopupApi(locationPopUpObject);
    
            if (LocationApiResponse.status === 200) {
              swal({
                title: "Success!",
                text: "Your Location Updated SuccessFully!",
                type: "success",
                timer: 1500,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "OK",
                className: "popuptetx",
                confirmButtonColor: "#8CD4F5",
    
                icon: "success",
              });
            }
            // console.log(LocationApiResponse);
          }
        } catch (e) {}
      };
    
      
      const initialValues = {
        addressLine: "",
        house: "",
        UnitNumber: "",
        postalCode: "",
      };
      const onSubmit = (values) => {
        //Pass data through state in useNavigation 
        // if (values !== null) {
        //   navigate("/home", {
        //     state: {
        //       addressLine: formik.values.addressLine,
        //       postalCode: formik.values.postalCode,
        //     },
        //   });
        // }
      //}
      };
    
      const validationSchema = yup.object({
        addressLine: yup
          .string()
          .required("Please Enter Your Name")
          .min(8, "Enter Minimum 8 Characters"),
    
        house: yup.string(),
        UnitNumber: yup.string(),
    
        postalCode: yup
          .string()
          .required("Enter Your Postal Code")
          .matches(/^[0-9\b]+$/, "Please Enter Digits Only")
          .min(6, "Enter 6 digits PostalCode"),
      });
    
      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
      });
    
      // let userResponse = JSON.parse(sessionStorage.getItem("otpResponse"));
      // console.log(userResponse);
      useEffect(()=>{
        formik.resetForm({
          values: {
            addressLine: "",
            house: "",
            UnitNumber: "",
            postalCode: "",
          }})
        },[resetForm])
    
      // console.log(getAddressData(formik.values));
     const YOUR_GOOGLE_MAPS_API_KEY="AIzaSyCbvsmGKcJvrIoY8AhUgKLYfPumFBI4TKk"
    
     const API_KEY = "AIzaSyCbvsmGKcJvrIoY8AhUgKLYfPumFBI4TKk";
    //  var x =
    //  document.getElementById(
    //    "users").length;
    //  console.log(x)
  return (
    <>
    <Modal show={showLocation} onHide={CloseLocationPopUp} animation={true}>
        <Modal.Header className="modal-header border-0" closeButton>
          <Col lg="1"></Col>
          <Col lg="10">
            <Modal.Title className="mt-3">
              <b> choose location</b>
              {/* <App/> */}
            </Modal.Title>
            <hr size="1" width="80%"></hr>
          </Col>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} id="users">
          <Modal.Body>
            <Container>
              <Row>
                <Col lg="11" md="11" sm="11" xs="11">
                  <p></p>
                  <Form.Label> Address Line 1</Form.Label>
                  <Form.Control
                    name="firstname"
                    className="form-control mt-4 mb-3"
                    placeholder="Enter Your Address Line 1"
                    id="addressLine"
                    {...formik.getFieldProps("addressLine")}
                  ></Form.Control>
                  {formik.touched.addressLine && formik.errors.addressLine && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.addressLine}
                    </div>
                  )}

                  <Form.Label>BLK/House/Apartment No</Form.Label>
                  <Form.Control
                    name="house"
                    id="house"
                    className="form-control mt-3 mb-3"
                    placeholder="Enter Your BLK/House/Apartment No"
                    {...formik.getFieldProps("house")}
                  ></Form.Control>
                  <Form.Label>Unit Number</Form.Label>
                  <Form.Control
                    name="UnitNumber"
                    id="UnitNumber"
                    className="form-control mt-3 mb-3"
                    placeholder="Enter Your Unit Number"
                    {...formik.getFieldProps("UnitNumber")}
                  ></Form.Control>

                  <Form.Label> Postal Code</Form.Label>
                  <Form.Control
                    name="lastname"
                    className="form-control mt-3 mb-3"
                    placeholder="Enter Your Postal Code"
                    id="postalCode"
                    maxLength="6"
                    {...formik.getFieldProps("postalCode")}
                  ></Form.Control>
                  {formik.touched.postalCode && formik.errors.postalCode && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.postalCode}
                    </div>
                  )}

{/* <Autocomplete
  apiKey={YOUR_GOOGLE_MAPS_API_KEY}
  style={{ width: "90%" }}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
  options={{
    types: ["(regions)"],
    componentRestrictions: { country: "ru" },
  }}
  defaultValue="Amsterdam"
/>; */}

{/* <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        placeholder="Search"
        query={{
          key: YOUR_GOOGLE_MAPS_API_KEY,
          language: "en", // language of the results
        }}
        onPress={(data, details= null) => {
          console.log("data", data);
          console.log("details", details);
          console.log(JSON.stringify(details?.geometry?.location));
        }}
        onFail={(error) => console.error(error)} />


                <App/> */}
                                </Col>

              </Row>
            </Container>
            <p>Mark as</p>
            <Container>
              <Row className="column-gap mb-4">
                <Col lg="3" md="3" sm="3">
                  <Button
                    id="home"
                    className={
                      tabValue === "Home" ? "activeclass " : "office_button"
                    }
                    onClick={() => handleClicked("Home")}
                  >
                    {" "}
                    Home
                  </Button>
                </Col>
                <Col lg="3" md="3" sm="3">
                  <Button
                    id="office"
                    className={
                      tabValue === "Office" ? "activeclass " : "office_button"
                    }
                    onClick={() => handleClicked("Office")}
                  >
                    {" "}
                    office{" "}
                  </Button>
                </Col>

                <Col lg="3" md="3" sm="3">
                  <Button
                    id="other"
                    className={
                      tabValue === "Other" ? "activeclass " : "office_button"
                    }
                    onClick={() => handleClicked("Other")}
                  >
                    {" "}
                    other{" "}
                  </Button>
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col lg="2" md="2" sm="2"></Col>
                <Col lg="8" md="8" sm="8">
                {/* <Button
                    className="confirm_btn "
                    type="submit"
                    onClick={()=>{getLocationPopupApi();}}
                  >
                    Confirm & Proceed
                  </Button> */}
                  <br />
                  <br />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loginresponse: state.loginresponse,
    signupresponse: state.signupresponse,
    guestresponse: state.guestresponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAddressData: (data) => dispatch(getAddressData(data)),
    tabValueData: (data) => dispatch(tabValueData(data)),
  };
};
   

export default connect(mapStateToProps, mapDispatchToProps) (LocationComponent)