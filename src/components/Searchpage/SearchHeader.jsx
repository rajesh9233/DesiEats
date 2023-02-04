import React from "react";
import DesiEatsImage from "../Landing/Items/DesiEatsImage";
import { Row, Col, Button } from "react-bootstrap";
import ToggleMenuButton from "../Landing/Items/ToggleMenuButton";
import { getName } from "../../constants/Utils";
function SearchHeader() {
  let userName = getName() ? getName()[0] : null;

  return (
    <>
      <Row className="mb-3">
        <Col lg="6" md="2" sm="2" xs="3">
          <DesiEatsImage />
        </Col>
        <Col lg="4" md="2" sm="2" xs="3">
          <ToggleMenuButton />
        </Col>

        <Col lg="2" md="2" sm="2" xs="3">
          <Button className="sign mt-3">
            <small>{userName}</small>
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default SearchHeader;
