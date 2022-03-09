import React, { useState } from "react";
import { GlobalContext } from "./GlobalStateContext";
import useForm from "../hooks/useForm"


const GlobalState = (props) => {
 const [formProfile, onChangeProfile, clearProfile] = useForm({ email: "desafio@appnoz.com.br", password: "12341234" })
 const [isLoading, setIsLoading] = useState(true);
 const [modules, setModules] = useState();
 const [modu, setModu] = useState();
 const [classRoom, setClassRoom] = useState();


 const states = {
  modules,
  modu,
  formProfile,
  isLoading,
  modules,
  classRoom
 }
 const setters = {
  setModu,
  onChangeProfile,
  setIsLoading,
  setModules,
  setClassRoom
 }
 const clears = {
  clearProfile
 }



 return (
  <GlobalContext.Provider value={{ states, setters, clears }}>
   {props.children}
  </GlobalContext.Provider>
 );
};

export default GlobalState;