import {React,useState} from 'react'
import {Container,Col,Row,Card, Badge} from'react-bootstrap'
import menu from '../../Asserts/RestaurentList/beverages.jpeg'
import './DummyItem.css'
import { useNavigate } from "react-router-dom";

function DummyItem() {


  

 
    const allRestaurents=[
        {
          imgUrl:menu ,
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20",


          restaurant_id: "73",
          rest_name: "Ibaco",
          res_description: "Tasty and Delicious Ice Creams",
          min_order_value: "0",
          delivery_handled_by: "2",
          time_mode: "1",
          rest_status: "1",
          banner_image: "https://keralaeats.appplaza.io/assets/merchant/merchant_banner_image/default.png",
          avg_rating: "0",
          latitude: "12.9653847",
          longitude: "80.246198",
          del_prep_time: "0hr 35min",
          offline_status: [],
          isWishList: "1",
          distance: 2902,
          restro_is_open: "1",
          next_open_time: ""
      
        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-10",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"

        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-11",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"


      
        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-12",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"


      
        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-13",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"


      
        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-14",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"


      
        },
        {
          imgUrl:menu,
          title: "BIRIYANI-15",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"


      
        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-16",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"


      
        },
        {
          imgUrl:menu ,
          title: "BIRIYANI-16",
          subtitle:"Indian & Western cuisine",
          open_hours:"9.00AM-11.00PM",
          break_hours:"11.00AM-12.00PM",
          Delivery_by:"Delivery Handled By Paradise",
          minimum_value:"$20"

        }
      ]

      
      let navigate = useNavigate();

      function handleClick() {
        navigate("/restaurent");
      }
    
  return (
<>
<Container>
  <Row>
    <Col lg="5"></Col>
    <Col lg="5">
    <h2 className="mt-4">Search Results</h2>
    </Col>
  </Row>

  <Row className='scrollbutton mt-4'>

  {allRestaurents?.map((item, index) => (
    <Col lg='4' mb='3' sm='3' className='d-flex grid-margin mb-5 gap-3'>
     <Card style={{ width: '18rem' }} onClick={handleClick}>
      <Card.Body>
        <div>
        <Card.Img variant="top" className='itemImageSearch' src={item.imgUrl} />
        <Badge className='minimum_value mb-3' variant='outlined' >Minimum Order Value :{item.minimum_value}</Badge>
        <Badge className='delivery_by mt-2 mb-5' variant='outlined' >{item.Delivery_by}</Badge>
        </div>

        <Card.Title className='mt-3'> {item.rest_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{item.res_description}</Card.Subtitle>
        <Row>
        <Col lg='6'>
        <Badge className='open_hours_badge' variant='outlined' >Open Hours-{item.open_hours}</Badge>

        </Col>
        <Col lg='6'>
        <Badge className='delivery_time'>{item.open_hours}</Badge>  
        </Col>
        </Row>
        <Row>
          <Col>
          <Badge className='break_hours_badge mt-2' variant='outlined' >Break Hours-{item.open_hours}</Badge>

          </Col>
        </Row>
      </Card.Body>
    </Card>

 </Col>
))}
</Row>
</Container>


    </>
  )
}

export default DummyItem