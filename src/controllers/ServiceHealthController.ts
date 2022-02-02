import { enumDeep, getEnumfromString } from "../models/enumDeep";
import { ServiceHealth } from "../models/tmf/serviceHealth";
import { Controller, Get, Route, Path, Query } from "@tsoa/runtime";

@Route("service-health")
export class ServiceHealthController extends Controller {
  @Get()
  public async getServiceHealth(
    @Query() deep?: string
  ): Promise<ServiceHealth> {
    const deep_: enumDeep = getEnumfromString(deep);
    const now = new Date();
    let serviceHealth: ServiceHealth = {
      serviceName: process.env.npm_package_name || "your-api-name",
      checkDate: new Date(now.toISOString().slice(0, -5) + "Z").toISOString(),
      isUp: true,
      serviceVersion: process.env.npm_package_version || "1.0.0",
      buildDate: new Date(2022, 1, 10).toISOString(),
      statusMessage: "The service is working",
      connectedServices: [],
    };

    switch (deep_) {
      case enumDeep.none:
        console.log("Returning only api service Health");
        break;
      case enumDeep.one:
        console.log('Returning Api Health and services conected using "none"');
        // Check Service Health for any service connected, usgin enumDeep.none
        // getServiceHealt(enumDeep.none)
        break;
      case enumDeep.all:
        console.log('Returning Api Health and services conected using "all"');
        // Check Service Health for any service connected, usgin enumDeep.all
        // getServiceHealt(enumDeep.one)
        break;
    }

    return serviceHealth;
  }
}
