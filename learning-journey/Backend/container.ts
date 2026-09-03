import { container } from "tsyringe";
import { AppLogger } from "./AppLogger.js";

container.register("Logger", {
  useClass: AppLogger,
});

export { container };
