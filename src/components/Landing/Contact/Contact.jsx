import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaTelegramPlane } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import { AiOutlineMail} from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { contactUsLandingApi } from "../../../services/Landingservice";
import { useFormik } from "formik";
import * as yup from "yup";
import swal from "sweetalert";

import "./Contact.css";

function Contact() {
  //Contact us API
  const contactUsApi = async () => {
    let postConatctUsObj = {
      fullname: formik.values.fullName,
      email: formik.values.email,
      subject: formik.values.subject,
      message: formik.values.Message,
    };

    try {
      if (
        Object.keys(formik.errors).length === 0 &&
        Object.keys(formik.touched).length !== 0
      ) {
        let contactUsApiResponse = await contactUsLandingApi(postConatctUsObj);
        if (contactUsApiResponse.status === 200) {
          swal({
            title: "Success!",
            text: "Email sent successfully. Thank You!",
            type: "success",
            timer: 1500,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "OK",
            className: "popuptetx",
            confirmButtonColor: "#8CD4F5",
            icon: "success",
          });
          formik.resetForm();
        }

        // console.log(contactUsApiResponse);
      }
    } catch (e) {}
  };

  //Contact us validation

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      subject: "",
      Message: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        // .min(8, "Mininum 8 characters")
        .required("Please Enter Your Name!"),
      email: yup
        .string()
        .email("Please Enter Valid Email Address")
        .required("Email Field Is Required!"),
      subject: yup
        .string()
        // .min(8, "Mininum 8 characters")
        .required("This Field Can't Be Empty!"),
      Message: yup
        .string()
        // .min(8, "Mininum 8 characters")
        .required("This Field Can't Be Empty!"),
    }),
    onSubmit: (values) => {},
  });

  return (
    <>
      {/*----------------------------------CONTACT US---------------------------------------------*/}

      <Container>
        <Row>
          <Col lg="1" md="1" sm="1"></Col>
          <Col lg="10" md="10" sm="10" xs="12">
            <h1 className="contact mt-5">Contact Us</h1>
            <Row>
              <Col lg="5" />
              <Col lg="5">
                <hr size="8" width="90%" className="contactUsformLine ms-3 mb-4" />
              </Col>
            </Row>

            <h4 className="SendMessageAddress ms-3">
              Address: 22 Sin Ming Ln, #06-76 Midview city, singapore 573969
            </h4>
          </Col>
        </Row>

        <Row>
          <Col lg="4" md="3" sm="3" xs="3"></Col>
          <Col lg="5" md="5" sm="5" xs="9" className="contact_form">
            <Form onSubmit={formik.handleSubmit} className="ContactUsForm">
              <Form.Control
                type="text"
                className="name mt-4"
                placeholder="Name"
                id="fullName"
                name="fullName"
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="ms-3" style={{ color: "red" }}>
                  {formik.errors.fullName}
                </div>
              )}

              <Form.Control
                className="name mt-4"
                placeholder="E-mail"
                id="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="ms-3 " style={{ color: "red" }}>
                  {formik.errors.email}
                </div>
              )}

              <Form.Control
                className="name mt-4 "
                placeholder="Subject"
                type="text"
                name="subject"
                id="subject"
                {...formik.getFieldProps("subject")}
              />
              {formik.touched.subject && formik.errors.subject && (
                <div className="ms-3 " style={{ color: "red" }}>
                  {formik.errors.subject}
                </div>
              )}
              <textarea
                style={{ resize: "none" }}
                className="form-control message_box   mt-4 mb-2 rows-3"
                rows="4"
                placeholder="Message"
                type="text"
                name="Message"
                id="Message"
                {...formik.getFieldProps("Message")}
              />
              {formik.touched.Message && formik.errors.Message && (
                <div className="ms-3" style={{ color: "red" }}>
                  {formik.errors.Message}
                </div>
              )}
              <Button
                className="message_button mb-5 mt-3"
                type="submit"
                onClick={contactUsApi}
              >
                {" "}
                <FaTelegramPlane className="tele_icon" /> Send Message
              </Button>
            </Form>
          </Col>
          <Col lg="1" md="3" sm="3"></Col>
        </Row>

        <Row className="mt-1 mb-5">
          <Col lg="4" md="3" ></Col>

          <Col lg="1" md="3" xs="3" className="ms-5">
            <Button className="contact_media_buttons mx-5 ">
              <BsTelephoneFill />
            </Button>
          </Col>

          <Col lg="1" md="3" xs="3" className="ms-1">
            <Button className="contact_media_buttons mx-5">
              <SiWhatsapp />
            </Button>
          </Col>
          <Col lg="1" md="2" xs="4">
            <Button className="contact_media_buttons ms-5" type="submit">
              <AiOutlineMail className="contact_media_buttons_media"/>
            </Button>
          </Col>
          <Col lg="5"></Col>
        </Row>
        {/* <Row>
          <Col lg="5"/>
          <Col lg={{span: 6 }} >
            <div className="mediaButonsLanding gap-3">
            <Button className="contact_media_buttons">
              <BsTelephoneFill />
            </Button>
            <Button className="contact_media_buttons">
              <SiWhatsapp />
            </Button>
            <Button className="contact_media_buttons" type="submit">
              <AiOutlineMail className="contact_media_buttons_media" />
            </Button>
            </div>
         

          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default Contact;
