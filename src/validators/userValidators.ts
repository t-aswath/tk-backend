import { z } from "zod";

const UserSchema = z
  .object({
    user_id: z.number(),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(4, "Name should be atleast 4 characters")
      .max(15, "Name should be atmost 15 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    clg_name: z.string()
      .min(4, "Name should be atleast 4 characters")
      .max(15, "Name should be atmost 15 characters"),
    phone_no: z.string()
      .length(10, "Mobile number should be 10 digits long"),
  });

const createUserValidator = UserSchema.omit({ user_id: true });
const getUserValidator = UserSchema.pick({ email: true });
const getUserCartValidator = UserSchema.pick({ user_id: true });

export {
  createUserValidator,
  getUserCartValidator,
  getUserValidator,
  UserSchema,
};
