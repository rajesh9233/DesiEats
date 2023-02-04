import { React, useState, useEffect } from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import { useSelector, useDispatch } from "react-redux";
import "./Location.css";
import { useFormik } from "formik";
import { addressId } from "../../../constants/Utils";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { getUserType } from "../../../constants/Utils";
import {
  addressdatas,
  tabvaluedata,
  langDataMethod,
  latDataMethod,
} from "../../../containers/app/features/CounterSlice";
import { addressValuesSession } from "../../../constants/Utils";
import {
  LocationPopupApi,
  postalcodeAPI,
} from "../../../services/Landingservice";

function Location({ resetForm, LocationPopUp, showLocation, tabValueData }) {
  const AddressDatas = useSelector((state) => state.counter.addressdatavalues);
  const tabval = useSelector((state) => state.counter.tabvalue);
  const latval = useSelector((state) => state.counter.latdatas);

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
      Geocode.fromAddress(value.label).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatLong({ lat, lng });
          postalcodeAPI(lat, lng).then((response) =>
            formik.setFieldValue(
              "postal_code",
              response.data.results[0].address_components[
                response.data.results[0].address_components.length - 1
              ].long_name
            )
          );
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

  let navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };

  const getLocationPopupApi = async () => {
    let locationPopUpObject = {
      latitude: "75.00003",
      longitude: "62.0215487",
      pin_address: value?.label,
      unit_number: formik.values.UnitNumber,
      street_address: formik.values.house,
      postal_code: formik.values.postal_code,
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
          sessionStorage.setItem("isFirstTimeOpenPopup", true);
        }

        if (LocationApiResponse.status === 200) {
          navigateToHome();
        }
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
    }
  };

  const initialValues = {
    addressLine: "",
    house: "",
    UnitNumber: "",
    postal_code: "",
  };
  const onSubmit = (values) => {
    //Pass data through state in useNavigation
    // if (values !== null) {
    //   navigate("/home", {
    //     state: {
    //       addressLine: formik.values.addressLine,
    //       postal_code: formik.values.postal_code,
    //     },
    //   });
    // }
    //}
  };

  const validationSchema = yup.object({
    house: yup.string(),
    UnitNumber: yup.string(),

    postal_code: yup
      .string()
      .required("Enter Your Postal Code")
      .matches(/^[0-9\b]+$/, "Please Enter Digits Only")
      .min(6, "Enter 6 digits postal_code"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    formik.resetForm({
      values: {
        addressLine: "",
        house: "",
        UnitNumber: "",
        postal_code: "",
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
          <Col lg="10">
            <Modal.Title className="ms-2 mt-1">
              <b>Choose location</b>
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
                <div className="input-style">
                  <Form.Label> Address Line 1</Form.Label>
                  <GooglePlacesAutocomplete
                    apiKey="AIzaSyAZNYje65H5kEiuMuF_gFmDwloZLmuIv-I"
                    selectProps={{
                      value,
                      onChange: setValue,
                    }}
                  />
                </div>
                <div className="input-style">
                  <Form.Label>BLK/House/Apartment No</Form.Label>
                  <Form.Control
                    name="house"
                    id="house"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your BLK/House/Apartment No"
                    {...formik.getFieldProps("house")}
                  ></Form.Control>
                </div>
                <div className="input-style">
                  <Form.Label>Unit Number</Form.Label>
                  <Form.Control
                    name="UnitNumber"
                    id="UnitNumber"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Unit Number"
                    {...formik.getFieldProps("UnitNumber")}
                  ></Form.Control>
                </div>
                <div className="input-style">
                  <Form.Label> Postal Code</Form.Label>
                  <Form.Control
                    name="lastname"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Postal Code"
                    id="postal_code"
                    maxLength="6"
                    disabled={true}
                    {...formik.getFieldProps("postal_code")}
                  ></Form.Control>
                  {formik.touched.postal_code && formik.errors.postal_code && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.postal_code}
                    </div>
                  )}
                </div>
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
                    office
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
                    other
                  </Button>
                </Col>
                <p className="mt-2" style={{ color: "red" }}>
                  {markusError}
                </p>
              </Row>
            </Container>
            <Container>
              <Row>
                <Button
                  className="confirm_btn "
                  type="submit"
                  onClick={() => {
                    getLocationPopupApi();
                    showmarkUsError();
                  }}
                >
                  Confirm & Proceed
                </Button>
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
