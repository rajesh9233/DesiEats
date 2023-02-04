import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaTelegramPlane } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
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
          <div>
            <h1 className="contact">Contact Us</h1>
            <hr size="8" width="90%" className="contactUsformLine" />
            <h4 className="SendMessageAddress">
              Address: 22 Sin Ming Ln, #06-76 Midview city, singapore 573969
            </h4>
          </div>

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
              className="message_button"
              type="submit"
              onClick={contactUsApi}
            >
              {" "}
              <FaTelegramPlane className="tele_icon" /> Send Message
            </Button>
          </Form>
        </Row>
        <Row className="social-container">
          <Button className="contact_media_buttons">
            <BsTelephoneFill />
          </Button>
          <Button className="contact_media_buttons">
            <SiWhatsapp />
          </Button>
          <Button className="contact_media_buttons" type="submit">
            <AiOutlineMail />
          </Button>
        </Row>
      </Container>
    </>
  );
}

export default Contact;
