import { React, useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import "./Terms.css";
import { IoIosHelpBuoy } from "react-icons/io";
import { TermsAndConditionApi } from "../../../services/ProfilePageServices";
function Terms() {

  const [termsData, setTermsData] = useState([]);

  useEffect(() => {
    const termsConditionValuesApi = async () => {
      let postTermsConditionObject = {
        page_key: "termsandconditions",
        app_id: "2",
      };

      try {
        let TermsAndConditionResponse = await TermsAndConditionApi(
          postTermsConditionObject
        );
        setTermsData(TermsAndConditionResponse.data.data);
        // console.log(TermsAndConditionResponse);
        // window.location.reload(true); //refresh the page
      } catch (e) {}
    };
    termsConditionValuesApi();
  }, []);
   
  return (
    <>
      <Col lg="1" />
      <Col lg="9">
        <Card
          style={{ width: "90%", borderRadius: "none" }}
          className="TermsCard ms-4"
        >
          <Row>
            <Col lg="1" />
            <Col lg="5">
              <Card.Title className=" mt-5 ">
                <p className="titleTerms">Terms and Conditions</p>
              </Card.Title>
              {/* <p className="PrivacyPolicyProfile">**Privacy Policy** </p> */}
            </Col>
            <Col lg="3" />
            <Col lg="2">
              {/* <div>
                <p className="helpText  mt-5" style={{ float: "right" }}>
                  <IoIosHelpBuoy className="helpIcon mx-2" />
                  Help
                </p>
              </div> */}
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="10">
              <Card.Body className="termsBody">
                <div dangerouslySetInnerHTML={{__html: termsData?.page_value}}>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
}

export default Terms;
