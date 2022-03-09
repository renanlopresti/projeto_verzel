import { classRoom } from './../types';
import { Request, Response } from "express";
import { connection } from "../data/connection";
import { IdGenerated } from "../services/IdGenerated";
import { Authenticator } from '../services/Authenticator';

export default async function createClassRoom(
 req: Request,
 res: Response
): Promise<void> {
 try {

  const { name, date, id_modules } = req.body

  const token = req.headers.authorization

  if (!name || !date || !id_modules) {
   res.statusCode = 422
   throw new Error("Informe o(s) novo(s) 'name', 'date' e 'id_modules'")
  }

  const tokenData = new Authenticator().getTokenData(token)

  if (!tokenData) {
   res.statusCode = 401
   throw new Error("token invalido ou nao passado no headers")
  }

  if (tokenData.role !== "ADMIN") {
   res.statusCode = 403 
   res.statusMessage = "usuário não permitido"
   throw new Error("usuário não permitido")
  }

  const [classRoom] = await connection('Class_room')
   .where({ name })

  if (classRoom) {
   res.statusCode = 409
   throw new Error('Aula já cadastrado')
  }

  const id: string = new IdGenerated().generatedId()

  const newClassRoom: classRoom = {
   id,
   name,
   date,
   id_modules
  }

  await connection('Class_room')
   .insert(newClassRoom)

  res.status(201).send({ message: "Class created successfully!" })

 } catch (error) {

  if (res.statusCode === 200) {
   console.log(error)
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}