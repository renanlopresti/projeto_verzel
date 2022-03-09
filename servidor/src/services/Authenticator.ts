import { JwtPayload, sign, verify } from "jsonwebtoken"
import { authenticationData } from "../types";
import dotenv from 'dotenv'

dotenv.config()

export class Authenticator {

 generateToken = (
  payload: authenticationData
 ) => {
  const token = sign(
   payload,
   process.env.JWT_SECRET,
   { expiresIn: process.env.EXPIRES_IN }
  )

  return token;
 }


 getTokenData = (token: string) => {
  try {
   const tokenData = verify(
    token,
    process.env.JWT_SECRET
   ) as JwtPayload

   return {
    id: tokenData.id,
    role: tokenData.role
   }
  } catch (error) {
   console.log(error)
   return null
  }
 }

}

