import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

pool.connect()
  .then(() => {
    console.log("Connected to the database");
  }) 
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });