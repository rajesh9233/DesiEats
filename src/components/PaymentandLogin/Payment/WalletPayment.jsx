import React from 'react'
import {Col,Row,Button,Card} from "react-bootstrap";
import './WalletPayment.css'
function WalletPayment() {
  return (
    <>
    <Card className='paymentcard_PaymentPage'>
    <Row>
      <Col lg="2"/>
      <Col lg="8">
      <Card.Title className="mt-5 mb-5 ">Total Balance  :  $897.87</Card.Title>

      </Col>
    </Row>
    <Row className="mb-5">
      <Col lg="3"/>
      <Col lg="4">
      <Button>Pay $209.09</Button>

      </Col>
      <Col lg="3">
      <Button className='AddMoneyWallet'>Add</Button>

      </Col>
    </Row>
  </Card>
    </>
  )
}

export default WalletPayment