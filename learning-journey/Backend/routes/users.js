import AppError from "../errors/AppError.js";

import {
  getFormattedUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";

import {
  createUserSchema,
  userIdParamsSchema,
  updateUserSchema,
  getValidationDetails,
} from "./userValidation.js";

import { formatUsers } from "../services/userFormatters.js";

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};

function parseOrThrow(schema, data) {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    throw new AppError(
      "Validation failed",
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "VALIDATION_ERROR",
      getValidationDetails(validationResult.error),
    );
  }

  return validationResult.data;
}

function validateUserRequest(request, bodySchema) {
  const validatedParams = parseOrThrow(userIdParamsSchema, request.params);

  const validatedBody = parseOrThrow(bodySchema, request.body);

  return {
    userId: validatedParams.id,
    validatedBody,
  };
}

function throwServiceError(error) {
  if (error.code === "USER_NOT_FOUND") {
    throw new AppError(error.message, HTTP_STATUS.NOT_FOUND, error.code);
  }
}

async function userRoutes(fastify, options) {
  const { userFormatter } = options;

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
      const formattedUsers = getFormattedUsers(userFormatter);

      reply.code(HTTP_STATUS.OK).send(formattedUsers);
    },
  );

  fastify.post("/", async (request, reply) => {
    const validatedUserData = parseOrThrow(createUserSchema, request.body);

    const newUser = createUser(validatedUserData);

    reply.code(HTTP_STATUS.CREATED).send(newUser);
  });

  fastify.put("/:id", async (request, reply) => {
    const { userId, validatedBody } = validateUserRequest(
      request,
      createUserSchema,
    );

    const result = updateUser(userId, validatedBody);

    if (!result.ok) {
      throwServiceError(result.error);
    }

    reply.code(HTTP_STATUS.OK).send(result.data);
  });

  fastify.patch("/:id", async (request, reply) => {
    const { userId, validatedBody } = validateUserRequest(
      request,
      updateUserSchema,
    );

    const updatedUser = updateUser(userId, validatedBody);

    const result = updateUser(userId, validatedBody);

    if (!result.ok) {
      throwServiceError(result.error);
    }

    reply.code(HTTP_STATUS.OK).send(result.data);
  });

  fastify.delete("/:id", async (request, reply) => {
    const validatedParams = parseOrThrow(userIdParamsSchema, request.params);

    const result = deleteUser(validatedParams.id);

    if (!result.ok) {
      throwUserNotFound();
    }

    reply.code(HTTP_STATUS.NO_CONTENT).send();
  });
}

export default userRoutes;
