import React, { useState } from 'react';
import {Col, Row ,Modal,Button, Form} from "react-bootstrap";
import './ChangeDineinPopup.css'
import dayjs from 'dayjs';
import { addEditDineinApi } from '../../../../../services/HomePageServices';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
function ChangeDineinPopup({closePopUp,show}) {
  const handleClose = () => {
    closePopUp(false);
  };
  const[tabValue,setTabValue]=useState()
  const handleClicked = (value) => {
    setTabValue(value)
  
    }
    let input=1;
    for (input=1; input <= 10; input++) {
      // console.log(input);
     }
  
     const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

     const handleChange = (newValue) => {
       setValue(newValue);
     };
     const addEditDineinValuesApi = async () => {
      let postaddEditDineinObj = {
        date: "1648215000",
        no_of_people: tabValue,
        time_slot:"1665577800",
        action:"1",
        restaurant_id:sessionStorage.getItem("restaurantData")?sessionStorage.getItem("restaurantData"):null,
      };
  
      try {
        let addEditDineinApidataResponse = await addEditDineinApi(postaddEditDineinObj);
  
      } catch (e) {}
    };
    // let navigate=useNavigate()

   const bookDineIn=()=>{

   } 
 
  return (
    <>
      
      <Modal show={show} onHide={handleClose}>
      {/* <div className="results-calendar">
            <Calendar onChange={onChange} value={calDate} />
        </div> */}
        <Modal.Header className='changeDineInProfile mb-5' closeButton>
        </Modal.Header>
        <Row>
  <Col lg="1"/>
  <Col lg="9" className='ms-3 mt-5'>
  <small className='Modal_Title'>The Soup Spoon (Bugis Junction)</small>
  </Col>
  </Row>

  <Row>
    <Col lg="1"/>
    <Col lg="10" className='mb-2 mt-2'>
      <p className='Dinein_Address_Change'>Address : 30 victoria street , #61/12 singapore</p>
    </Col>
  </Row>
        <Modal.Body>

<Row>
  <Col lg="1"/>
  <Col lg="9">
    <small className='Date_of_Dinein'>Date</small>
  </Col>
</Row>

<Row className='mt-3'>
  <Col lg="1"/>
  <Col lg="3" >
<Button className='today_dinein'>Today</Button>
  </Col>
  <Col lg="3">
    <Button className='tomorrow_dinein'>Tomorrow</Button>
    </Col>

    <Col lg="3">
    <Button>22/12/2022</Button>
    </Col>
    <Stack component="form" noValidate spacing={3}>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
          </Stack>

</Row>
<Row>
<Col lg="12" className='mt-4'>
<p className='people_count'>How Many people?</p>
{
  [...Array(10)].map((_, i) => (
    <span className='dinein_count px-2 py-1 mx-2'onClick = {() => handleClicked(i+1)}>{i+1}</span>
    
  ))
}
{/* <span className='dinein_count px-2 py-1 ms-3' onClick = {() => handleClicked("2")}>2</span>
<span className='dinein_count px-2 py-1 ms-3' onClick = {() => handleClicked("3")}>3</span>
<span className='dinein_count px-2 py-1 ms-3'onClick = {() => handleClicked("4")}>4</span>
<span className='dinein_count px-2 py-1 ms-3'onClick = {() => handleClicked("5")}> 5</span>
<span className='dinein_count px-2 py-1 ms-3'onClick = {() => handleClicked("6")}>6</span>
<span className='dinein_count px-2 py-1 ms-3'onClick = {() => handleClicked("7")}>7</span>
<span className='dinein_count px-2 py-1 ms-3'onClick = {() => handleClicked("8")}>8</span>
<span className='dinein_count px-2 py-1 ms-3'onClick = {() => handleClicked("9")}>9</span>
<span className='dinein_count px-1 py-1 ms-3'onClick = {() => handleClicked("10")}>10</span> */}
  </Col>



</Row>
<Row>
  <Col lg="5"/>
  <Col lg="6" className='mt-3'>
  <p className='people_count_change_dinein'>Or</p>
  </Col>
</Row>
<Row>
  <Col lg="1"/>
  <Col lg="9">
    <Form.Control className='add_people_count mb-3' placeholder='Add People Manually'></Form.Control>
  </Col>
</Row>
<Row>
  <Col lg="1"/>
<Col lg="10">
  <p className='dinein_Time'>Time</p>
  </Col>
</Row>
<Row>
  <Col lg="1"/>
  <Col lg="3">
    <Button className='dinein_slot1_time ms-2'>13.00</Button>
  </Col>
  <Col lg="3">
    <Button className='dinein_slot2_time ms-3'>13.30</Button>
  </Col>
  <Col lg="3">
    <Button className='dinein_slot3_time ms-4'>14.00</Button>
  </Col>
</Row>
<Row>
  <Col lg="4"/>
  <Col lg="3" className='mb-5 mt-4'>
    <Button className='book_dinein' onClick={()=>{addEditDineinValuesApi();}}>BOOK</Button>
  </Col>
</Row>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ChangeDineinPopup