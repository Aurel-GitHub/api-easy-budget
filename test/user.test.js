const request = require('supertest');
const User = require('../models/User');
const app = require('../app');
describe('user', () => {
     beforeEach(() => {
        app.connect();
     })
     afterEach(() => {
         app.delete();
         User.collection.deleteMany();
     })

     describe('POST, /api/auth/login', () => {
        it('should return a status 401', async () => {
            const response = await request(app)
                .post("/api/auth/login")
                .send({})
                .set({ Accept: "Application/json" });
            expect(response.status).toBe(401);
        });
     })



})