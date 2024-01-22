import { Request, Response } from "express";
import { pool } from "../../config/db.js";
import { allowIfPaid, updatePaid } from "../queries/adminQueries.js";

const UpdatePaid = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const client = await pool.connect();
  await client.query(updatePaid, [user_id])
    .then(() => {
      client.release();
    });
  return res.send({ "status": 200 });
};

const VerifyPaid = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { event_id } = req.body;
  const client = await pool.connect();
  const result = await client.query(allowIfPaid, [user_id, event_id]);
  client.release();
  if (result.rows.length == 1) {
    return res.send({ "status": 200 });
  } else {
    return res.send({ "status": 401 });
  }
};

export { UpdatePaid, VerifyPaid };
