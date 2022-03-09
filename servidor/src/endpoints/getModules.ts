import { Request, Response } from "express";
import { connection } from "../data/connection";
import { module } from "../types";

export default async function getModules(
 req: Request,
 res: Response
): Promise<void> {
 try {

  const modules = await connection('Modules')

  const newModules: module[] = modules
   .sort((a, b) => { return a.name.localeCompare(b.name) })
   .map((module) => {
    return {
     id: module.id,
     name: module.name
    }
   })

  res.status(201).send({ result: newModules })

 } catch (error) {

  if (res.statusCode === 200) {
   console.log(error)
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}