import React from 'react'
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function FilterWalletPopup({LocationPopUp, showFilterPopup}) {
    const CloseLocationPopUp = () => {
        LocationPopUp(false); //callback function
      };
    


      
  return (
    <>
 <Modal show={showFilterPopup} onHide={CloseLocationPopUp} animation={true}>
        <Modal.Header className="locationPopUp_Header border-0" closeButton>
          <Col lg="1"></Col>

          <Col lg="4" >
            <p>Filter</p>
          </Col>
          <Col lg="4"/>
          <Col lg="3">
<p>Clear All</p>
          </Col>
        </Modal.Header>
    <Row>
    <Col lg="1"></Col>

      <Col lg="4">
        By Date
      </Col>
      <Col lg="5">
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
      </Col>
      </Row>  
      <Row>
    <Col lg="1"></Col>

      <Col lg="4">
        By Type
      </Col>
      <Col lg="5">
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
      </Col>
      </Row>
      <Row>
        <Col lg="1"/>
        <Col lg="4">
<Button>
  Close
</Button>
        </Col>

        <Col lg="4">
<Button>Apply</Button>
</Col>
      </Row>
      </Modal>

    </>
  )
}

export default FilterWalletPopup