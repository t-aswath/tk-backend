import { pool } from "../../config/db.js";
import {
  begin,
  commit,
  createUser,
  deleteAllFromCart,
  deleteFromCart,
  getCart,
  getUserDetails,
  insertMissingOnes,
  rollback,
} from "../queries/userQueries.js";
import { PostgresError } from "../interfaces/userInterface.js";
import { NextFunction, Request, Response } from "express";

const userDetails = [
  "name",
  "email",
  "phone_no",
  "clg_name",
];

const GetUserDetails = async (req: Request, res: Response) => {
  const { user_email } = req.params;
  const client = await pool.connect();
  const result = await client.query(getUserDetails, [user_email]);
  return res.send({ data: result.rows, "status": 200 });
};

const CreateUser = async (req: Request, res: Response) => {
  const data = { ...req.body };
  const sql_arr = userDetails.map((prop) => data[prop]);
  const client = await pool.connect();
  await client.query(createUser, [...sql_arr])
    .then(() => {
      client.release();
    });
  return res.send({ "status": 200 });
};

const GetUserCart = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const client = await pool.connect();
  const result = await client.query(getCart, [user_id]);
  return res.send({ "status": 200, data: result.rows });
};

const UpdateUserCart = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const { events_id } = req.body;
  const client = await pool.connect();
  try {
    await client.query(begin);
    if (events_id.length == 0) {
      await client.query(deleteAllFromCart, [user_id]);
    } else {
      await client.query(deleteFromCart, [user_id, events_id]);
      await client.query(insertMissingOnes, [user_id, events_id]);
    }
    await client.query(commit);
    return res.send({ "status": 200 });
  } catch (err) {
    await client.query(rollback);
    if (err && ((err as PostgresError).code === "23503")) {
      return res.send({ "status": 404 });
    }
    next();
  }
};

export { CreateUser, GetUserCart, GetUserDetails, UpdateUserCart };
