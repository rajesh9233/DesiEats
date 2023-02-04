import { React, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import DesiEatsImage from "../Items/DesiEatsImage";
import ToggleMenuButton from "../Items/ToggleMenuButton";
import Forms from "../Form/Forms";
import { getName } from "../../../constants/Utils";
import "./Landingheader.css";
import { landingFormsData } from "../../../constants/Utils";
import { sessionLocationData } from "../../../constants/Utils";
import { useNavigate } from "react-router-dom";
import Location from "../Location/Location";
import { FaUserAlt } from "react-icons/fa";
import { FormSelect } from "react-bootstrap";
import { ImLocation } from "react-icons/im";
import { AllAddressApi } from "../../../services/ProfilePageServices";
import { AiTwotoneHome } from "react-icons/ai";
import { HiOfficeBuilding } from "react-icons/hi";

function LandingHeader({ isRestaurant }) {
  const [allAddressData, setAllAddressData] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [activeAddress, setActiveAddress] = useState();

  let userName = getName() ? getName()[0] : null;
  let navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const handleShowForms = () => {
    if (landingFormsData() === null || landingFormsData() === undefined) {
      setShowForms(true);
    } else {
      let locationData = Object.keys(sessionLocationData())?.length;
      if (locationData == 0) {
        setShowLocation(true);
      } else {
        if (landingFormsData().user_type === 2) {
          if (
            sessionLocationData().pin_address === "" ||
            sessionLocationData().postal_code === ""
          ) {
            setShowLocation(true);
          } else {
            navigateToProfile();
          }
        } else {
          if (
            sessionLocationData().pin_address === "" ||
            sessionLocationData().street_address === "" ||
            sessionLocationData().postal_code === "" ||
            sessionLocationData().unit_number === ""
          ) {
            setShowLocation(true);
          } else {
            navigateToProfile();
          }
        }
      }
    }
  };

  const closeFormsPopUp = (value) => {
    setShowForms(value);
  };

  const LocationPopUp = (value) => {
    setShowLocation(value);
  };

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
    <>
      <section>
        <div className="header-container">
          <div className="image-container">
            <DesiEatsImage />
          </div>
          <div className="adress-container">
            {isRestaurant ? (
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
                    {allAddressData.map((item) => (
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
            ) : null}
          </div>
          <div className="menu-container">
            <ToggleMenuButton />
          </div>
          <div className="user-container">
            <button className="sign" onClick={handleShowForms}>
              {userName ? <FaUserAlt /> : null}
              <small>
                {userName ? userName : userName === null ? "Sign Up" : null}
              </small>
              {userName === null ? <BsArrowRight /> : null}
            </button>
          </div>
        </div>
      </section>

      <Forms showForms={showForms} closeFormsPopUp={closeFormsPopUp} />
      <Location
        showLocation={showLocation}
        LocationPopUp={LocationPopUp}
        resetForm={resetForm}
      />
    </>
  );
}

export default LandingHeader;
