import React from "react";
import MenuItems from "../../components/Restaurent__list/Menu/MenuItems";
import LandingHeader from "../../components/Landing/Landing_header/Landingheader";
function restaurentList() {
  return (
    <>
      <div>
        <LandingHeader isRestaurant={true} />
      </div>
      <div>
        <MenuItems />
      </div>
    </>
  );
}

export default restaurentList;
