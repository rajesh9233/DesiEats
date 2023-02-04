import React, { useState } from "react";
import { Modal, Col, Row, Button, FormCheck } from "react-bootstrap";
import "./BeverageTerms.css";

function BeveragesTerms({
  acceptButtonDontShow,
  beverageTermsData,
  checkBoxFunc,
  beverageTerms,
}) {

  const handleCheckBox = (e) => {
    checkBoxFunc(e.target.checked);
  };

  const beverageTermsClosePopUp = () => {
    beverageTermsData(false); //callback function
  };

  const accept = () => {
    beverageTermsClosePopUp();
    acceptButtonDontShow(true);
  };

  const decline = () => {
    beverageTermsClosePopUp();
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
          <div>
            <p className="TermsBeverage">
              Please Read the following Terms and Condition
            </p>
            <p className="WarningBeverageText">
              Ensure that you understand all of the following conditions before
              placing an order.if you are not willing to agree to the following
              terms then you will not be permitted to make an order.
            </p>
          </div>
          <hr className="hr-tag" />
          <p className="TermsBeverage">
            You agrees that you are a legal age to purchase and consume alcohol
          </p>
          <p className="WarningBeverageText">
            You agrees that you of legal age to purchase and consume alcohol in
            the locale in which the alcohol is delivered,and acknowledge and
            agree to provide valid government-issued identification on delivery.
          </p>
          <p className="TermsBeverage terms">
            Alcohol delivery Singapore terms and conditions to accept
          </p>
          <div>
            <FormCheck
              className="checkBoxBeverages"
              onChange={(e) => handleCheckBox(e)}
              label="Don't ask me again"
            ></FormCheck>
          </div>
          <div className="beverages-btn">
            <div>
              <Button className="AcceptBeverages" onClick={() => accept()}>
                Accept
              </Button>
            </div>
            <div>
              <Button className="DeclineBeverages" onClick={() => decline()}>
                Decline
              </Button>
            </div>
          </div>
        </Row>
        <Modal.Body></Modal.Body>
      </Modal>
    </>
  );
}

export default BeveragesTerms;
