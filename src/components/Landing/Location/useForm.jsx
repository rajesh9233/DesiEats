import React, { useState } from 'react'
import {omit} from 'lodash'
import { object } from 'yup';

/*
APP.JS

 
//call back function for Login 
const formLogin = () => {

  // console.log("Callback function when form is submitted!");
   //console.log("Form Values ", values);
 }
  //Custom hook call
  const {handleChange, values,errors,handleSubmit,handleBlur,touched,isValid} = useForm(formLogin);


*/


const useForm = (callback) => {
    
    //Form values
    const [values, setValues] = useState({});
    //Errors
    const [errors, setErrors] = useState({});
    //touched
    const [touched, setTouched] =useState(false);

    const isValid = values !== "";

   
    const validate = (event, name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'username':
                if(value.length <= 8){
                    // we will set the error state

                    setErrors({
                        ...errors,
                        username:'Username atleast have 8 characters'
                    })
                }else{
                    // set the error state empty or remove the error for username input

                    //omit function removes/omits the value from given object and returns a new object
                    let newObj = omit(errors, "username");
                    setErrors(newObj);
                    
                }
                break;
                case 'otp':
                    if(value.length ===0){
                        // we will set the error state
    
                        setErrors({
                            ...errors,
                            otp:'Please Enter Otp'
                        })
                    }else{
                        // set the error state empty or remove the error for username input
    
                        //omit function removes/omits the value from given object and returns a new object
                        let newObj = omit(errors, "username");
                        setErrors(newObj);
                        
                    }
                    break;            
            case 'email':
                if(
                    !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        email:'Enter a valid email address'
                    })

                }else {

                    let newObj = omit(errors, "email");
                    setErrors(newObj);
                    
                }
            break;
            
            case 'password':
                if(
                    !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
                ){
                    setErrors({
                        ...errors,
                        password:'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                }else{

                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                    
                }
break;
                case 'mobileNumber':
                    if(
                        !new RegExp(/^[0-9\b]+$/).test(value)

                    ){
                        setErrors({
                            ...errors,
                            mobileNumber :'Please Enter Digits Only '
                        }) 
                    }
                    
                   else if(value.length <= 8){
                        // we will set the error state
    
                        setErrors({
                            ...errors,
                            mobileNumber:'Please Enter 8 digits'
                        })
                    }
                    else if (value.length ===""){
                        // we will set the error state
    
                        setErrors({
                            ...errors,
                            mobileNumber:'Please Enter Mobile Number'
                        })

                    }
                    else{
                        let newObj = omit(errors, "mobileNumber");
                        setErrors(newObj);
                    }

                
            break;
            
            default:
              
        }
    }

  //A method to handle form inputs
    const handleChange = (event) => {
        //To stop default events    
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        
        validate(event,name,val);
        //Let's set these values in state

        setValues({
            ...values,
            [name]:val,
        })

    }
    
const handleBlur =()=>{
    setTouched(true)
}

    const handleSubmit = (event) => {
        if(event) event.preventDefault();

        if(Object.keys(errors).length === 0 && Object.keys(values).length !==0 ){
            callback();
            // console.log(values.mobileNumber);
        }


        
    }


    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        isValid
    }
}




export default useForm