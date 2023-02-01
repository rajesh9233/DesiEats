import React, { useState, useEffect } from 'react'
import {Col,Row} from "react-bootstrap";
import StripePayment from './StripePayment';
import { checkoutDetailsApi } from "../../../services/PaymentService";

function Payment(){

  const [temData, setTempData] = useState();

  useEffect(() => {
      const customerCheckoutScreenApiValues = async () => {
        let postCheckoutScreenApiObject = {
          restaurant_id   : 17,
          order_type      : 1,
          pickup_time     : 1648215000,
          latitude        : 1.30520170,
          longitude       : 103.77390450,
          pin_address     : '18, Manjhleveer, tantra bankhedi,  Madhya Pradesh  India',
          delivery_name   : 'Bala Test',
          delivery_email  : 'karuppiah.mariyappan@braveryinfotech.com',
          delivery_mobile : '98989898',
          unit_number     : '11',
          street_address  : '',
          postal_code     : '461990',
          date_timestamp  : '1669198765'
        };

        try {
          let customerCheckoutScreenApiResponse = await checkoutDetailsApi(
            postCheckoutScreenApiObject
          );
          console.log(customerCheckoutScreenApiResponse.data.data);
          setTempData(customerCheckoutScreenApiResponse.data.data);
        } catch (e) {}
      };
      customerCheckoutScreenApiValues();
  },[]);

  return (
    <>
      <Row>
        <Col lg="1" />
        <Col lg="11">
          <p className="mb-1 " style={{ fontWeight: "700", fontSize: "120%" }}>
            Choose Payment Method 
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg="2" />
        <Col lg="6">
          <StripePayment payAmount={"51.55"}/>
        </Col>
      </Row>
    </>
  )
}

export default Payment