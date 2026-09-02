import AppError from "../errors/AppError.js";

import {
  createUserSchema,
  userIdParamsSchema,
  updateUserSchema,
  getValidationDetails,
} from "./userValidation.js";

import { detailedUserFormatter, formatUsers } from "./userFormatters.js";

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
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

function getNextUserId(users) {
  return (
    users.reduce(
      (highestId, currentUser) => Math.max(highestId, currentUser.id),
      0,
    ) + 1
  );
}

function findUserById(users, userId) {
  return users.find((user) => user.id === userId);
}

function validateUserRequest(request, bodySchema) {
  const paramsValidationResult = userIdParamsSchema.safeParse(request.params);
  const bodyValidationResult = bodySchema.safeParse(request.body);

  if (!paramsValidationResult.success || !bodyValidationResult.success) {
    throw new AppError(
      "Validation failed",
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "VALIDATION_ERROR",
      getValidationDetails(
        !paramsValidationResult.success
          ? paramsValidationResult.error
          : bodyValidationResult.error,
      ),
    );
  }

  return {
    userId: paramsValidationResult.data.id,
    validatedBody: bodyValidationResult.data,
  };
}

function getExistingUserOrThrow(users, userId) {
  const existingUser = findUserById(users, userId);

  if (!existingUser) {
    throw new AppError(
      "User not found",
      HTTP_STATUS.NOT_FOUND,
      "USER_NOT_FOUND",
    );
  }

  return existingUser;
}

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

      reply.code(HTTP_STATUS.OK).send(formattedUsers);
    },
  );

  fastify.post("/", async (request, reply) => {
    const bodyValidationResult = createUserSchema.safeParse(request.body);

    if (!bodyValidationResult.success) {
      throw new AppError(
        "Validation failed",
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "VALIDATION_ERROR",
        getValidationDetails(bodyValidationResult.error),
      );
    }

    const newUserId = getNextUserId(users);
    const validatedUserData = bodyValidationResult.data;

    const newUser = {
      id: newUserId,
      ...validatedUserData,
    };

    users = [...users, newUser];

    reply.code(HTTP_STATUS.CREATED).send(newUser);
  });

  fastify.put("/:id", async (request, reply) => {
    const { userId, validatedBody } = validateUserRequest(
      request,
      createUserSchema,
    );

    const existingUser = getExistingUserOrThrow(users, userId);

    const updatedUser = {
      ...existingUser,
      ...validatedBody,
    };

    users = users.map((user) => (user.id === userId ? updatedUser : user));

    reply.code(HTTP_STATUS.OK).send(updatedUser);
  });

  fastify.patch("/:id", async (request, reply) => {
    const { userId, validatedBody } = validateUserRequest(
      request,
      updateUserSchema,
    );

    const existingUser = getExistingUserOrThrow(users, userId);

    const updatedUser = {
      ...existingUser,
      ...validatedBody,
    };

    users = users.map((user) => (user.id === userId ? updatedUser : user));

    reply.code(HTTP_STATUS.OK).send(updatedUser);
  });

  fastify.delete("/:id", async (request, reply) => {
    const paramsValidationResult = userIdParamsSchema.safeParse(request.params);

    if (!paramsValidationResult.success) {
      throw new AppError(
        "Validation failed",
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "VALIDATION_ERROR",
        getValidationDetails(paramsValidationResult.error),
      );
    }

    const userId = paramsValidationResult.data.id;

    getExistingUserOrThrow(users, userId);

    users = users.filter((user) => user.id !== userId);

    reply.code(HTTP_STATUS.NO_CONTENT).send();
  });
}

export default userRoutes;
