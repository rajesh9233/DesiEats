import { React, useState, useEffect } from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import "../../../Landing/Location/Location.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { updateDeliveryAddressApi } from "../../../../services/ProfilePageServices";
import { AddressTypes } from "../../../../constants/Utils";

function UpdateAddressPopup({
  editLocation,
  editPopUp,
  AllAddressDataApi,
  addressData,
}) {
  const [tabValue, setTabValue] = useState("");
  const [tabId, setTabId] = useState("");
  const [markusError, setMarkUsError] = useState();

  const initialValues = {
    pin_address: "",
    street_address: "",
    unit_number: "",
    postal_code: "",
  };

  const validationSchema = yup.object({
    pin_address: yup
      .string()
      .required("This Field Can't Be Empty!")
      .min(8, "Enter Minimum 8 Characters"),

    street_address: yup.string().required("This Field Can't Be Empty!"),
    unit_number: yup.string().required("This Field Can't Be Empty!"),
    postal_code: yup
      .string()
      .required("Enter Your Postal Code")
      .matches(/^[0-9\b]+$/, "Please Enter Digits Only")
      .min(6, "Enter 6 digits PostalCode"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    formik.setFieldValue("pin_address", addressData?.pin_address);
    formik.setFieldValue("street_address", addressData?.street_address);
    formik.setFieldValue("unit_number", addressData?.unit_number);
    formik.setFieldValue("postal_code", addressData?.postal_code);

    if (addressData?.label_type) {
      AddressTypes.map((data) => {
        if(data.id == addressData?.label_type){
          setTabId(data.id);
          setTabValue(data.value)
        }
      })
    }
  }, [addressData]);

  const CloseLocationPopUp = () => {
    formik.resetForm({
      values: initialValues,
    });
    editPopUp(false); //callback function
  };
  const handleClicked = (item) => {
    setTabValue(item.value);
    setTabId(item.id);
  };
  const showmarkUsError = () => {
    if (tabValue === "") {
      setMarkUsError("Please Select Address Type!");
    } else {
      setMarkUsError();
    }
  };

  const handleBlur = () => {
    if (tabValue !== "") {
      setMarkUsError();
    } else {
      setMarkUsError("Please Select Address Type!");
    }
  };
  const updateAddressDataApi = async (item) => {
    let postupdateAddressObj = {
      address_id: addressData?.id,
      latitude: "22.94064340",
      longitude: "78.52852000",
      pin_address: formik.values.pin_address,
      unit_number: formik.values.unit_number,
      street_address: formik.values.street_address,
      postal_code: formik.values.postal_code,
      address_type: tabId,
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0 &&
        tabValue !== ""
      ) {
        let updateDeliveryAddressApiResponse = await updateDeliveryAddressApi(
          postupdateAddressObj
        );
        if (updateDeliveryAddressApiResponse.status === 200) {
          CloseLocationPopUp();
          AllAddressDataApi();
        }
      }
    } catch (e) {}
  };
  return (
    <>
      <Modal show={editLocation} onHide={CloseLocationPopUp} animation={true}>
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
                  <Form.Control
                    name="firstname"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Address Line 1"
                    id="pin_address"
                    value={formik.values.pin_address}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps("pin_address")}
                  ></Form.Control>
                  {formik.touched.pin_address && formik.errors.pin_address && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.pin_address}
                    </div>
                  )}

                  <Form.Label>BLK/House/Apartment No</Form.Label>
                  <Form.Control
                    name="street_address"
                    id="street_address"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your BLK/House/Apartment No"
                    {...formik.getFieldProps("street_address")}
                  ></Form.Control>
                  {formik.touched.street_address &&
                    formik.errors.street_address && (
                      <div className="mb-2" style={{ color: "red" }}>
                        {formik.errors.street_address}
                      </div>
                    )}
                  <Form.Label>Unit Number</Form.Label>
                  <Form.Control
                    name="unit_number"
                    id="unit_number"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Unit Number"
                    {...formik.getFieldProps("unit_number")}
                  ></Form.Control>
                  {formik.touched.unit_number && formik.errors.unit_number && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.unit_number}
                    </div>
                  )}
                  <Form.Label> Postal Code</Form.Label>
                  <Form.Control
                    name="lastname"
                    className="form-control mt-2 mb-2"
                    placeholder="Enter Your Postal Code"
                    id="postal_code"
                    maxLength="6"
                    {...formik.getFieldProps("postal_code")}
                  ></Form.Control>
                  {formik.touched.postal_code && formik.errors.postal_code && (
                    <div className="mb-2" style={{ color: "red" }}>
                      {formik.errors.postal_code}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
            <p className="ms-2"> Mark as</p>
            <Container>
              <Row className="column-gap mb-3">
                {/* <Col lg="3" md="3" sm="3">
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
                </Col> */}
                {AddressTypes.map((data) => {
                  return (
                    <Col lg="3" md="3" sm="3">
                      <Button
                        id="home"
                        onBlur={handleBlur}
                        className={
                          tabValue === data.value
                            ? "activeclassTabValue "
                            : "office_button"
                        }
                        onClick={() => handleClicked(data)}
                      >
                        {data.value}
                      </Button>
                    </Col>
                  );
                })}
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
                      updateAddressDataApi();
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

export default UpdateAddressPopup;
