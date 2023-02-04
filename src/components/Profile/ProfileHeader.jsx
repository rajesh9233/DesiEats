import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import DesiEatsImage from "../Landing/Items/DesiEatsImage";
import { logOutApi } from "../../services/Landingservice";
import { useNavigate } from "react-router-dom";
import ToggleMenuButton from "../Landing/Items/ToggleMenuButton";
function ProfileHeader() {
  let navigate = useNavigate();
  const ClearSession = () => {
    sessionStorage.clear();
    // sessionStorage.removeItem()  - removes particular element
  };
  const logOutButtonApi = async () => {
    let postObject = {
      device_id: "",
      device_type: "",
      device_token: "",
      is_deactivate: "0",
    };
    try {
      let LogoutButtonResponse = await logOutApi(postObject);
      if (LogoutButtonResponse.status === 200) {
        navigate("/");
        ClearSession();
      }
    } catch (e) {}
  };

  return (
    <>
      <Row>
        <Col lg="6" md="2" sm="2" xs="3">
          <DesiEatsImage />
        </Col>
        <Col lg="4" md="2" sm="2" xs="3">
          <ToggleMenuButton />
        </Col>
        <Col lg="2" md="2" sm="2" xs="3">
          <Button
            className="sign mt-3"
            onClick={() => {
              logOutButtonApi();
              ClearSession();
              navigate("/");
            }}
          >
            Log Out
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ProfileHeader;
