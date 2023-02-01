// import { createStore } from "redux";
// import counterReducer from "../../components/RestaurentView/Redux/Reducers/counterReducers";

// const store = createStore(counterReducer);

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../app/features/CounterSlice'

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      // counterReducer:counterReducer
   },
});
