import React, { useEffect } from "react";
import { useState } from "react";
import Contact from "../../components/Landing/Contact/Contact";
import Forms from "../../components/Landing/Form/Forms";
import LandingBody from "../../components/Landing/LandingBody/Landingbody";
import LandingHeader from "../../components/Landing/Landing_header/Landingheader";
import Location from "../../components/Landing/Location/Location"; //child
function Landing() {
  const [parentState, setParentState] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const parentFunction = (guestToken) => {
    setParentState(guestToken);
  };

  const loginResposeFunctionValues = (loginToken) => {
    setLoginResponse(loginToken);
  };

  return (
    <>
      <div>
        <LandingHeader
          parentState={parentState}
          loginResponse={loginResponse}
        />
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
