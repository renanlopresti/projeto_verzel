import { connection } from "./connection";

const createTables = () => {
 connection.raw(`
CREATE TABLE IF NOT EXISTS Modules (
 id VARCHAR(64) PRIMARY KEY,
 name VARCHAR(255) UNIQUE NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Class_room (
 id VARCHAR(64) PRIMARY KEY,
 name VARCHAR(255) UNIQUE NOT NULL,
 date DATE NOT NULL, 
 id_modules VARCHAR(64),
 FOREIGN KEY (id_modules) REFERENCES Modules(id)
);

CREATE TABLE IF NOT EXISTS User (
 id VARCHAR(64) PRIMARY KEY,
 email VARCHAR(255) UNIQUE NOT NULL,
 name VARCHAR(255) NOT NULL, 
 password VARCHAR(255) NOT NULL,
 role VARCHAR(255) NOT NULL DEFAULT "normal"
);

`).then(() => {
  console.log("Tabelas criadas!");
 }).catch(error => {
  console.log(error.sqlMessage || error.message);
 }).finally(() => {
  connection.destroy()
 })
}
