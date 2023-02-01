import {React,useState} from 'react'
import { Container, Col, Row, Button,Modal } from "react-bootstrap";
import profile from "../../../../Asserts/Cartview/profile.png"
import { MdEdit} from "react-icons/md";
import { MdDelete} from "react-icons/md";
import { getUserData ,getName} from '../../../../constants/Utils';
import DeleteAccountPopUp from './DeleteAccountPopUp';
function ProfileData({LocationPopUp,showLocation,profileDetailsData}) {
    const CloseLocationPopUp = () => {
         LocationPopUp(false);//callback function
        
      };
      let userName=getName()?getName()[0]:null

    //   console.log(getUserData())
      const [showDeleteData, setShowDeleteData] = useState(false);
const showDeleteAccountPopupData = () => setShowDeleteData(true);

const DeleteAccountPopUpData = (value) => {
    setShowDeleteData(value);
};
let profileDataValues=profileDetailsData?.user_details
// console.log(profileDetailsData?.user_details)
  return (
    <>
          <Modal show={showLocation} onHide={CloseLocationPopUp} animation={true}>
           <Modal.Header className="modal-header border-0" closeButton>
          </Modal.Header>   
<Row>
    <Col lg="4">
    <img src={profile} width="100%" alt="profile" className='ms-4' />
    </Col>
    <Col lg="1"/>
    <Col lg="7">
        <p>Name : {userName?userName:userName===null?"Sign Up":null}</p>
        <p>Mobile Number : {profileDataValues?.mobile}</p>
        <p>Email id :{getUserData()?.email}</p>
    </Col>
    </Row>
<Row>
    <Col lg="1"/>
    <Col lg="3" className='ms-3'>
        <MdEdit className='EditProfileData'/>
        <MdDelete  className='DeleteProfileData ms-3' onClick={showDeleteAccountPopupData}/>
    </Col>
</Row>
    </Modal>
    <DeleteAccountPopUp showDeleteData={showDeleteData} DeleteAccountPopUpData={DeleteAccountPopUpData}/>
    </>
  )
}

export default ProfileData