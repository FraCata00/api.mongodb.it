const request = require('supertest');
const app = require('./app');

describe('Testing POSTS/shots endpoint', function() {
    it('respond with valid HTTP status code and description and message', function(done) {
        // Make POST Request
        // Testing
        const response = await supertest(app).post('/posts').send({
            title: 'How to write a post',
            description: 'Testing the APIs with supertest',
            page: 1,
            date: new Date(),
            unit: 1
        });

        // Compare response with expectations
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Post Saved Successfully.');
    });
});