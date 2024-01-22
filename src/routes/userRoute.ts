import express from "express";
import {
  CreateUser,
  GetUserCart,
  GetUserDetails,
  UpdateUserCart,
} from "../controllers/userController.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";

const router = express.Router();
const BASE_ROUTE = "/user";

router.get("/:user_email", asyncMiddleware(GetUserDetails));
router.post("/", asyncMiddleware(CreateUser));
router.get("/getCart/:user_id", asyncMiddleware(GetUserCart));
router.put("/updateCart/:user_id", UpdateUserCart);

const MODULE = {
  router,
  BASE_ROUTE,
};
export default MODULE;
