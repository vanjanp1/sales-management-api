import { ServiceHealthController } from "../src/controllers/ServiceHealthController";
import { ServiceHealth } from "../src/models/tmf/serviceHealth";

const serviceHealthController = new ServiceHealthController();

describe("Test", () => {
  describe("Service health", () => {
    it("Checking the service health", async () => {
      const data = await serviceHealthController.getServiceHealth();
      const now = new Date();
      const expected: ServiceHealth = {
        checkDate: new Date(now.toISOString().slice(0, -5) + "Z").toISOString(),
        serviceName: process.env.npm_package_name || "sales-management-api",
        isUp: true,
        serviceVersion: process.env.npm_package_version || "1.0.0",
        buildDate: new Date(2022, 1, 10).toISOString(),
        statusMessage: "The service is working",
        connectedServices: [],
      };
      expect(data && typeof data === "object").toBe(true);
      expect(data).toMatchObject(expected);
    });
  });
});
