import supertest from "supertest";
import app from "./../config/app"
import { error } from "console";

describe('Test GET /users', () => {
  test('It should respond with 200 success', async () => {
    const response = await supertest(app)
    .get('/api/user')
    .expect(200)
    console.log(response.body)
  });
});


describe('Test POST /users', () => {
    test('It should throw an error', async () => {
      const response = await supertest(app)
      .post('/api/user')
      .expect(error)
     
    });

    test('It should return user already exists', async () => {
        const response = await supertest(app)
        .post('/api/user')
        .expect(error)
    })
  });
