import { injectable } from "tsyringe";

@injectable()
export class AppLogger {
  log(message: string): void {
    console.log(`[App] ${message}`);
  }
}
