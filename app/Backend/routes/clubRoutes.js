import AppError from "../errors/AppError.js";
import {
  getAllClubs,
  getClubById,
  selectClub,
} from "../services/clubService.js";
import {
  clubIdParamsSchema,
  clubSelectionBodySchema,
} from "../schemas/clubSchemas.js";

const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
};

function parseClubIdOrThrow(params) {
  const validationResult = clubIdParamsSchema.safeParse(params);

  if (!validationResult.success) {
    throw new AppError(
      "Validation failed",
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "VALIDATION_ERROR",
    );
  }

  return validationResult.data.id;
}

function parseClubSelectionOrThrow(body) {
  const validationResult = clubSelectionBodySchema.safeParse(body);

  if (!validationResult.success) {
    throw new AppError(
      "Validation failed",
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      "VALIDATION_ERROR",
    );
  }

  return validationResult.data;
}

async function clubRoutes(fastify) {
  fastify.get(
    "/",
    {
      schema: {
        summary: "Get all clubs",
        description: "Returns all currently supported football clubs",
        tags: ["Clubs"],
      },
    },
    async (request, reply) => {
      const clubs = getAllClubs();

      return reply.code(HTTP_STATUS.OK).send(clubs);
    },
  );

  fastify.patch(
    "/selection",
    {
      schema: {
        summary: "Select a club",
        description: "Saves the currently selected football club",
        tags: ["Clubs"],
      },
    },
    async (request, reply) => {
      const { clubId } = parseClubSelectionOrThrow(request.body);

      const club = selectClub(clubId);

      if (!club) {
        throw new AppError(
          "Club not found",
          HTTP_STATUS.NOT_FOUND,
          "CLUB_NOT_FOUND",
        );
      }

      return reply.code(HTTP_STATUS.OK).send(club);
    },
  );

  fastify.get(
    "/:id",
    {
      schema: {
        summary: "Get club by ID",
        description: "Returns one supported football club",
        tags: ["Clubs"],
      },
    },
    async (request, reply) => {
      const clubId = parseClubIdOrThrow(request.params);

      const club = getClubById(clubId);

      if (!club) {
        throw new AppError(
          "Club not found",
          HTTP_STATUS.NOT_FOUND,
          "CLUB_NOT_FOUND",
        );
      }

      return reply.code(HTTP_STATUS.OK).send(club);
    },
  );
}

export default clubRoutes;
