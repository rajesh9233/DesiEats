
import React from 'react'
import { Col, Row,Badge, FormSelect } from "react-bootstrap";
import { AiFillHome} from "react-icons/ai";
import { connect } from 'react-redux';

function AddressHeader({addressdata}) {
  return (
    <>
      <Col lg="4" md="6" sm="6" xs="1" className=" mt-3">
         
         <Badge className="Address_Badge_header mt-2">
           <Row>
             <Col lg="2" className="mt-2 ms-2">
             <small className="DeliveryTo ">Delivering To:</small>
             </Col>
         
         
             <Col lg="1"className="mt-1 ">
               <AiFillHome className="Home_Icon ms-4 px-1 "/>
               </Col>
               <Col lg="1" className="home_button_text mt-2 ms-4">
             <span >Home</span>
         
             </Col>
         
             <Col lg="6" className="ms-1">
             <FormSelect className="address_view_data"><option>
                ok
                
                </option></FormSelect>
             </Col>
           </Row>
         </Badge>
         
                 </Col>
    </>
  )
}
// const mapStateToProps = state => {
//     return {
//       addressdata:state.addressdata,
//    }
//   }
// connect(mapStateToProps)
export default AddressHeader;




