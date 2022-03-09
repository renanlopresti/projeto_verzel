import React, { useContext } from "react";
import { DivInfo, DivCard, ImgModule, DivDescription } from "./styled";
import Typography from '@mui/material/Typography';
import iconClass from '../../assets/icon_class.svg'
import { Button } from "@mui/material";

export default function CardModule(props) {
 const { module, goToClass } = props
 return (
  <DivCard>
   <ImgModule src={iconClass} />
   <DivDescription>
    <DivInfo>
     <Typography
      variant="caption"
     >{module.name} </Typography>
     <Button
      onClick={goToClass}
      color="secondary"
      variant="outlined"
     >Mais informações</Button>
    </DivInfo>
   </DivDescription>
  </DivCard>
 )
}