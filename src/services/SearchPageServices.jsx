import axios from "axios";
import { getUrl } from "./URl/Url";
import { getToken } from "../constants/Utils";

export const searchAutocomplete = async (userData) => {
    try {
      let searchAutocompleteData = await axios({
        url:getUrl()+ "/search/search_autocomplete_suggestion",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":getToken(),
        },
        method: "POST",
        data: userData,
      });
      return searchAutocompleteData;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const searchByKeywordApi = async (userData) => {
    try {
      let searchByKeywordData = await axios({
        url:getUrl()+ "/search/search_by_keyword",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization":getToken(),
        },
        method: "POST",
        data: userData,
      });
      return searchByKeywordData;
    } catch (e) {
      console.log(e);
    }
  };
  