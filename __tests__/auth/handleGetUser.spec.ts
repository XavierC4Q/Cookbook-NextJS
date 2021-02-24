import handleGetUser from "../../pages/api/auth/handleGetUser";
import { createMocks } from "node-mocks-http";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(() => true)
}));

describe("api/auth/handleGetUser", () => {
  test("should require a token", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handleGetUser(req, res);

    expect(res._getStatusCode()).toBe(401);
  });

  test("should return a user given a token", async () => {
    const { req, res } = createMocks({
      method: "GET",
      headers: { authorization: "Bearer faketestmocktoken" },
    });

    await handleGetUser(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
