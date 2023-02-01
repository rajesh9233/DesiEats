import { React, useState, useEffect } from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import "../../../Landing/Location/Location.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addressdatas,tabvaluedata } from "../../../../containers/app/features/CounterSlice";
import swal from "sweetalert";
import { addDeliveryAddressApi } from "../../../../services/ProfilePageServices";
function AddAddressPopup({LocationPopUp, showLocation,resetForm,AllAddressDataApi
}) {

    const CloseLocationPopUp = () => {
        LocationPopUp(false); //callback function
      };
      const [tabValue, setTabValue] = useState("");
      const handleClicked = (value) => {
        setTabValue(value);
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
          .required("This Field Can't Be Empty!")
          .min(8, "Enter Minimum 8 Characters"),
    
        house: yup.string().required("This Field Can't Be Empty!")
        ,
        UnitNumber: yup.string().required("This Field Can't Be Empty!")
        ,
    
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
     //add_delivery_address Api
     const latLangDatas = useSelector((state) => state.counter);
console.log(latLangDatas)
  const addAddressDataApi = async () => {

    let postAddAddressObj = {
      latitude: "80.25478521",
      longitude: "90.2547856",
      pin_address:formik.values.addressLine,
      unit_number: formik.values.UnitNumber,
      street_address: formik.values.house,
      postal_code: formik.values.postalCode,
      address_type:tabValue ,
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0 && 
        tabValue!==""
      ) {
      let addDeliveryAddressApiResponse = await addDeliveryAddressApi(
        postAddAddressObj
      );
      if(addDeliveryAddressApiResponse.status===200){
        CloseLocationPopUp()
        AllAddressDataApi()
      }
      }
    } catch (e) {}
  };
  return (
    <>
     <Modal show={showLocation} onHide={CloseLocationPopUp} animation={true}>
        <Modal.Header className="locationPopUp_Header border-0" closeButton>
          {/* <Col lg="1"></Col> */}
          <Col lg="10" >
            <Modal.Title className="ms-2 mt-1">
              <b>Choose location</b>
              {/* <App/> */}
            </Modal.Title>
            <hr width="80%"  className="ms-2" ></hr>
          </Col>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit} id="users" className="locationPopupForm">
          <Modal.Body>
            <Container>
              <Row>
                <Col lg="11" md="11" sm="11" xs="11">
                  <p></p>
                  <Form.Label> Address Line 1</Form.Label>
                  <Form.Control
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
                  )}

                  <Form.Label>BLK/House/Apartment No</Form.Label>
                  <Form.Control
                    name="house"
                    id="house"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your BLK/House/Apartment No"
                    {...formik.getFieldProps("house")}
                  ></Form.Control>
                    {formik.touched.house && formik.errors.house && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.house}
                    </div>
                  )}
                  <Form.Label>Unit Number</Form.Label>
                  <Form.Control
                    name="UnitNumber"
                    id="UnitNumber"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Unit Number"
                    {...formik.getFieldProps("UnitNumber")}
                  ></Form.Control>
  {formik.touched.UnitNumber && formik.errors.UnitNumber && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.UnitNumber}
                    </div>
                  )}
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
                      tabValue === "Home" ? "activeclassTabValue " : "office_button"
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
                      tabValue === "Office" ? "activeclassTabValue " : "office_button"
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
                      tabValue === "Other" ? "activeclassTabValue " : "office_button"
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
                      showmarkUsError();
                      addAddressDataApi();
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
  )
}

export default AddAddressPopup