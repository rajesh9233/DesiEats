import React, { useState, useEffect } from "react";
import {  Col, Row } from "react-bootstrap";
import DesiEatsImage from'../../Landing/Items/DesiEatsImage';
import { recordTransactionDetailsApi } from "../../../services/PaymentService";
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'; 

function PaymentReview() {

  // const count = useSelector((state) => state.counter.countervalues);
  // const count = useSelector((state) => state.counter);
  // console.log(count);

  let navigate = useNavigate();

  const OrderPlacedSweetAlert=()=>{
    swal({
      title: "Success!",
      text: "Order Placed successfully!!",
      type: "success",
      timer: 2500,
      button:false,
      className: "popuptetx",
      icon: "success",
    });
    navigate("/profile");
  }

  const pageRedirect = new URLSearchParams(window.location.search);
  const [OrderPlacedStatus, setOrderStatus] = useState(); 

  const txn_number        = pageRedirect.get("payment_intent");
  const txn_status        = pageRedirect.get("redirect_status");
  const txn_client_secret = pageRedirect.get("payment_intent_client_secret");

  useEffect(() => {
    const recordTransactionDetailsApiValues = async () => {
      let recordTransactionDetailsApiObject = {
        street_address              :    'b 154',
        delivery_address                : '1StFloor, No27, New MGRMainRd, Kandhanchavadi, Perungudi, TamilNadu India',
        is_cutlery_needed               : 2,
        lalamove_order_failed_reason    : 'NA',
        lalamove_order_id               : 'NA',
        ordering_platform               : 2,
        restaurant_id                   : 4,
        delivery_name                   : 'baba',
        remark                          : '',
        delivery_mobile                 : '98745632',
        unit_number                     : '567',
        delivery_charge_paid            : 15.0,
        promo_subtotal_discounted_value : 0,
        is_wallet_used                  : 2,
        pickup_time_from                : '1652772840',
        order_type                      : 3,
        delivery_latitude               : '12.9648729',
        promo_subtotal_code_id          : 0,
        actual_dc_amount                : 15.00,
        payment_mode                    : 1, // 1 Credit Card, 2: PayNow
        promo_dc_is_applied             : 2,
        business_category               : 1,
        id_qty_price                    : '[{"id":"1336","qty":"1","price":6.6,"name":"Sweet Corn Vegetable Soup"},{"id":"1337","qty":"1","price":5.67,"name":"Vegetable Salad"}]',
        transaction_unique_number       : 'pi_3L0JMBChE0cFLOZz1UspxY3h_secret_LcDEPIhCBsboCDHhzJBCnkCzK',
        promo_dc_code_id                : 0,
        pickup_time_to                  : '1652773740',
        promo_subtotal_is_applied       : 2,
        lalamove_order_status           : 2,
        wallet_debited_value            : 0.0,
        track_link                      : 'https: //app.keralafooddelivery.com/web/rider_assigning',
        total_amount                    : 42.85,
        delivery_email                  : 'baba@gmail.com',
        sub_total                       : 36.90,
        promo_dc_discounted_value       : 0,
        id_varid_vartype_id             : '[]',
        postal_code                     : '600096',
        delivery_longitude              : '80.2466523',
        item_quantity                   : 1
      };

      try {
        let recordTransactionDetailsApiResponse = await recordTransactionDetailsApi(
          recordTransactionDetailsApiObject
        );
        // setOrderStatus(recordTransactionDetailsApiResponse.data.data.status);
        OrderPlacedSweetAlert();
      } catch (e) {}
    };
    recordTransactionDetailsApiValues();
  }, []);



  // let navigate = useNavigate();
  // if(pageRedirect == 1){
  //   sessionStorage.setItem("isRedirect",0);
  //   navigate("/profile");
  // }
  
  return (
    <>
        <Row>
            <Col lg="8" >
                <DesiEatsImage/>
            </Col>    
        </Row>
        <Row>
            <Col lg="4"></Col> 
            <Col lg="4">
              <h4 className="paymentTrans">Please wait while we are processing your request!</h4>
            </Col>
            <Col lg="4"></Col>  
        </Row>
    </>
  );
}

export default PaymentReview;
