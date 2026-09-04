import { inject, injectable } from "tsyringe";
import type { Logger } from "./logging/index.js";
import { AppConfig } from "./AppConfig.js";

@injectable()
export class StartupReporter {
  constructor(
    @inject("Logger") private logger: Logger,
    @inject("AppConfig") private config: AppConfig,
  ) {}

  reportReady(): void {
    this.logger.log(
      `${this.config.applicationName} is ready in ${this.config.environment} mode`,
    );
  }
}
