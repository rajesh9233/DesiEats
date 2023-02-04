import { React, useRef, useState } from "react";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import profile from "../../../../Asserts/Cartview/profile.png";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { getUserData, getName } from "../../../../constants/Utils";
import DeleteAccountPopUp from "./DeleteAccountPopUp";
import "./ProfileData.css";
import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { updateProfiledetailApi } from "../../../../services/ProfilePageServices";
function ProfileData({ LocationPopUp, showLocation, profileDetailsData }) {
  const inputFile = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(profile);
  const CloseLocationPopUp = () => {
    LocationPopUp(false); //callback function
  };
  let userName = getName() ? getName()[0] : null;

  //   console.log(getUserData())
  const [showDeleteData, setShowDeleteData] = useState(false);
  const showDeleteAccountPopupData = () => setShowDeleteData(true);

  const DeleteAccountPopUpData = (value) => {
    setShowDeleteData(value);
  };
  let profileDataValues = profileDetailsData?.user_details;

  const handleEdit = () => {
    setIsEditable(true);
  };

  const [inputs, setInputs] = useState({
    fullname: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    setInputs({
      fullname: userName,
      mobile: profileDetailsData?.user_details?.mobile,
      email: getUserData()?.email,
    });
  }, []);

  const handleOnChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async() => {
    setIsEditable(false);
    let updateprofileDataResp = await updateProfiledetailApi(inputs);
    if(updateprofileDataResp?.data?.status === 200){
      console.log(updateprofileDataResp)
    }
  };

  const handleUpload = () => {
    inputFile.current.click();
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]))
    }
   }
  return (
    <>
      <Modal
        className="profileContainer"
        show={showLocation}
        onHide={CloseLocationPopUp}
        animation={true}
      >
        <Modal.Header
          className="modal-header border-0"
          closeButton
        ></Modal.Header>
        <Row>
          <Col lg="4">
            <img
              src={profileImage}
              width="100%"
              alt="profile"
              className="ms-4 profileImg"
            />
            <Row>
              <Col lg="6" className="ms-3 icons">
                <MdEdit
                  className="EditProfileData"
                  onClick={() => handleEdit()}
                />
                <MdDelete
                  className="DeleteProfileData ms-3"
                  onClick={showDeleteAccountPopupData}
                />
                <FiUpload
                  className="EditProfileData ms-3"
                  onClick={() => handleUpload()}
                />
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={onImageChange}
                  style={{ display: "none" }}
                />
              </Col>
            </Row>
          </Col>
          <Col lg="1" />
          <Col lg="7">
            <p>
              Name :{" "}
              {!isEditable ? (
                <span>
                  {inputs.fullname
                    ? inputs.fullname
                    : inputs.fullname === null
                    ? "Sign Up"
                    : null}
                </span>
              ) : (
                <input
                  value={inputs.fullname}
                  name="fullname"
                  onChange={(e) => handleOnChange(e)}
                />
              )}
            </p>
            <p>
              Mobile Number :{" "}
              {!isEditable ? (
                <span>
                  {inputs.mobile
                    ? inputs.mobile
                    : profileDetailsData?.user_details?.mobile}
                </span>
              ) : (
                <input
                  value={
                    inputs.mobile
                      ? inputs.mobile
                      : profileDetailsData?.user_details?.mobile
                  }
                  name="mobile"
                  onChange={(e) => handleOnChange(e)}
                />
              )}
            </p>
            <p>
              Email id :{" "}
              {!isEditable ? (
                <span>{inputs.email}</span>
              ) : (
                <input
                  value={inputs.email}
                  name="email"
                  onChange={(e) => handleOnChange(e)}
                />
              )}
            </p>
            {isEditable ? (
              <Row className="updateButton">
                <Button onClick={() => handleUpdate()}>Update</Button>
              </Row>
            ) : null}
          </Col>
        </Row>
      </Modal>
      <DeleteAccountPopUp
        showDeleteData={showDeleteData}
        DeleteAccountPopUpData={DeleteAccountPopUpData}
      />
    </>
  );
}

export default ProfileData;
