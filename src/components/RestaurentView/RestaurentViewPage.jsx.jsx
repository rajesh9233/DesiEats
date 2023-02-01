import React from "react";
import {  Col, Row } from "react-bootstrap";
import DesiEatsImage from'../Landing/Items/DesiEatsImage'
import CartItemBody from "./CartItemsList/CartItemBody"
import CartItems from "./CartPopupItems/CartItems";
import Tabpanel from './CartItemsList/Tabpanelitems/TabPanel'
function RestaurentHeader(props) {
  
  return (
    <>
 
   
        <Row>
          <Col lg="8" >
          <DesiEatsImage/>
           <CartItemBody/> 
           </Col> 
           <Col lg="4">
<CartItems/>
{/* <Tabpanel/> */}
            </Col>     
             </Row>
     
    </>
  );
}

export default RestaurentHeader;
