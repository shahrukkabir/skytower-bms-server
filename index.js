const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const port = process.env.PORT || 5000;

//middleware =======
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wi4y4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const appartmants_collection = client.db("Lux-tower").collection("appartments");

    //--------------------------- Apartment Related APIs -------------------------------
    app.get("/appartmants", async (req, res) => {
      const result = await appartmants_collection.find().toArray();
      res.send(result);
    });

    app.get("/appartmantsPasition", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);
      const result = await appartmants_collection
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    app.get("/appartmentlength", async (req, res) => {
      const result = await appartmants_collection.find().toArray();
      res.send({ count: result.length });
    });

    //---------------------------Agreements Related APIs -------------------------------
    app.get("/agreements", async (req, res) => {
      const result = await agreements_collection.find().toArray();
      res.send(result);
    });

    app.post("/agreements", async (req, res) => {
      const agreements = req.body;
      const result = await agreements_collection.insertOne(agreements);
      res.send(result);
    });

    app.patch("/agreements/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const Status = req.body;
      const updateData = {
        $set: {
          Status: Status.Status,
        },
      };
      const result = await agreements_collection.updateOne(query, updateData);
      res.send(result);
    });

    app.delete("/agreements/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await agreements_collection.deleteOne(query);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  }
  finally {
  }
}
run().catch(console.dir);

//default route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

//listing port
app.listen(port, () => {
  console.log(`server port is ${port}`);
});