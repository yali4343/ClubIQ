import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().int().min(0).max(120),
});

export const userIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const updateUserSchema = createUserSchema.partial();

export const getValidationDetails = (zodError) => {
  return zodError.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};