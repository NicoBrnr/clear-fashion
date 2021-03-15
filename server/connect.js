/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:eedzab@webapp.0ouc1.mongodb.net/clearfashion_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

// Connect to the cluster

/*
var MongoClient = require('mongodb').MongoClient;

function connect(){
  
  var uri = "mongodb+srv://admin:eedzab@Cluster0.0ouc1.mongodb.net/clearfashion_db?retryWrites=true&w=majority";

  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    console.log("Database created correctly !");

});
}
*/


const {MongoClient} = require('mongodb');
//require('dotenv').config();

let client = null;
let db = null;

const connect = async ()=>{
    if(!db){
        const MONGODB_URI = `mongodb+srv://admin:eedzab@Cluster0.0ouc1.mongodb.net/clearfashion_db?retryWrites=true&w=majority`;
        client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true, 'useUnifiedTopology': true});
        db = client.db("clearfashion")
        console.log('Connected');
    }
}

//connect();


// Import the data

//var scrapper = require('./sandbox.js');
//var products = scrapper.start();


//console.log(products);


// Insert the data

const insert = async (products)=>{
  
  await connect();

  const collection = db.collection('products');
  const result = collection.insertMany(products);

  console.log(result);
}

var products = require('./sources/dedicated.json')

//insert(products);

const close = () => client.close()


const getbrandProduct = async (brand)=>{
  await connect();
  const collection = db.collection('products');
  const res = await collection.find({brands:brand}).toArray();;

  console.log(res);

  return res
}

getbrandProduct('dedicatedbrand');