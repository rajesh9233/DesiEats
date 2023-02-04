import React from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  Badge,
  Form,
} from "react-bootstrap";
import SearchView from "./SearchView";
import * as yup from "yup";
import { useFormik } from "formik";
import { AiOutlineSearch } from "react-icons/ai";
import SearchItems from "./SearchItems";
import FoodsCatagory from "../Restaurent__list/Foods/FoodsCatagory";
import "./Search.css";
import {
  searchAutocomplete,
  searchByKeywordApi,
} from "../../services/SearchPageServices";
import { useEffect } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
function Search() {
  const [searchResp, setSearchResp] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const [searchItems, setSearchItems] = useState([]);

  const searchValue = useSelector((state) => state.counter.searchValue);

  useEffect(() => {
    if(searchValue){
      setSearchKey(searchValue)
    }
  }, [searchValue]);

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

  useEffect(() => {
    const searchByKeywordValuesApi = async () => {
      let postSearchByKeywordObject = {
        page: "0",
        limit: "10",
        business_type: "0",
        food_type: "0",
        selected_tab: "1",
        keyword: searchKey,
        date_timestamp: "1669129019",
        lat: "22.9406434",
        lng: "78.52852",
      };

      try {
        let searchByKeywordResponse = await searchByKeywordApi(
          postSearchByKeywordObject
        );
        setSearchItems(searchByKeywordResponse?.data?.data);
      } catch (e) {}
    };
    searchByKeywordValuesApi();
  }, [searchKey]);

  const handleOptionSelect = (event, newValue) => {
    setSearchKey(newValue.label);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg="2" />
          <Col lg="7" className="search">
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
                  placeholder="Chicken Biriyani"
                />
              )}
            />
          </Col>
        </Row>

        <Row className="scrollbutton">
          <Card className="cardsearch">
            <SearchItems searchDatas={searchItems} />
          </Card>
        </Row>
      </Container>
    </>
  );
}

export default Search;
