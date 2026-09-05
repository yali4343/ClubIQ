import { injectable } from "tsyringe";
import type { Logger } from "./Logger.js";

@injectable()
export class AppLogger implements Logger {
  log(message: string): void {
    console.log(`[App] ${message}`);
  }
}
