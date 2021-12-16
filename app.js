const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const { MongoClient } = require('mongodb');
const port = 3000; //port

require('dotenv/config');

app.set('view engine', 'ejs');


//Middlewares
app.use(cors());
app.use(bodyParser.json());

//import routes
const postsRoute = require('./routes/posts');
const customersRoute = require('./routes/customers');
const borrowingRoute = require('./routes/borrowings');
app.use('/posts', postsRoute);
app.use('/customers', customersRoute);
app.use('/borrowings', borrowingRoute);

//another GET FRONTEND

//routes GET
app.get('/', (req, res) => {
    res.send('We are on home');
});

//connect
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connect to mongodb Atlas'),
        console.log('..welcome user..')
});

//also connect with function
async function main() {

    const uri = process.env.DB_CONNECTION
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await findBooks(client);

    } finally {
        await client.close();
    }
}

main().catch(console.error);

//function to find books in HTML output
async function findBooks(client) {
    const cursor = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION).find({});
    const results = await cursor.toArray();

    if (results.length > 0) {
        results.forEach((result, i) => {

            console.log(result);

        });
    } else {
        console.log('No books found');
    }
}

//port server running
app.listen(port);