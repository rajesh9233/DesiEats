import React from 'react'
import { Container, Col, Row, Button, Card, Badge,Form } from "react-bootstrap";
import SearchView from './SearchView';
import * as yup from "yup";
import { useFormik } from "formik";
import { AiOutlineSearch } from "react-icons/ai";
import DummyItem from './DummyItem';
import FoodsCatagory from '../Restaurent__list/Foods/FoodsCatagory';
import './Search.css'
import { searchAutocomplete,searchByKeywordApi } from '../../services/SearchPageServices';
import { useEffect } from 'react';
function Search() {

  const formik = useFormik({
    initialValues: {
      searchValue: "",
    },
    validationSchema: yup.object({
      searchValue: yup
        .string()
    }),
  });
  useEffect(()=>{
   
  const searchAutocompleteValuesApi = async () => {
    let postsearchAutocompleteObject = {
      business_type: "1",
      food_type: "1",
      keyword:formik.values.searchValue
,
    };
  
    try {
      let searchAutocompleteResponse = await searchAutocomplete(
        postsearchAutocompleteObject
      );
      // console.log(searchAutocompleteResponse);
      // window.location.reload(true); //refresh the page
    } catch (e) {}
  };
  searchAutocompleteValuesApi()
},[formik.values.searchValue])
// console.log(formik.values.searchValue)
useEffect(()=>{

  const searchByKeywordValuesApi = async () => {
    let postSearchByKeywordObject = {
      page: "0",
      limit: "10",
      business_type:"0",
      food_type:"0",
      selected_tab:"1",
      keyword:"Spice Junction",
      date_timestamp:"1669129019",
      lat:"22.9406434",
      lng:"78.52852",
    };
  
    try {
      let searchByKeywordResponse = await searchByKeywordApi(
        postSearchByKeywordObject
      );
      // console.log(searchByKeywordResponse);
      // window.location.reload(true); //refresh the page
    } catch (e) {}
  };

},[])
  



  return (
    <>   
    <Container>
      <Row>
        <Col lg="2"/>
        <Col lg="7" className='search'>
        <Form.Control
         id="searchValue"
         name="searchValue"
         aria-label="Username" 
         aria-describedby="basic-addon1"
         {...formik.getFieldProps("searchValue")}
      
        placeholder='Chicken Biriyani'
 
/>
    <span >
        <AiOutlineSearch className='searchIcon' />
    </span>
</Col>
       
      </Row>

      <Row className='scrollbutton'>
        <Card className='cardsearch' >
        <DummyItem/>
        </Card>
      </Row>

      </Container>  
 
        </>
  )
}

export default Search