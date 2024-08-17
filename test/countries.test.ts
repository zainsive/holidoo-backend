//

import request from "supertest";
import { Server } from "../src/server";
import TestAgent from "supertest/lib/agent";

let app: TestAgent;

describe("Testing fetch countries.", () => {
  beforeAll((done) => {
    const serverClass = new Server();
    app = request(serverClass.app);
    done();
  });

  it("Should return success response", async () => {
    const res = await app
      .get("/countries")
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual("success");
  });
});
