import React, { useEffect, useState } from "react";
import { Col, FormSelect, Row } from "react-bootstrap";
import DesiEatsImage from "../Landing/Items/DesiEatsImage";
import CartItemBody from "./CartItemsList/CartItemBody";
import CartItems from "./CartPopupItems/CartItems";
import Tabpanel from "./CartItemsList/Tabpanelitems/TabPanel";
import "./RestaurentViewPage.css";
import { AiTwotoneHome } from "react-icons/ai";
import { HiOfficeBuilding } from "react-icons/hi";
import { ImLocation } from "react-icons/im";
import { AllAddressApi } from "../../services/ProfilePageServices";

function RestaurentHeader() {
  const [allAddressData, setAllAddressData] = useState([]);
  const [activeAddress, setActiveAddress] = useState();

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

  const handleAddressOnChange = (e) => {
    let value = e.target.value;
    if (value) {
      if (value.includes("Home")) {
        setActiveAddress("Home");
      } else if (value.includes("Office")) {
        setActiveAddress("Office");
      } else if (value.includes("Others")) {
        setActiveAddress("Others");
      } else {
        setActiveAddress("Others");
      }
    }
  };

  return (
    <div className="res-container">
      <div className="restaurent-header-container">
        <div className="res-image-container">
          <DesiEatsImage />
          <div className="res-adress-container">
            <div className="data-content">
              <div className="adress-content">
                <small className="DeliveryTo ">Delivering To</small>
              </div>
              <div className="adress-content">
                {activeAddress === "Home" ? (
                  <AiTwotoneHome className="LocationIconHeader ms-3 mt-1" />
                ) : activeAddress === "Office" ? (
                  <HiOfficeBuilding className="LocationIconHeader ms-3 mt-1" />
                ) : (
                  <ImLocation className="LocationIconHeader ms-3 mt-1" />
                )}
              </div>
              <div className="adress-content">
                <FormSelect
                  className="address_view_data"
                  onChange={(e) => handleAddressOnChange(e)}
                >
                  {allAddressData?.map((item) => (
                    <option>
                      <span className="adress-specific">
                        {item.label_type === "1"
                          ? "Home  "
                          : item.label_type === "2"
                          ? "Office  "
                          : item.label_type === "3"
                          ? "Others  "
                          : null}
                      </span>
                      <small className=" mt-4">
                        {item.unit_number}, {item.street_address},{" "}
                        {item.pin_address}, {item.postal_code}
                      </small>
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>
          </div>
        </div>
        <CartItemBody />
      </div>
      <div className="res-cart-container">
        <CartItems />
      </div>
    </div>
  );
}

export default RestaurentHeader;
