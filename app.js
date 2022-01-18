const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const admin = require('firebase-admin');
//const serviceAccount = require('./api-mongodb-it-firebase-adminsdk-5mbel-3cf9c9d806.json');
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
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DB_CONNECTION
});

//Notification
app.post('/sendToDevice', function(req, res) {
    const fcmToken = req.body.token;
    const type = req.body.type;
    let notificationPayload;

    if (type === 'notification') {
        notificationPayload = {
            "notification": notification
        };
    } else if (type === 'data') {
        notificationPayload = {
            "data": data
        };
    } else {
        notificationPayload = {
            "notification": notification,
            "data": data
        };
    }

    var notificationOptions = {
        priority: "high"
    };

    admin.messaging().sendToDevice(fcmToken, notificationPayload, notificationOptions)
        .then(function(response) {
            console.log("Successfully sent notification:", response);
            res.json({ "Message": "Successfully sent notification" });
        })
        .catch(function(error) {
            console.log("Error sending notification:", error);
            res.json({ "Message": "Error sending notification" });
        });
})

app.post('/subscribeToTopic', function(req, res) {
    const topic = req.body.topic;
    const token = req.body.token;

    admin.messaging().subscribeToTopic(token, topic)
        .then(function(response) {
            console.log("Successfully subscribed to topic:", response);
            res.json({ "Message": "Successfully subscribed to topic." });
        })
        .catch(function(error) {
            console.log("Error subscribing to topic:", error);
            res.json({ "Message": "Error subscribing to topic." });
        })
});

app.post('/sendToTopic', function(req, res) {
    const topic = req.body.topic;
    const type = req.body.type;
    let notificationPayload;

    if (type === 'notification') {
        notificationPayload = {
            "notification": notification
        };
    } else if (type === 'data') {
        notificationPayload = {
            "data": data
        };
    } else {
        notificationPayload = {
            "notification": notification,
            "data": data
        };
    }

    var notificationOptions = {
        priority: "high"
    };

    admin.messaging().sendToTopic(topic, notificationPayload, notificationOptions)
        .then(function(response) {
            console.log("Successfully sent notification to a topic:", response);
            res.json({ "Message": "Successfully sent notification to a topic." });
        })
        .catch(function(error) {
            console.log("Error in sending notification to a topic:", error);
            res.json({ "Message": "Error in sending notification to a topic." });
        })
});

app.post('/unsubscribeFromTopic', function(req, res) {
    const topic = req.body.topic;
    const token = req.body.token;

    admin.messaging().unsubscribeFromTopic(token, topic)
        .then(function(response) {
            console.log("Successfully subscribed to topic:", response);
            res.json({ "Message": "Successfully subscribed to topic." });
        })
        .catch(function(error) {
            console.log("Error subscribing to topic:", error);
            res.json({ "Message": "Error subscribing to topic." });
        })
});



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

const notification = {
    title: "A Push Notification Test",
    body: "Test Body"
};
const data = {
    key1: "value1",
    key2: "value2"
};

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