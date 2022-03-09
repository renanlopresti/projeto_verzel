import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerated } from "../services/IdGenerated";
import { user } from "../types";

export default async function createUser(
 req: Request,
 res: Response
): Promise<void> {
 try {

  const { name, email, password, role } = req.body

  if (!name || !email || !password || !role) {
   res.statusCode = 422
   throw new Error("Preencha os campos 'name', 'email', 'role' e 'password' ")
  }
  if(role != 'ADMIN' && role != 'NORMAL'){
   res.statusCode = 423
   throw new Error("role deve ser 'ADMIN' ou 'NORMAL'")
  }

  const [user] = await connection('User')
   .where({ email })

  if (user) {
   res.statusCode = 409
   throw new Error('Email já cadastrado')
  }

  const id: string = new IdGenerated().generatedId()

  const cypherPassword: string = new HashManager().createHash(password)

  const newUser: user = {
   id,
   name,
   email,
   password: cypherPassword,
   role
  }

  await connection('User')
   .insert(newUser)

  const token = new Authenticator().generateToken({ id, role })

  res.status(201).send({ message: "User created successfully!", token })

 } catch (error) {

  if (res.statusCode === 200) {
   console.log(error)
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}