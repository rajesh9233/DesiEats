import React from "react";
import MenuItems from '../../components/Restaurent__list/Menu/MenuItems'
import MenuHeader from "../../components/Restaurent__list/Menu/MenuHeader";
import Menu from "../../components/Restaurent__list/Menu/MenuItems";
function restaurentList() {
  return (
    <>
    <div>
    <MenuHeader/>
    </div>
    <div>
        <MenuItems/>
      </div>
    </>
    
  );
}

export default restaurentList;
