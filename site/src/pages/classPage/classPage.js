import React, { useEffect, useContext } from "react";
import { DivMain } from "./styled";
import { getClassRoom } from '../../services/services'
import { GlobalContext } from "../../contexts/GlobalStateContext";
import {  useParams } from 'react-router-dom';

export default function ClassPage() {
 const params = useParams()
 const { states, setters, clears } = useContext(GlobalContext)


 return (
  <DivMain>

  </DivMain>
 )
}