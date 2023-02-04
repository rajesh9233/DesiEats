import React, { useState } from "react";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import "./ChangeDineinPopup.css";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addEditDineinApi } from "../../../../../services/HomePageServices";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
function ChangeDineinPopup({ closePopUp, show }) {
  const [tabValue, setTabValue] = useState();
  const [datevalue, setDateValue] = React.useState(dayjs(new Date()));

  const handleClose = () => {
    closePopUp(false);
  };

  const handleClicked = (value) => {
    setTabValue(value);

  };

  const handleChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleToday = () => {
    setDateValue(dayjs(new Date()));
  };

  const handleTommorrow = () => {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    setDateValue(dayjs(currentDate));
  };

  const addEditDineinValuesApi = async () => {
    let postaddEditDineinObj = {
      date: "1648215000",
      no_of_people: tabValue,
      time_slot: "1665577800",
      action: "1",
      restaurant_id: sessionStorage.getItem("restaurantData")
        ? sessionStorage.getItem("restaurantData")
        : null,
    };

    try {
      let addEditDineinApidataResponse = await addEditDineinApi(
        postaddEditDineinObj
      );
    } catch (e) {}
  };
  // let navigate=useNavigate()

  const bookDineIn = () => {};
  const[tabPersonValue,setTabPersonValue]=useState()
  
   const[tabDateValue,setTabDateValue]=useState()
   const handleClickDate = (value) => {
    setTabDateValue(value)
   }
   const[tabSlotValue,setTabSlotValue]=useState()
   const handleClickSlot = (value) => {
    setTabSlotValue(value)
   }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        {/* <div className="results-calendar">
            <Calendar onChange={onChange} value={calDate} />
        </div> */}
        <Modal.Header
          className="changeDineInProfile mb-5"
          closeButton
        ></Modal.Header>
        <Row>
          <Col lg="1" />
          <Col lg="9" className="ms-3 mt-5">
            <small className="Modal_Title">
              The Soup Spoon (Bugis Junction)
            </small>
          </Col>
        </Row>

        <Row>
          <Col lg="1" />
          <Col lg="10" className="mb-2 mt-2">
            <p className="Dinein_Address_Change">
              Address : 30 victoria street , #61/12 singapore
            </p>
          </Col>
        </Row>
        <Modal.Body>
          <Row>
            <Col lg="1" />
            <Col lg="9">
              <small className="Date_of_Dinein">Date</small>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="3">
              <Button className="today_dinein" onClick={handleToday}>
                Today
              </Button>
            </Col>
            <Col lg="3">
              <Button className="tomorrow_dinein" onClick={handleTommorrow}>
                Tomorrow
              </Button>
            </Col>

            <Col lg="5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack component="form" noValidate spacing={3}>
                  <DesktopDatePicker
                    label=""
                    inputFormat="MM/DD/YYYY"
                    value={datevalue}
                    onChange={handleChange}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="mt-4">
              <p className="people_count">How Many people?</p>
              {[...Array(10)].map((_, i) => (
                <span
                  className={tabValue===i+1?"activePersonTabValue dinein_count px-2 py-1 mx-2":'dinein_count px-2 py-1 mx-2'}
                  onClick={() => handleClicked(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
            </Col>
          </Row>
          <Row>
            <Col lg="5" />
            <Col lg="6" className="mt-3">
              <p className="people_count_change_dinein">Or</p>
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="9">
              <TextField label="Add People Manually" variant="standard" />
            </Col>
          </Row>
          <Row className="time_container">
            <Col lg="1" />
            <Col lg="10">
              <p className="dinein_Time">Time</p>
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="3">
    <Button  className={tabSlotValue==="slot1"?'dinein_slot1_time ms-2 activeDateTabValue':"dinein_slot1_time ms-2"} onClick={()=>handleClickSlot("slot1")}>13.00</Button>
  </Col>
  <Col lg="3">
    <Button className={tabSlotValue==="slot2"?'dinein_slot2_time ms-3 activeDateTabValue':"dinein_slot2_time ms-3"} onClick={()=>handleClickSlot("slot2")}>13.30</Button>
  </Col>
  <Col lg="3">
    <Button  className={tabSlotValue==="slot3"?'dinein_slot3_time ms-4 activeDateTabValue':"dinein_slot3_time ms-4"} onClick={()=>handleClickSlot("slot3")}>14.00</Button>
  </Col>
          </Row>
          <Row>
            <Col lg="4" />
            <Col lg="3" className="mb-5 mt-4">
              <Button
                className="book_dinein"
                onClick={() => {
                  addEditDineinValuesApi();
                }}
              >
                BOOK
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangeDineinPopup;
