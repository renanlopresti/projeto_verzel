import { module } from './../types';
import { Request, Response } from "express";
import { connection } from "../data/connection";
import { IdGenerated } from "../services/IdGenerated";
import { Authenticator } from '../services/Authenticator';

export default async function createModule(
 req: Request,
 res: Response
): Promise<void> {
 try {

  const { name } = req.body

  const token = req.headers.authorization

  if (!name) {
   res.statusCode = 422
   throw new Error("Informe o(s) novo(s) 'name'")
  }

  const tokenData = new Authenticator().getTokenData(token)

  if (!tokenData) {
   res.statusCode = 401
   throw new Error("token invalido ou nao passado no headers")
  }

  if (tokenData.role !== "ADMIN") {
   res.statusCode = 403 
   throw new Error("usuário não permitido")
  }

  const [module] = await connection('Modules')
   .where({ name })

  if (module) {
   res.statusCode = 409
   throw new Error('Module já cadastrado')
  }

  const id: string = new IdGenerated().generatedId()

  const newModule: module = {
   id,
   name
  }

  await connection('Modules')
   .insert(newModule)

  res.status(201).send({ message: "Module created successfully!" })

 } catch (error) {

  if (res.statusCode === 200) {
   console.log(error)
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}