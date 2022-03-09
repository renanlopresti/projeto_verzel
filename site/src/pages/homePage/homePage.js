import React, { useEffect, useContext } from "react";
import { DivMain, DivHeader, DivCards, DivLogo, DivLogin, Img } from "./styled";
import Typography from '@mui/material/Typography';
import logo from "../../assets/logo_devaria.svg"
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from '@mui/material/Fab';
import CardModule from "./cardModule";
import { useNavigate } from "react-router-dom";
import { getModules } from "../../services/services";
import { GlobalContext } from "../../contexts/GlobalStateContext";
import { gotToClassPage } from "../../routes/coordinator";

export default function HomePage() {
 const history = useNavigate
 const { states, setters, clears } = useContext(GlobalContext)

 useEffect(() => {
  getModules(setters.setIsLoading, setters.setModules)
 }, [])

 const goToClass = (id) => {
  gotToClassPage(history, id)
 }

 const modulesCards = states.modules && states.modules.map((mod) => {
  return (
   <CardModule
    key={mod.id}
    module={mod}
    goToClass={() => goToClass(mod.id)}
   />
  )
 })

 return (
  <DivMain>
   <DivHeader>
    <DivLogo>
     <Img src={logo}></Img>
    </DivLogo>
    <DivLogin>
     <Typography
      color="primary"
      sx={{ mr: '10px' }}
     >Login</Typography>
     <Fab
      color="primary"
      size="small"
     >
      <LogoutIcon />
     </Fab>
    </DivLogin>
   </DivHeader>
   <DivCards>
    {modulesCards && modulesCards.length > 0 ? modulesCards : <div>Sem Modulos</div>}
   </DivCards>

  </DivMain>
 )
}