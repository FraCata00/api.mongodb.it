const request = require('supertest');
const app = require('../app');

//GET 
describe('GET /posts', function() {
    it('responds with json', async function() {
        const response = await request(app)
            .get('/posts')
            .set('Accept', 'application/json')
        expect(response.headers["Content-Type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
    });
});

//POST
describe('POST /posts', function() {
    it('Testing POSTS endpoint', function(done) {
        // Make POST Request
        // Testing
        const res = await request(app).post('/posts').send({
            title: 'How to write a post',
            description: 'Testing the APIs with supertest',
            page: 1,
            date: new Date(),
            unit: 1
        });

        // Compare response with expectations
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.message).toBe('Post Saved Successfully.');
        expect(res.body).toHaveProperty('post');

    });
});