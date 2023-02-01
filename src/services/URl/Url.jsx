const DEVURL   = "https://desieatsapi.appplaza.io";
const DEMOURL  = "https://desieatsapi-demo.appplaza.io";
const LOCALURL = "http://localhost:3000";

export const getUrl=()=>{
    let Apiurl="";
    if(window.location.origin==="https://desieats.appplaza.io"){
        Apiurl=DEVURL
    }else if(window.location.origin==="https://desieats-demo.appplaza.io"){ 
        Apiurl=DEMOURL
    }else if(window.location.origin==="http://localhost:3000"){
        Apiurl=DEVURL
    }
    return Apiurl
}