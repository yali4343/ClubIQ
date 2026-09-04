import { Lifecycle, container } from "tsyringe";
import { AppLogger } from "./logging/AppLogger.js";

import type { AppConfig } from "./AppConfig.js";

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

export { container };
