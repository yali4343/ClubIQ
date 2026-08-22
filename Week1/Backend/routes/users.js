import { z } from "zod";
import AppError from "../errors/AppError.js";

const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().int().min(0).max(120),
});

const userIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const updateUserSchema = createUserSchema.partial();

const getValidationDetails = (zodError) => {
  return zodError.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
};

let users = [
  {
    id: 1,
    name: "Yali",
    age: 26,
  },
  {
    id: 2,
    name: "Daniel",
    age: 24,
  },
];

async function userRoutes(fastify, options) {
  fastify.get(
    "/",
    {
      schema: {
        summary: "Get all users",
        description: "Returns all users in the system",
        tags: ["Users"],
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                name: { type: "string" },
                age: { type: "integer" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      reply.code(200).send(users);
    },
  );

  fastify.post("/", async (request, reply) => {
    const result = createUserSchema.safeParse(request.body);
    if (!result.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(result.error),
      );
    }
    const userId = users.length + 1;
    const validateData = result.data;
    const user = { id: userId, ...validateData };
    users.push(user);
    reply.code(201).send({ message: "User created", user });
  });

  fastify.put("/:id", async (request, reply) => {
    const validateParams = userIdParamsSchema.safeParse(request.params);
    const validateBody = createUserSchema.safeParse(request.body);
    if (!validateParams.success || !validateBody.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(
          !validateParams.success ? validateParams.error : validateBody.error,
        ),
      );
    }

    const user = users.find((user) => user.id === validateParams.data.id);
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    const { name, age } = validateBody.data;
    user.name = name;
    user.age = age;
    reply.code(200).send({ message: "User updated", user });
  });

  fastify.patch("/:id", async (request, reply) => {
    const validateParams = userIdParamsSchema.safeParse(request.params);
    const validateBody = updateUserSchema.safeParse(request.body);
    if (!validateParams.success || !validateBody.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(
          !validateParams.success ? validateParams.error : validateBody.error,
        ),
      );
    }

    const user = users.find((user) => user.id === validateParams.data.id);
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    const { name, age } = validateBody.data;
    if (name !== undefined) {
      user.name = name;
    }
    if (age !== undefined) {
      user.age = age;
    }
    reply.code(200).send({ message: "User updated", user });
  });
  fastify.delete("/:id", async (request, reply) => {
    const validateParams = userIdParamsSchema.safeParse(request.params);
    if (!validateParams.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(validateParams.error),
      );
    }
    const userIndex = users.findIndex(
      (user) => user.id === validateParams.data.id,
    );
    if (userIndex === -1) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    users.splice(userIndex, 1);
    reply.code(204).send();
  });
}

export default userRoutes;
