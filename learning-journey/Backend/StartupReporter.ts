import { injectable } from "tsyringe";
import { AppLogger } from "./AppLogger.js";

@injectable()
export class StartupReporter {
  constructor(private appLogger: AppLogger) {}

  reportReady(): void {
    this.appLogger.log("Server dependencies are ready");
  }
}
