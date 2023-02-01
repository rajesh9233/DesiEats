import {React,useState,useEffect} from 'react'
import {Col,Row,Button,Card} from'react-bootstrap'
import cartpageimage from "../../../Asserts/RestaurentList/dinein.jpg";
import './Myorders.css'
import { myOrdersApi } from '../../../services/ProfilePageServices';
import { MyOrders } from '../../../constants/ProfilePageResponse';
import OrderTrackPopUp from '../Popup/MyOrder/MyOrder/OrderTrackPopUp';

function Myorders() {
  const [show, setShow] = useState(false);
  const [myOrdersData, setMyOrdersData] = useState([]);
  const handleShow = () => setShow(true);

  const closePopUp = (value) => {
    setShow(value);
  };
  
  useEffect(() => {
    const myOrdersValuesApi = async () => {
      let postMyOrderObject = {
        selected_tab: "1",
        page: "1",
        limit:"10"
      };

      try {
        let myOrdersResponse = await myOrdersApi(
          postMyOrderObject
        );
        setMyOrdersData(myOrdersResponse.data.data);
        // console.log(myOrdersData);
        // window.location.reload(true); //refresh the page
      } catch (e) {}
    };
    myOrdersValuesApi();
  }, []);


  return (
    <>
    <Col lg="1" />
    <Col lg="9">
      <Card
        className="Myorders ms-3" >
        <Card.Body>
          <Row>
            <Col lg="2">
              <img
                className="ms-5 mt-4"
                src={MyOrders.mobile_banner_image}
                alt="cart item"
                width="60%"
                height="60%"
              />
            </Col>
            <Col lg="10">
              <p
                style={{ fontWeight: "700", fontSize: "140%" }}
                className=" ms-2 mt-4"
              >
                {MyOrders.rest_name}
                {" "}<br/>
                <span   style={{ fontWeight: "500", fontSize: "70%" }}
 >
                  Address : {MyOrders.rest_pin_address}
                </span>
                </p>
            </Col>
            <Col lg="1" />
            <Col lg="9"></Col>
          </Row>
<Row  >
  <Col lg="1"/>
<Col lg="2">
  <Row>
    <Col lg="9">
    <small >Order No</small> <br/>
    <span className='Details'>{MyOrders.order_number}</span>

    </Col>
    <Col lg="1">
    <div className="verticalLine mt-2 "></div>
    </Col>
  </Row>

</Col>

<Col lg="1">
  <Row>
    <Col lg="12">
    <small >Item</small><br/>
    <span className='Details1' >{MyOrders.item_quantity}</span>

    </Col>
  </Row>

</Col>
  <Col lg="3">
  <Row>
  <Col lg="1">
    <div className="verticalLine mt-2 "></div>
    </Col>
    <Col lg="9">
    <small className='detailContent'>Total Amount</small><br/>
    <span className='Details2'>${MyOrders.total_amount}</span>

    </Col>
    <Col lg="1">
    <div className="verticalLine mt-2 "></div>
    </Col>
  </Row>
</Col>

<Col lg="2">
  <Row>
    <Col lg="12"> 
    <small className='DeliveryAddress'>Delivery Address</small> <br/>
    <span className='Details2'>${MyOrders.delivery_address}</span>

    </Col>
    {/* <Col lg="1">
    </Col> */}
  </Row>

</Col>
<Col lg="3">
  <Row>
    <Col lg="1">
    <div className="verticalLine mt-2 "></div>

    </Col>
    <Col lg="10">
    <small className='OrderDateOfTime' >Order Date Of Time</small><br/>
<span className='Details2'>${MyOrders.order_date_time}</span>

    </Col>
  </Row>

</Col>
</Row>
<Row>
<Col lg="1"/>

<Col lg="5"className='mt-4 mb-4'>
  <Row>
  <Col lg="10">
  <small >Scheduled Delivery<br/>
<span className='Details5'>{MyOrders.schedule_time}</span>
</small>
  </Col>
<Col lg="1">
<div className="verticalLine mt-2 "></div>

</Col>
  </Row>


</Col>
<Col lg="3"className='mt-4 mb-4'>
  
<small >Catagory<br/>
<span className='Details6'>{MyOrders.order_type_name}</span>
</small>
</Col>
<Col lg="3"className='mt-4 mb-4'>
<Button onClick={handleShow}>Track Order</Button>
</Col>
</Row>
</Card.Body>
      </Card>
    </Col>
    <OrderTrackPopUp show={show} closePopUp={closePopUp} />

    </>
  )
}

export default Myorders