const req = require('supertest');
const app = require('../app');

//GET 
describe('GET /posts', () => {
    it('responds with json', async() => {
        const res = await req(app)
            .get('/posts')
            .set('Accept', 'application/json')
            //expect(res.headers["Content-Type"]).toMatch(/json/);
        expect(res.statusCode).toEqual(201);
    });
});

//POST
describe('POST /posts', () => {
    it('Testing POSTS endpoint', async() => {
        // Make POST Request
        // Testing
        const res = await req(app)
            .post('/posts')
            .send({
                title: 'How to write a post',
                description: 'Testing the APIs with supertest',
                page: '1',
                unit: 1
            });

        // Compare response with expectations
        expect(res.statusCode).toEqual(201);
        //expect(res.body.status).toBe('success');
        //expect(res.bodyState).toBe('success');
        expect(res.body.message).toBe('Post Saved Successfully.');
        expect(res.body).toHaveProperty('post');
    });
});