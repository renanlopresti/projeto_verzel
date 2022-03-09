import { classRoom } from './../types';
import { Request, Response } from "express";
import { connection } from "../data/connection";

export default async function getClassRoom(
 req: Request,
 res: Response
): Promise<void> {
 try {
  const id_modules = req.params.id

  const classRoom = await connection('Class_room')
   .where({ id_modules })

  const newClassRoom: classRoom[] = classRoom.sort((a, b) => {
   return a.date - b.date
  })
   .map((object) => {
    return {
     id: object.id,
     name: object.name,
     date: object.date,
     id_modules: object.id_modules
    }
   })

  res.status(201).send({ result: classRoom })

 } catch (error) {

  if (res.statusCode === 200) {
   console.log(error)
   res.status(500).send({ message: "Internal server error" })
  } else {
   res.send({ message: error.sqlMessage || error.message })
  }
 }
}