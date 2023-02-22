import app from "../app"
import supertest from "supertest";
import mongoose from "mongoose";
import "../loadEnv.mjs";

beforeEach(async()=>{
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.DB_URL || "");
})

afterEach(async() => {
  await mongoose.connection.close();
});

test("GET /countries", async () => {
	await supertest(app)
		.get("/countries")
		.expect(200)
		.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toBeGreaterThan(0)
		});
})