import React, { useState } from "react";
import { Modal, Col, Row, Button, FormCheck } from "react-bootstrap";
import "./BeverageTerms.css";

function BeveragesTerms({ acceptButtonDontShow,beverageTermsData, checkBoxFunc, beverageTerms }) {
  
  const [beveragesPopup, setBeveragesPopup] = useState(false);
  
  const handleCheckBox = (e) => {
    checkBoxFunc(e.target.checked);
  };
  
  const beverageTermsClosePopUp = () => {
    beverageTermsData(false); //callback function
  };

  const accept = () => {
    beverageTermsClosePopUp()
    setBeveragesPopup(true); 
    acceptButtonDontShow(true)
  };

  const decline = () => {
    beverageTermsClosePopUp()
    setBeveragesPopup(false);
  };

  return (
    <>
      <Modal
        className="beverageTermsModal"
        show={beverageTerms}
        onHide={beverageTermsClosePopUp}
        animation={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Row>
          <Col lg="1" />
          <Col lg="10">
            <p className="TermsBeverage">
              Please Read the following Terms and Condition
            </p>
            <p className="WarningBeverageText ">
              Ensure that you understand all of the following conditions before
              placing an order.if you are not willing to agree to the following
              terms then you will not be permitted to make an order.
            </p>
          </Col>

          <hr />

          {/* <Row>
            <Col lg="12" className="hrlinebeverage mx-4">
              <hr />
            </Col>
          </Row> */}

          <Row>
            <Col lg="12">
              <p className="TermsBeverage ms-5">
                You agrees that you are a legal age to purchase
                <br />
                <small className="consumealcoholtext "></small> and consume
                alcohol
              </p>

              <p className="conditionTextBeverages ms-5">
                You agrees that you of legal age to purchase and consume alcohol
                in the locale in which the alcohol is delivered,and acknowledge
                and agree to provide valid government-issued identification on
                delivery.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="10">
              <p className="TermsBeverage ms-5 mt-3 mb-3">
                Alcohol delivery Singapore terms and
                <br />
                <small className="consumealcoholtext "></small> conditions to
                accept
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="1">
              <FormCheck
                className="checkBoxBeverages"
                onChange={(e) => handleCheckBox(e)}
              ></FormCheck>
            </Col>
            <Col lg="10 mb-3">
              <p className="checkDontAskBeverage"> Don't ask me again</p>
            </Col>
          </Row>

          <Row>
            <Col lg="2" />
            <Col lg="4">
              <Button className="AcceptBeverages" onClick={() => accept()}>
                Accept
              </Button>
            </Col>
            <Col lg="4">
              <Button className="DeclineBeverages mb-3" onClick={() => decline()}>
                Decline
              </Button>
            </Col>
            <Col lg="2" />
          </Row>
        </Row>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}

export default BeveragesTerms;
