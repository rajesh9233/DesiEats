import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from "react-bootstrap";
import { cancelDineinApi } from '../../../../../services/HomePageServices';
import './CancelDineInPopup.css'
function CancelDineinPopup(props) {
  const handleClose = () => {
    props.closePopUp(false);
  };
  const cancelDineinValuesApi = async () => {
    let postcancelDineinObj = {
      dine_in_id:"62"
    };

    try {
      let cancelDineinApidataResponse = await cancelDineinApi(postcancelDineinObj);

    } catch (e) {}
  };
  return (
    <>
        

      <Modal show={props.show} onHide={handleClose}>
   
        <Modal.Header className='cancelDineInButton'  closeButton>
        </Modal.Header>
          <Row className='mt-5'>
         
          </Row>
 
        <Modal.Body>
       <Row>
        <Col lg="2"/>
        <Col lg="9" className='mb-3'>
          <p className='cancelDinein'>Do You Want to Cancel the Dine - in</p>
         <Row>
          <Col lg="1"/>
          <Col lg="4" className='ms-3 mt-5'>
          <Button className='cancelButton' >Cancel</Button>

          </Col>
          <Col lg="4" className='mt-5'>
          <Button className='okButton' onClick={()=>{cancelDineinValuesApi();}}>Ok</Button>

            </Col>
         </Row>
    
        </Col>
       </Row>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default CancelDineinPopup