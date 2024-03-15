const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
require('dotenv').config();


// MongoClient allows Express to send requests to Mongo databases
const MongoClient = mongodb.MongoClient;

// assign MongoDB.objectID to a variable for later use
const ObjectId = mongodb.ObjectId;

// create the express application
const app = express();

// enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// set JSON of means of receiving requests and responses
app.use(express.json());

// function to connect to the database
async function connect (uri, dbname){
    // `connect` allows us to connect to MongoDb
    // setting `useUnifiedTopology` to `true` enables use to use the latest structure for Mongo
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology : true});
    let db = client.db(dbname);
    console.log("DB connected.")
    return db;
}

async function main() {
    const uri = process.env.MONGO_URI;
    // define database to connect to
    const db = await connect(uri, "imaginary_food_sightings");

    // after connecting to the database, create the routes
    app.get("/food-sightings", async function(req,res){
        try {
            // critieria
            const criteria = {};
            // check for `description` parameter in query
            // if there is, perform case insensitive search based on `description` input
            if (req.query.description) {
                criteria.description = {
                    '$regex': req.query.description,
                    '$options': 'i' // `i` is for ignore case, making the query case-insensitive
                }
            }

            if (req.query.food) {
                criteria.food = {
                    '$in':[req.query.food]
                }
            }

            // get the first 10 results from the `sightings` collection and convert them into an array
            // note that the argument in `.find({})` is empty - this means there is no criteria specified
            const results = await db.collection("sightings").find(criteria).limit(10).toArray();

            // return the response in json format
            res.json({
                'sightings':results
            })
        } catch (e) {
            res.status(500);
            res.json({
                'Error':e
            })
    }
    })

    app.post("/food-sightings", async function(req, res){
        // insert `try-catch` for exception handling
        // `try` will go through each line, if there is an error, it will jump to `catch`
        try{
            const description = req.body.description;
            const food = req.body.food;
            // "if `datetime` then make it a datetime object otherwise make it today's date"
            const datetime = req.body.datetime ? new Date(req.body.datetime) : new Date(); 
            
            // Include validation mechanism for `description` and `food` inputs.
            // if no `description` is entered, an error message will appear
            if (!description) {
                res.status(400);
                res.json({
                    "Error":"A description must be provided."
                });
                return; // add `return` to end the function once error is detected
            }

            // if no `food` is entered, or it is not an array, an error message will appear
            if (!food || !Array.isArray(food)) {
                res.status(400);
                res.json({
                    "Error":"Food name must be inputted."
                });
                return;
            }

            // use `insertOne` to add new entry
            const result = await db.collection('sightings').insertOne({
                'description':description,
                'food':food,
                'datetime':datetime
            });
            
            // retrieve `result` after update has been made
            res.json({
                'result':result
            })
        } catch (e) {
            // `e` refers to the error message
            res.status(500) // `500` refers to internal server error
            res.json({
                'Error':e
            })
        }
        
    })

    app.put('/food-sightings/:id', async function(req,res){
        try{
            const description = req.body.description;
            const food = req.body.food;
            const datetime = req.body.datetime ? new Date(req.body.datetime) : new Date(); 

            // Validation mechanism for `description` and `food` inputs.
            // error message appears if there is no description, or no food, or food isn't in an array
            if (!description || !food || !Array.isArray(food)){
                res.status(400);
                res.json({
                    "error":"Please enter inputs correctly."
                })
            }

            // use `updateOne` to update entry
            const result = await db.collection('sightings').updateOne({
                '_id': new ObjectId(req.params.id)
            },{
                '$set': {
                    'description':description,
                    'food':food,
                    'datetime':datetime
                }
            })

            // retrieve `result` after update has been made
            res.json({
                'result':result
            })
        } catch (e) {
            res.status(500)
            res.json({
                'Error':e
            })
        }
    })

    app.delete('/food-sightings/:id', async function(req,res){
        try {
            await db.collection('sightings').deleteOne({
                '_id': new ObjectId(req.params.id)
            });
            res.json({
                'Message':"Sighting deleted."
            })
        } catch (e) {
            res.status(500)
            res.json({
                'Error':e
            })
        }
    })
}
main();

app.listen(3033, function(){
    console.log("Server has started.")
})