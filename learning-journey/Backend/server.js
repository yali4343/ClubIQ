import Fastify from "fastify";
import AppError from "./errors/AppError.js";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import userRoutes from "./routes/users.js";
import cors from "@fastify/cors";
import { detailedUserFormatter } from "./routes/userFormatters.js";

const fastify = Fastify({
  logger: true,
});

fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({
      code: error.code,
      message: error.message,
      ...(error.details && { details: error.details }),
    });
  }

  request.log.error(error);

  return reply.code(500).send({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
});

fastify.setNotFoundHandler((request, reply) => {
  return reply.code(404).send({
    code: "ROUTE_NOT_FOUND",
    message: "Route not found",
  });
});

fastify.register(swagger, {
  openapi: {
    info: {
      title: "My API",
      description: "REST API documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
});

await fastify.register(swaggerUi, {
  routePrefix: "documentation",
});

fastify.addHook("onRequest", async (request, reply) => {
  console.log("onRequest:", request.method, request.url);
});

fastify.addHook("preHandler", async (request, reply) => {
  console.log("preHandler:", request.method, request.url);
});

fastify.register(userRoutes, {
  prefix: "/users",
  userFormatter: detailedUserFormatter,
});

fastify.get("/search", async (request, reply) => {
  const page = request.query.page ?? "1";
  const limit = request.query.limit ?? "10";

  return { page, limit };
});

const port = process.env.PORT || 3000;

await fastify.listen({
  port: Number(port),
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down server...`);

  try {
    await fastify.close();
    console.log("Server closed");
    process.exit(0);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
