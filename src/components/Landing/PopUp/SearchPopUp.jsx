import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./SearchPopup.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { searchAutocomplete } from "../../../services/SearchPageServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchValue } from "../../../containers/app/features/CounterSlice";

function CartIconPopup(props) {
  const [searchKey, setSearchKey] = useState();
  const [searchResp, setSearchResp] = useState([]);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchKey) {
      dispatch(searchValue(searchKey))
      navigate("/search");
    }
  }, [searchKey]);

  useEffect(() => {
    const searchAutocompleteValuesApi = async () => {
      let postsearchAutocompleteObject = {
        business_type: "1",
        food_type: "1",
        keyword: searchKey,
      };

      try {
        let searchAutocompleteResponse = await searchAutocomplete(
          postsearchAutocompleteObject
        );

        const searchList = [];
        if (searchAutocompleteResponse?.data?.data) {
          searchAutocompleteResponse?.data?.data.map((item, i) => {
            let obj = {
              label: item.display_name,
              id: i + 1,
            };
            searchList.push(obj);
          });
        }
        setSearchResp(searchList);
      } catch (e) {}
    };
    searchAutocompleteValuesApi();
  }, []);

  const handleClose = () => {
    props.closePopUp(false);
  };

  const handleOptionSelect = (event, newValue) => {
    setSearchKey(newValue.label);
  };

  return (
    <>
      <Modal
        className="search-modal-container"
        show={props.show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Autocomplete
            disablePortal
            id="searchKey"
            options={searchResp}
            sx={{ width: 300 }}
            onChange={handleOptionSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AiOutlineSearch />
                    </InputAdornment>
                  ),
                }}
                placeholder="What would You like to eat today?"
                label="Search"
              />
            )}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CartIconPopup;
