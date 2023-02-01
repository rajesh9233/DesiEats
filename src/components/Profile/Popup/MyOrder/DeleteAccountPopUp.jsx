import React from "react";
import "./DeleteAccountPopup.css";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import profile from "../../../../Asserts/Cartview/profile.png";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logOutApi } from "../../../../services/Landingservice";
import { MdDelete } from "react-icons/md";
import { getUserData } from "../../../../constants/Utils";
function DeleteAccountPopUp({ DeleteAccountPopUpData, showDeleteData }) {
  const CloseDeleteAccountPopUp = () => {
    DeleteAccountPopUpData(false); //callback function
  };
  // console.log(getUserData());
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
      is_deactivate: "1",
    };
    try {
      let LogoutButtonResponse = await logOutApi(postObject);
      if (LogoutButtonResponse.status === 200) {
        navigate("/");
        ClearSession();
      }
    } catch (e) {}
  };

const cancelPopup=()=>{
  CloseDeleteAccountPopUp()
}
  return (
    <>
      <Modal
        className="deleteaccountPopupProfileModal .modal-lg"
        show={showDeleteData}
        onHide={CloseDeleteAccountPopUp}
        animation={true}
      >
                <Row>

        <Modal.Header
          className="  deleteAccountPopupclose"
          closeButton
        >
        
          <Col lg="12" className="DeleteAccountPopup mt-5 mb-3" ><small  className="DeleteAccountText ">
          Delete Account
            </small></Col>
         </Modal.Header>
         </Row>

          <Row>
            <Col lg="12">
              <p className="deleteaccountText mb-3">
                Are You Sure? Do You Want to Delete your Account
              </p>
            </Col>
          </Row>
        
        <Row className="mt-3 mb-5">
          <Col lg="3" />
          <Col lg="3">
            <Button className="cancelaccountpopupProfile" onClick={()=>{cancelPopup()}}>Cancel</Button>
          </Col>
          <Col lg="3">
            <Button className="deleteaccountpopupProfile" onClick={()=>logOutButtonApi()}>Ok</Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default DeleteAccountPopUp;
