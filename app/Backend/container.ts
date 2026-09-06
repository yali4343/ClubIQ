import { Lifecycle, container } from "tsyringe";
import { AppLogger } from "./logging/index.js";
import { InMemoryClubService } from "./services/index.js";

import type { AppConfig } from "./config/appConfig.types.js";
import type { ClubService } from "./services/index.js";

const appConfig: AppConfig = {
  environment: "development",
  applicationName: "Fastify Learning API",
};

container.register(
  "Logger",
  {
    useClass: AppLogger,
  },
  {
    lifecycle: Lifecycle.Singleton,
  },
);

container.register<AppConfig>("AppConfig", {
  useValue: appConfig,
});

container.register("StartupMessage", {
  useFactory: () => {
    return `Application started at ${new Date().toISOString()}`;
  },
});

container.register<ClubService>(
  "ClubService",
  {
    useClass: InMemoryClubService,
  },
  {
    lifecycle: Lifecycle.Singleton,
  },
);

export { container };
