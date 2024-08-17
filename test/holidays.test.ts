//

import request from "supertest";
import { Server } from "../src/server";
import TestAgent from "supertest/lib/agent";

let app: TestAgent;

describe("Testing fetch holidays.", () => {
  beforeAll((done) => {
    const serverClass = new Server();
    app = request(serverClass.app);
    done();
  });

  it("Should return success response", async () => {
    const res = await app
      .get("/holidays")
      .query({ country: "US", year: 2020 })
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
    expect(res.body.data).toBeDefined();
  });
});
