import { z } from "zod";

const EventSchema = z
  .object({
    event_id: z.number(),
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(4, "Name should be atleast 4 characters")
      .max(15, "Name should be atmost 15 characters"),
    description: z.string() 
  });
