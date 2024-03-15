const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb")
require('dotenv').config()

const MongoClient = mongodb.MongoClient;

// initiate the Express application
const app = express();

// enable cors
app.use(cors());

// set the means to receive requests and sending responses
app.use(express.json());

async function connect(uri, dbname) {
    // `connect` allows us to connect to MongoDB
    // useUnifiedTopology means we want to use the latest structure for mongo
    const client = await MongoClient.connect(uri,{
        useUnifiedTopology: true
    });
    let db = client.db(dbname);
    return db;
}

async function main() {
    // set the uri
    const uri = process.env.MONGO_URI
    // get the database using the `connect` function
    const db = await connect(uri, "sctp02_food_sightings");

    // create the routes after connecting to the database
    app.get("/food-sightings", async function(req,res){
        // try-catch is for exception handling
        try {
            // get all the sightings
            const results = await db.collection("sightings").find({}).toArray();

            res.json({
                'sightings': results
        })
    } catch (e) {
        res.status(500);
        res.send({
          error: "Internal server error. Please contact administrator."
        });
    }
    });

    app.post("/food-sightings", async function(req, res){
        try {
            const description = req.body.description;
            const food = req.body.food;
            const datetime = new Date(req.body.datetime || new Date());
            const results = await db.collection("sightings").insertOne({
                'description':description,
                'food':food,
                'datetime':datetime
            });
            res.json({
                'sightings': results
            })

        } catch (e) {
            res.status(500);
            res.send({
              error: "Internal server error. Please contact administrator."
            });
        }
    })
}

main();

app.listen(7010, function(){
    console.log("Server has started.")
})

// const express = require('express');
// const cors = require('cors');
// const mongodb = require('mongodb');
// require('dotenv').config();

// // A Mongo client allows Express (or any
// // NodeJS application) to send request
// // to a Mongo database
// const MongoClient = mongodb.MongoClient;

// // create the express application
// const app = express();

// // enable cors
// app.use(cors());

// // set JSON as the means of
// // receiving requests and sending responses
// app.use(express.json());

// // function to connect to the database
// async function connect(uri, dbname) {

//     // `connect` allows us to connect to the mongodb
//     // useUnifiedTopology means we want use the latest
//     // structure for Mongo
//     const client = await MongoClient.connect(uri, {
//         useUnifiedTopology: true
//     });
//     let db = client.db(dbname);
//     return db;
// }

// async function main() {
//     // connection string is now from the .env file
//     const uri = process.env.MONGO_URI;
//     // get the database using the `connect` function
//     const db = await connect(uri, "sctp02_food_sightings");

//     // create the routes after connecting to the database
//     app.get("/food-sightings", async function (req, res) {
//         try {
//             // get all the sightings
//             const results = await db.collection("sightings").find({}).toArray();

//             res.json({
//                 'sightings': results
//             })
//         } catch (e) {
//             res.status(500);
//             res.json({
//                 'error': e
//             })
//         }

//     });

//     // Sample Food Sighting document"
//     // {
//     //   _id: ObjectId(),
//     //  description:"Chinese Buffet at LT2",
//     //  food:["fried rice", "chicken wings"],
//     //  datetime:2024-08-03
//     // }
//     app.post("/food-sighting", async function (req, res) {
//         console.log("POST food-sighting")
//         // try...catch is for exception handling
//         // an execption is an unexpected error usually from a third party
//         // (in this case, the third party is Mongo Atlas)
//         try {
//             const description = req.body.description;
//             const food = req.body.food;
//             const datetime = new Date(req.body.datetime) || new Date();
//             const result = await db.collection("sightings").insertOne({
//                 'description': description,
//                 'food': food,
//                 'datetime': datetime
//             });
//             res.json({
//                 'result': result
//             })
//         } catch (e) {
//             // e will contain the error message
//             res.status(500); // internal server error
//             res.json({
//                 'error': e
//             })
//         }

//     })
// }

// main();

// app.listen(8000, function () {
//     console.log("Server has started");
// });