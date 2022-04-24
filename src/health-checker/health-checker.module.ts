import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthCheckerController } from "./health-checker.controller";

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckerController]
})
export class HealthCheckerModule {
}
