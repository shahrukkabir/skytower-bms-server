const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb + srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wi4y4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
},
});

async function run() {
try {
  await client.connect();
  console.log("✅ Connected to MongoDB!");

  const collection = client.db("yourDatabaseName").collection("yourCollectionName");
  
  app.get("/data", async (req, res) => {
    const result = await collection.find().toArray();
    res.send(result);
  });

}
catch (error) {
  console.error("❌ MongoDB connection error:", error);
}
}

//run
run().catch(console.dir);

app.get("/", (req, res) => {
res.send("Server is up and running!");
});

app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});
