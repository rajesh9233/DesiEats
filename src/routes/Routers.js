import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import RestaurentList from "../containers/restaurent_list/RestaurentList";
import Landing from "../containers/landing/Landing";
import RestaurentView from "../containers/restaurent_view/RestaurentView";
import SearchContainer from "../containers/search/SearchContainer";
import Profile from "../containers/Profile/Profile";
import Payment from "../containers/PaymentandLogin/Payment";
import PaymentReview from "../containers/PaymentandLogin/PaymentReview";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<RestaurentList />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/restaurants" element={ <RestaurentView/>}/>
      <Route path="/search" element={ <SearchContainer/>}/>
      <Route path="/Profile" element={ <Profile/>}/>
      <Route path="/payment" element={ <Payment/>}/>
      <Route path="/process_payment" element={ <PaymentReview/>}/>
    </Routes>
  );
};

export default Routers;