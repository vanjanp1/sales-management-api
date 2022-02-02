import { enumDeep } from "../models/enumDeep";
import { ServiceHealth } from "../models/serviceHealth";

export default class ServiceHealthController {
  public async getServiceHealth(deep: enumDeep): Promise<any> {
    let serviceHealth = new ServiceHealth();

    serviceHealth.serviceName =
      process.env.npm_package_name || "service-health-template";
    serviceHealth.checkDate = new Date(2022, 1, 10);
    serviceHealth.isUp = true;
    serviceHealth.serviceVersion = process.env.npm_package_version || "1.0.0";
    serviceHealth.buildDate = new Date(2022, 1, 10);
    serviceHealth.statusMessage = "The service is working";
    serviceHealth.connectedServices = [];

    switch (deep) {
      case enumDeep.none:
        console.log("Returning only api service Health");
        break;
      case enumDeep.one:
        console.log('Returning Api Health and services conected using "none"');
        // Check Service Health for any service connected, usgin enumDeep.none
        // getServiceHealt(enumDeep.none)
        break;
      case enumDeep.all:
        console.log('Returning Api Health and services conected using "one"');
        // Check Service Health for any service connected, usgin enumDeep.one
        // getServiceHealt(enumDeep.one)
        break;
    }

    return serviceHealth;
  }
}
