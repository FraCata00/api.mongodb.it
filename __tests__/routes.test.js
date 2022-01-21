const req = require('supertest');
const app = require('../app');

//TEST POSTS_ROUTE
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
        expect(res.body.status).toBe('success');
        //expect(res.bodyState).toBe('success');
        expect(res.body.message).toBe('Post Saved Successfully.');
    });
});

//TEST CUSTOMERS_ROUTE
//GET 
describe('GET /customers', () => {
    it('responds with json', async() => {
        const res = await req(app)
            .get('/customers')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(201);
    });
});

//POST
describe('POST /customers', () => {
    it('Testing CUSTOMERS endpoint', async() => {
        // Make POST Request
        // Testing
        const res = await req(app)
            .post('/customers')
            .send({
                name: 'Test',
                surname: 'Customer',
                age: '9999999',
                username: 'TestingCustomer',
                email: 'test@customer.com',
                password: 'CustomerTestingPassword00!'
            });

        // Compare response with expectations
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toBe('success');
        //expect(res.bodyState).toBe('success');
        expect(res.body.message).toBe('Customer Saved Successfully.');
    });
});

//TEST BORROWING_ROUTE
//GET 
describe('GET /borrowings', () => {
    it('responds with json', async() => {
        const res = await req(app)
            .get('/borrowings')
            .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(201);
    });
});

//POST
describe('POST /borrowings', () => {
    it('Testing CUSTOMERS endpoint', async() => {
        // Make POST Request
        // Testing
        const res = await req(app)
            .post('/borrowings')
            .send({
                idPost: '61eab1e806fac65ed0c62d83',
                idCustomer: '',
                unit: 2
            });

        // Compare response with expectations
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toBe('success');
        //expect(res.bodyState).toBe('success');
        expect(res.body.message).toBe('Borrowing Saved Successfully.');
    });
});