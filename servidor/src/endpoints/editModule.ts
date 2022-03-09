import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Authenticator } from "../services/Authenticator";

export default async function editModules(
 req: Request,
 res: Response
): Promise<void> {
 try {

  const { name, id } = req.body

  const token = req.headers.authorization

  if (!id || (!id && !name)) {
   res.statusCode = 422
   throw new Error("Informe o(s) novo(s) 'name' ou 'id'")
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

  await connection('Modules')
   .update({ name })
   .where({ id: id })

  res.send({ message: "module updated sucessfully!" })

 } catch (error:any) {
  if (res.statusCode === 200) {
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}