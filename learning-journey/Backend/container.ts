import { Lifecycle, container } from "tsyringe";
import { AppLogger } from "./AppLogger.js";

container.register(
  "Logger",
  {
    useClass: AppLogger,
  },
  {
    lifecycle: Lifecycle.Singleton,
  },
);

export { container };
