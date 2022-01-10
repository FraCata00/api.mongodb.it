const request = require('supertest');
const app = require('../app');

describe('Testing POSTS endpoint', function() {
    it('respond with valid HTTP status code and description and message', async() => {
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