import express from "express";
import { Module } from "../../libs/utils/types/module.js";
import { UpdatePaid, VerifyPaid } from "../controllers/adminController.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";

const router = express.Router();
const BASE_ROUTE = "/admin";

router.put("/payEvent/:user_id", asyncMiddleware(UpdatePaid));
router.put("/allow/:user_id", asyncMiddleware(VerifyPaid));

const MODULE: Module = {
  router,
  BASE_ROUTE,
};
export default MODULE;
