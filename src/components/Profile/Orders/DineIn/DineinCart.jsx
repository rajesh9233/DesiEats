import {React,useState} from 'react'
import {Col,Row,Button,Card} from'react-bootstrap'
import cartpageimage from "../../../../Asserts/RestaurentList/dinein.jpg";
import './DineinCart.css'
import CancelDineinPopup from '../../Popup/MyOrder/Dinein/CancelDineinPopup'
import ChangeDineinPopup from '../../Popup/MyOrder/Dinein/ChangeDineinPopup';
function DineinCart() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const closePopUp = (value) => {
    setShow(value);
  };
  const [show1, setShow1] = useState(false);
  const handleShow1 = () => setShow1(true);
  const closePopUp1 = (value) => {
    setShow1(value);
  };
  
  return (
    <>

<Col lg="1" />
          <Col lg="9">
            <Card
              className="DineinCart ms-3"  >
              <Card.Body>
                <Row>
                  <Col lg="2">
                    <img
                      className="ms-5 mt-4"
                      src={cartpageimage}
                      alt="cart item"
                      width="60%"
                      height="60%"
                    />
                  </Col>
                  <Col lg="10">
                    <p
                    
                      className=" ms-2 mt-4"
                    >
                      <small  className='itemTittle'>The Soup Spoon (Bugis Junction)</small>{" "}<br/>
                      <small className='AddressValue' >
                        Address : 30 victoria street, Singapore
                      </small>
                      </p>
                  </Col>
                  <Col lg="1" />
                  <Col lg="9"></Col>
                </Row>
<Row>
<Col lg="2"className="mt-4  mx-4">
  <Row>
  <Col lg="9" >
  <small >Name<br/>
<span className='Details'>John Doe</span>
</small>
  </Col>
<Col lg="1">
<div className="verticalLine mt-2"></div>
</Col>
  </Row>
</Col>

<Col lg="2"className="mt-4 ">
  <Row>
    <Col lg="12" className='ms-2'>
    <small >No of Member
<br/>
<span className='Details1'>5</span></small>
    </Col>

  </Row>
</Col>

<Col lg="5"className="mt-4 ">
  <Row>
  <Col lg="1">
    <div className="verticalLine mt-2"></div>
    </Col>
    <Col lg="11">
    <div className='DiningDateTime'>
    <small >Dining Date & Time
    </small>
    </div>
    <div className='DiningDateTime'>
    <small className='Details2'>Tomorrow At 08:30 AM to 09:00 AM
    </small>
    </div>

    </Col>
   
  </Row>

</Col>
<Col lg="2"className="mt-4 ">
<Col lg="1"/>

  <Row>
  <Col lg="1">
    <div className="verticalLine mt-2"></div>

    </Col>
    <Col lg="9">
    <small>Catagory<br/>
<span className='Details3'>Dine In</span></small>
    </Col>
  </Row>

</Col>
</Row>
<Row>
  <Col lg="7"/>
  <Col lg="2">
    <Button className="CancelDineInItemProfile mt-5" onClick={handleShow}>Cancel</Button>
  </Col>
  <Col lg="2">
    <Button className="ChangeDineInItemProfile mx-3 mt-5" onClick={handleShow1}>Change</Button>
  </Col>
</Row>

              </Card.Body>
            </Card>
          </Col>
          <CancelDineinPopup show={show} closePopUp={closePopUp} />
          <ChangeDineinPopup show={show1} closePopUp={closePopUp1} />

    
    </>
  )
}

export default DineinCart