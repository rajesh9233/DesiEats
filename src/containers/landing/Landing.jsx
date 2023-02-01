import React from "react";
import { useState } from "react";
import Contact from "../../components/Landing/Contact/Contact";
import Forms from "../../components/Landing/Form/Forms";
import LandingBody from "../../components/Landing/LandingBody/Landingbody";
import LandingHeader from "../../components/Landing/Landing_header/Landingheader";
import Location from "../../components/Landing/Location/Location";//child 
function Landing() { 
  const [parentState,setParentState]=useState(null)
  const parentFunction =(guestToken)=>{
    setParentState(guestToken)
  }
  // console.log(parentState)

  const [loginResponse,setLoginResponse]=useState(null)
  const loginResposeFunctionValues=(loginToken)=>{
  setLoginResponse(loginToken)
  console.log(loginToken)
  }
// console.log(loginResponse)
  return (
    <>

    <div>
    <LandingHeader parentState={parentState} loginResponse={loginResponse} />
    </div>
      <div>
        <Forms loginResposeFunctionValues={loginResposeFunctionValues} />
      </div>

      <div>
        <LandingBody parentFunction={parentFunction} />
      </div>

      <div>
        <Contact />
      </div>

      <div>
        <Location />
      </div>
    </>
  );
}

export default Landing;
