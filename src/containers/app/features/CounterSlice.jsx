import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countervalues: 0,
  restaurentlistvalues: {},
  addressdatavalues: {},
  tabvalue: {},
  homepagedatadeatils: {},
  restaurentbycatagory: {},
  restaurantid: {},
  latdatas: {},
  langdatas: {},
  cartQuantityChange: 0,
  cartQuantityChangeViceVersa: 0,
  searchValue: ""
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementValue: (state) => {
      state.countervalues += 1;
    },
    decrementValue: (state) => {
      state.countervalues -= 1;
    },

    restaurentdatas: (state, action) => {
      state.restaurentlistvalues = action.payload;
    },
    addressdatas: (state, action) => {
      // console.log(action)
      // console.log(state)
      state.addressdatavalues = action.payload;
    },
    tabvaluedata: (state, action) => {
      state.tabvalue = action.payload;
    },
    homepagedetailsmethod: (state, action) => {
      state.homepagedatadeatils = action.payload;
    },
    restaurentByCatagoryDatas: (state, action) => {
      state.restaurentbycatagory = action.payload;
    },
    restaurantIdDataMethod: (state, action) => {
      state.restaurantid = action.payload;
    },
    latDataMethod: (state, action) => {
      state.latdatas = action.payload;
    },
    langDataMethod: (state, action) => {
      state.langdatas = action.payload;
    },
    cartQuantityChange: (state, action) => {
      state.cartQuantityChange = action.payload;
    },
    cartQuantityChangeViceVersa: (state, action) => {
      state.cartQuantityChangeViceVersa = action.payload;
    },
    searchValue: (state,action) => {
      state.searchValue = action.payload;
    }
  },
});

export const {
  incrementValue,
  decrementValue,
  restaurentdatas,
  addressdatas,
  tabvaluedata,
  homepagedetailsmethod,
  restaurentByCatagoryDatas,
  restaurantIdDataMethod,
  latDataMethod,
  langDataMethod,
  cartQuantityChange,
  cartQuantityChangeViceVersa,
  searchValue
} = counterSlice.actions;
export default counterSlice.reducer;
