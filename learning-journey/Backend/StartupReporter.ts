import { inject, injectable } from "tsyringe";
import type { Logger } from "./Logger.js";

@injectable()
export class StartupReporter {
  constructor(@inject("Logger") private logger: Logger) {}

  reportReady(): void {
    this.logger.log("Server dependencies are ready");
  }
}
