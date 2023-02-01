import { React, useState, useEffect } from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import { useSelector, useDispatch } from "react-redux";
import "./Location.css";
import { useFormik } from "formik";
import { addressId } from "../../../constants/Utils";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { connect } from "react-redux";
import { getUserType } from "../../../constants/Utils";
import {
  addressdatas,
  tabvaluedata,
  langDataMethod,
  latDataMethod,
} from "../../../containers/app/features/CounterSlice";
import swal from "sweetalert";
import { addressValuesSession } from "../../../constants/Utils";
import PropTypes from "prop-types";
import { LocationPopupApi } from "../../../services/Landingservice";
// import {
//   getAddressData,
//   tabValueData,
// } from "../../RestaurentView/Redux/Actions/counterActions";
import App from "./App";
function Location({ resetForm, LocationPopUp, showLocation, tabValueData }) {
  const AddressDatas = useSelector((state) => state.counter.addressdatavalues);
  const tabval = useSelector((state) => state.counter.tabvalue);
  const latval = useSelector((state) => state.counter.latdatas);

  // console.log(AddressDatas);
  // console.log(latval);
  const dispatch = useDispatch();
  const CloseLocationPopUp = () => {
    LocationPopUp(false); //callback function
  };

  Geocode.setApiKey("AIzaSyAZNYje65H5kEiuMuF_gFmDwloZLmuIv-I");

  Geocode.setLanguage("en");

  Geocode.setRegion("es");

  Geocode.setLocationType("ROOFTOP");

  Geocode.enableDebug();

  const [value, setValue] = useState(null);
  const [latLong, setLatLong] = useState();

  useEffect(() => {
    if (value && value.label) {
      // console.log(value.label);
      Geocode.fromAddress(value.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatLong({lat,lng})
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, [value]);

  const [tabValue, setTabValue] = useState("");
  const handleClicked = (value) => {
    setTabValue(value);
    dispatch(addressdatas(formik.values));
    dispatch(tabvaluedata(tabValue));
    dispatch(latDataMethod(latLong));
  };
  // console.log(latLong?.lat)
  // tabValueData(tabValue);
  //    const Token=loginresponse?.data.data.token
  // console.log(Token)
  // useEffect(() => {
  //   dispatch(addressdatas("catalogOne"));
  //   dispatch(catalogRequest("catalogTwo"));
  //   dispatch(catalogRequest("catalogThree"));
  // }, []);
  let navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };
  // console.log(guestLocationResponse())

  // }
  const getLocationPopupApi = async () => {
    let locationPopUpObject = {
      latitude: "75.00003",
      longitude: "62.0215487",
      pin_address: value?.label,
      unit_number: formik.values.UnitNumber,
      street_address: formik.values.house,
      postal_code: formik.values.postalCode,
      address_type: tabValue,
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0 &&
        tabValue !== ""
      ) {
        let LocationApiResponse = await LocationPopupApi(locationPopUpObject);
        if (addressId === null || addressValuesSession?.address_id !== "0") {
          sessionStorage.setItem("isFirstTimeOpenPopup",true)
        }

        // if (LocationApiResponse.status === 200) {
        //   swal({
        //     title: "Success!",
        //     text: "Your Location Updated SuccessFully!",
        //     type: "success",
        //     timer: 1500,
        //     showCancelButton: true,
        //     showConfirmButton: true,
        //     confirmButtonText: "OK",
        //     className: "popuptetx",
        //     confirmButtonColor: "#8CD4F5",

        //     icon: "success",
        //   });
        // }

        // console.log(addressId?.address_id);
      }
    } catch (e) {}
  };
  const [markusError, setMarkUsError] = useState();
  const showmarkUsError = () => {
    if (tabValue === "") {
      setMarkUsError("Please Select Address Type!");
    } else {
      setMarkUsError();

      // console.log(tabValue);
    }
  };
  //  console.log(AddressDatas)

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
    // addressLine: yup
    //   .string()
    //   .required("This Field Can't Be Empty!"),

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
  useEffect(() => {
    formik.resetForm({
      values: {
        addressLine: "",
        house: "",
        UnitNumber: "",
        postalCode: "",
      },
    });
  }, [resetForm]);
  const handleBlur = () => {
    if (tabValue !== "") {
      setMarkUsError();
    } else {
      setMarkUsError("Please Select Address Type!");
    }
  };

  // console.log(getAddressData(formik.values));
  // const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyCbvsmGKcJvrIoY8AhUgKLYfPumFBI4TKk";

  // const API_KEY = "AIzaSyCbvsmGKcJvrIoY8AhUgKLYfPumFBI4TKk";
  //  var x =
  //  document.getElementById(
  //    "users").length;
  //  console.log(x)
  // const [locationState,setLocationState]=useState()
  // const locationResponseDatas=(value)=>{
  //   setLocationState()
  // }
  return (
    <>
      <Modal show={showLocation} onHide={CloseLocationPopUp} animation={true}>
        <Modal.Header className="locationPopUp_Header border-0" closeButton>
          {/* <Col lg="1"></Col> */}
          <Col lg="10">
            <Modal.Title className="ms-2 mt-1">
              <b>Choose location</b>
              {/* <App/> */}
            </Modal.Title>
            <hr width="80%" className="ms-2"></hr>
          </Col>
        </Modal.Header>
        <Form
          onSubmit={formik.handleSubmit}
          id="users"
          className="locationPopupForm"
        >
          <Modal.Body>
            <Container>
              <Row>
                <Col lg="11" md="11" sm="11" xs="11">
                  <p></p>
                  <Form.Label> Address Line 1</Form.Label>
                  {/* <Form.Control
                    name="firstname"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Address Line 1"
                    id="addressLine"
                    {...formik.getFieldProps("addressLine")}
                  ></Form.Control>
                  {formik.touched.addressLine && formik.errors.addressLine && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.addressLine}
                    </div>
                  )} */}
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyAZNYje65H5kEiuMuF_gFmDwloZLmuIv-I"
                    selectProps={{
                      value,
                      onChange: setValue,
                    }}
                  />
                  <Form.Label>BLK/House/Apartment No</Form.Label>
                  <Form.Control
                    name="house"
                    id="house"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your BLK/House/Apartment No"
                    {...formik.getFieldProps("house")}
                  ></Form.Control>
                  <Form.Label>Unit Number</Form.Label>
                  <Form.Control
                    name="UnitNumber"
                    id="UnitNumber"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Unit Number"
                    {...formik.getFieldProps("UnitNumber")}
                  ></Form.Control>

                  <Form.Label> Postal Code</Form.Label>
                  <Form.Control
                    name="lastname"
                    className="form-control mt-2 mb-2"
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
          key:  "AIzaSyAZNYje65H5kEiuMuF_gFmDwloZLmuIv-I",
          language: "en", // language of the results
        }}
        onPress={(data, details= null) => {
          console.log("data", data);
          console.log("details", details);
          console.log(JSON.stringify(details?.geometry?.location));
        }}
        onFail={(error) => console.error(error)} /> */}

                  {/*

                <App/> */}
                </Col>
              </Row>
            </Container>
            <p className="ms-2"> Mark as</p>
            <Container>
              <Row className="column-gap mb-3">
                <Col lg="3" md="3" sm="3">
                  <Button
                    id="home"
                    onBlur={handleBlur}
                    className={
                      tabValue === "Home"
                        ? "activeclassTabValue "
                        : "office_button"
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
                    onBlur={handleBlur}
                    className={
                      tabValue === "Office"
                        ? "activeclassTabValue "
                        : "office_button"
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
                    onBlur={handleBlur}
                    className={
                      tabValue === "Other"
                        ? "activeclassTabValue "
                        : "office_button"
                    }
                    onClick={() => handleClicked("Other")}
                  >
                    {" "}
                    other{" "}
                  </Button>
                </Col>
                <p className="mt-2" style={{ color: "red" }}>
                  {markusError}
                </p>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col lg="2" md="2" sm="2"></Col>
                <Col lg="8" md="8" sm="8">
                  <Button
                    className="confirm_btn "
                    type="submit"
                    onClick={() => {
                      getLocationPopupApi();
                      showmarkUsError();
                      navigateToHome();

                    }}
                  >
                    Confirm & Proceed
                  </Button>
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
// const mapStateToProps = (state) => {
//   return {
//     loginresponse: state.loginresponse,
//     signupresponse: state.signupresponse,
//     guestresponse: state.guestresponse,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getAddressData: (data) => dispatch(getAddressData(data)),
//     tabValueData: (data) => dispatch(tabValueData(data)),
//   };
// };
// connect(mapStateToProps, mapDispatchToProps)
export default Location;
