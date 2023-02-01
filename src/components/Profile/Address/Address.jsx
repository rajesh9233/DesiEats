import { AllAddressApi } from "../../../services/ProfilePageServices";
import { React, useState, useEffect } from "react";
import { Col, Row, Button, Card, Badge } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import {
  addDeliveryAddressApi,
  updateDeliveryAddressApi,
  deleteDeliveryAddressApi,
} from "../../../services/ProfilePageServices";
import UpdateAddressPopup from "../Popup/Address/UpdateAddressPopup";
import AddAddressPopup from "../Popup/Address/AddAddressPopup";
import Location from "../../Landing/Location/Location";
import { AllDeliveryAddress } from "../../../constants/ProfilePageResponse";
import "./Address.css";
function Address() {
  const [showLocation, setShowLocation] = useState(false);
  const showLocationPopup = () => {
    setShowLocation(true);
  };

  const LocationPopUp = (value) => {
    setShowLocation(value);
  };
  // console.log(AllDeliveryAddress)
  const [editLocation, setEditLocation] = useState(false);
  const editLocationPopup = (item) => {
    setAddressIdState(item.id)
    setEditLocation(true);
  };

  const editPopUp = (value) => {
    setEditLocation(value);
  };
  const [allAddressData, setAllAddressData] = useState([]);
  const AllAddressDataApi = async () => {
    let postAllAddressObj = {
      page: "0",
      limit: "5",
    };

    try {
      let allAddressApidataResponse = await AllAddressApi(postAllAddressObj);

      setAllAddressData(allAddressApidataResponse.data.data);
    } catch (e) {}
  };

  useEffect(() => {
    AllAddressDataApi();
  }, []);
  // console.log(allAddressData);

 
  //update_delivery_address Api

  
  //delete_delivery_address
const [addressIdState,setAddressIdState]=useState()
  const deleteAddressDataApi = async (item) => {
    let postdeleteAddressObj = {
      address_id:item.id ,
    };
    // console.log(item)
    try {
      let deleteDeliveryAddressApiResponse = await deleteDeliveryAddressApi(
        postdeleteAddressObj
      );

      // console.log(deleteDeliveryAddressApiResponse);
     if(deleteDeliveryAddressApiResponse.status===200) {
      AllAddressDataApi();

     }
    } catch (e) {}
  };
// console.log(addressIdState)
  return (
    <>
      <Col lg="1" />
      <Col lg="8">
        <Card className="AddressCard_Profilepage ms-4">
          <Row>
            <Col lg="1" />
            <Col lg="4">
              <Card.Title className="mt-5 mb-5">
                <p className="Manage_Address mt-5 mb-5">Manage Address</p>
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col lg="1" />
            <Col lg="10">
              <Badge className="Address_Badge mb-5 ">
                <Row>
                  <Col lg="1" className="ms-4 my-2">
                    <small className="address_font">All Address</small>
                  </Col>
                </Row>
              </Badge>
            </Col>
          </Row>

          <Row className="AllAddressesProfilePage">
            {allAddressData.map((item, index) => (
              <>
                <Col lg="1" />

                <Col lg="8" className="ms-2">
                  <small className="homeText">
                    {item.label_type === "1"
                      ? "Home"
                      : item.label_type === "2"
                      ? "Office"
                      : item.label_type === "3"
                      ? "Others"
                      : null}
                  </small>
                  <br />
                  <small className=" mt-4">
                    {item.unit_number}, {item.street_address}, {item.pin_address}, {item.postal_code}
                  </small>
                </Col>
                <Col lg="1">
                  <AiFillDelete className="Deleteicon py-1" onClick={()=>deleteAddressDataApi(item)}></AiFillDelete>
                </Col>
                <Col lg="1">
                  <FaPencilAlt
                    className="EditIcon py-1"
                    onClick={()=>editLocationPopup(item)}
                  ></FaPencilAlt>
                </Col>
                <Row>
                  <Col lg="1" />
                  <Col lg="10">
                    <hr className="hrLineAddressProfile ms-2 mb-3" />
                  </Col>
                </Row>
              </>
            ))}
          </Row>

          <Row className="mb-5 mt-5">
            <Col lg="5" />
            <Col lg="2">
              <Button className="AddButton" onClick={showLocationPopup}>
                Add
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <AddAddressPopup showLocation={showLocation} LocationPopUp={LocationPopUp} AllAddressDataApi={AllAddressDataApi}/>
      <UpdateAddressPopup editLocation={editLocation} editPopUp={editPopUp} AllAddressDataApi={AllAddressDataApi} allAddressData={allAddressData} addressIdState={addressIdState} />

    </>
  );
}

export default Address;
