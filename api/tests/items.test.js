const items = require("../../database/items");
const server = require("../../server");
const prisma = require("../../database/index");
const bcrypt = require("bcrypt");

describe("/routes/items", () => {

    const test_user = {
      id: 123,
      username: "test",
      password: "password",
    };

    describe("GET /:id", () => {
        beforeEach(async () => {
          prisma.user.findUnique = jest.fn().mockResolvedValue(test_user);
    
          bcrypt.compare = jest.fn().mockResolvedValue(true);
    
          const res = await supertest(server).post("/api/auth/login").send({
            username: "test",
            password: "pass123",
          });
    
          token = res.body.token;
        });
    
        afterEach(() => {
          jest.clearAllMocks();
        });
    
        it("returns 200 status code when successful", async () => {
          prisma.items.findUnique = jest
            .fn()
            .mockResolvedValue({ id: 123, ...items[0] });
    
          const res = await supertest(server).get("/route/items/123");
    
          expect(res.status).toBe(200);
        });
    })

    it("returns items object when successful", async () => {
        prisma.items.findUnique = jest
          .fn()
          .mockResolvedValue({ id: 123, ...items[0] });
  
        const res = await supertest(server).get("/route/items/123");
  
        expect(res.body).toMatchObject({ id: 123, ...items[0] });
      });
    });