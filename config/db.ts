import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || 'localhost',
  database: "takshashila",
  password: process.env.DB_PASS,
  port: 5505,
});

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
