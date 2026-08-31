import AppError from "../errors/AppError.js";

import {
  createUserSchema,
  userIdParamsSchema,
  updateUserSchema,
  getValidationDetails,
} from "./userValidation.js";

import { detailedUserFormatter, formatUsers } from "./userFormatters.js";

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
                displayName: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const formattedUsers = formatUsers(users, detailedUserFormatter);

      reply.code(200).send(formattedUsers);
    },
  );

  fastify.post("/", async (request, reply) => {
    const bodyValidationResult = createUserSchema.safeParse(request.body);
    if (!bodyValidationResult.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(bodyValidationResult.error),
      );
    }
    const userId =
      users.reduce(
        (highestId, currentUser) => Math.max(highestId, currentUser.id),
        0,
      ) + 1;
    const validatedUserData = bodyValidationResult.data;
    const newUser = { id: userId, ...validatedUserData };
    users.push(newUser);
    reply.code(201).send(newUser);
  });

  fastify.put("/:id", async (request, reply) => {
    const paramsValidationResult = userIdParamsSchema.safeParse(request.params);
    const bodyValidationResult = createUserSchema.safeParse(request.body);
    if (!paramsValidationResult.success || !bodyValidationResult.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(
          !paramsValidationResult.success
            ? paramsValidationResult.error
            : bodyValidationResult.error,
        ),
      );
    }

    const existingUser = users.find(
      (user) => user.id === paramsValidationResult.data.id,
    );
    if (!existingUser) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    const { name, age } = bodyValidationResult.data;
    existingUser.name = name;
    existingUser.age = age;
    reply.code(200).send(existingUser);
  });

  fastify.patch("/:id", async (request, reply) => {
    const paramsValidationResult = userIdParamsSchema.safeParse(request.params);
    const bodyValidationResult = updateUserSchema.safeParse(request.body);
    if (!paramsValidationResult.success || !bodyValidationResult.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(
          !paramsValidationResult.success
            ? paramsValidationResult.error
            : bodyValidationResult.error,
        ),
      );
    }

    const user = users.find(
      (user) => user.id === paramsValidationResult.data.id,
    );
    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    const { name, age } = bodyValidationResult.data;
    if (name !== undefined) {
      user.name = name;
    }
    if (age !== undefined) {
      user.age = age;
    }
    reply.code(200).send(user);
  });
  fastify.delete("/:id", async (request, reply) => {
    const paramsValidationResult = userIdParamsSchema.safeParse(request.params);
    if (!paramsValidationResult.success) {
      throw new AppError(
        "Validation failed",
        422,
        "VALIDATION_ERROR",
        getValidationDetails(paramsValidationResult.error),
      );
    }
    const userIndex = users.findIndex(
      (user) => user.id === paramsValidationResult.data.id,
    );
    if (userIndex === -1) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    users.splice(userIndex, 1);
    reply.code(204).send();
  });
}

export default userRoutes;
