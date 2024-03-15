// 1. INITIATE DEPENDENCIES
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb')

// this allows us to access the key-value pairs in the .env file using `process.env`
require('dotenv').config();

// create the express application
const app = express();

// enable use of JSON
app.use(express.json());

// enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// retrieve `MONGO_URI` and database name from `.env` file; use `process.env.<variable_name>`.
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

async function main (){

    // enables us to send commands to Mongo
    const client = await mongodb.MongoClient.connect(MONGO_URI);
    // initiate new MongoDB database
    const db = client.db(DB_NAME);
    console.log("Connection to Mongo successful.");

    // 2. SET UP ROUTES
    // `R` portion of CRUD: `get`
    app.get('/api', function(req,res){
        res.json({
            "Message":"API is running."
        })
    })

    // restful APIs' URLs typically begin with '/api/' to differentiate them from
    // routes that render hbs (handlebars)
    app.get('/api/expenses', async function(req, res){
        const expenses = await db.collection('expenses').find({}).toArray();
        res.json({
            'expenses':expenses
        })
    })

    // 'C' portion of the CRUD: `post`
    app.post('/api/expenses', async function(req,res){
        // short cut for the block below:
        // const title = req.body.title;
        // const cost = req.body.cost;
        // const tags = req.body.tags;
        // const date = req.body.date;
        const {title, cost, tags, date} = req.body; // object destructuring
        
        // instead of:
        // const newExpense = {
        //     "title" : title,
        //     "cost" : cost,
        //     "tags" : tags,
        //     "date" : date
        // }
        const newExpense = {
            title,
            cost,
            tags,
            "date" : new Date(date) // apply object destructuring again 
        }; 
        
        const result = await db.collection('expenses').insertOne(newExpense);
        // `res.json({"result":result})` can be written as: 
        res.json({result});

    })
    // 'D' portion of the CRUD: `delete`
    app.delete('/api/expenses/:expenseid', async function(req,res) {
        const expenseId = req.params.expenseid;
        const result = await db.collection('expenses').deleteOne({
            '_id':new mongodb.ObjectId(expenseId)
        })
        res.json({result})
    })

    // 'U' portion of the CRUD: `put`
    app.put('/api/expenses/:expenseid', async function(req,res){
        const expenseId = req.params.expenseid;
        const {title, cost, tags, date} = req.body; // object destructuring
        const modifiedExpense = {
            title,
            cost,
            tags,
            "date" : new Date(date)
        };

        // `updateOne` takes in 2 parameters:
        // - object id
        // - attribute to update
        const result = await db.collection('expenses').updateOne({
            "_id": new mongodb.ObjectId(expenseId)
        }, {
            "$set":modifiedExpense
        })
        res.json({result})
    })
}

main();

// 3. ENABLE THE SERVER
app.listen(3020, function(){
    console.log("Server has started.")
})
