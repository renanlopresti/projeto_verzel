import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Authenticator } from "../services/Authenticator";

export default async function editClassRoom(
 req: Request,
 res: Response
): Promise<void> {
 try {

  const newClass = req.body;

  const token = req.headers.authorization

  if (!newClass.id || (!newClass.id && !newClass.name && !newClass.date && !newClass.id_modules)) {
   res.statusCode = 422
   throw new Error("Informe o(s) novo(s) 'name', 'id', 'date' ou 'id_module'")
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

  await connection('Class_room')
   .update({ name:newClass.name, date:newClass.date, id_modules:newClass.id_modules })
   .where({ id: newClass.id })

  res.send({ message: "class updated sucessfully!" })

 } catch (error) {
  if (res.statusCode === 200) {
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}