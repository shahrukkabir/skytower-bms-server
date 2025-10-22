const express = require("express");
const cors = require("cors");
const jwt = require('jsonwebtoken');
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
    const users_collection = client.db("Lux-tower").collection("users");
    const payment_collection = client.db("Lux-tower").collection("payment");
    const coupons_collection = client.db("Lux-tower").collection("coupons");
    const contact_collection = client.db("Lux-tower").collection("contact_message");
    const agreements_collection = client.db("Lux-tower").collection("agreements");
    const appartmants_collection = client.db("Lux-tower").collection("appartments");
    const announcements_collection = client.db("Lux-tower").collection("announcements");

    // Generates a JWT token for the user, called during login or authentication from AuthProvider->onAuthStateChanged
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send({ token });
    })

    // Middleware to verify JWT token and authenticate the user
    const verifyToken = (req, res, next) => {
      // console.log('Inside Verify Token', req.headers);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Unauthorized access' });
        }
        req.decoded = decoded;
        next();
      });
    };

    // Middleware to verify if the user is an admin after token verification
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await users_collection.findOne(query);
      const isAdmin = user?.position === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      next();
    }

   

    //---------------------------Payments Related APIs  -------------------------------
    app.get("/payments", async (req, res) => {
      const result = await payment_collection.find().toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payments = req.body;
      const result = await payment_collection.insertOne(payments);
      res.send(result);
    });

    app.post("/createPaymentIntent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    //---------------------------Appartments Related APIs -------------------------------
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

    //---------------------------Contact Related APIs -------------------------------
    app.get("/contact_message", async (req, res) => {
      const result = await contact_collection.find().toArray();
      res.send(result);
    });

    app.post("/contact_message", async (req, res) => {
      const announcements = req.body;
      const result = await contact_collection.insertOne(announcements);
      res.send(result);
    });

    app.delete("/contact_message/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await contact_collection.deleteOne(query);
      res.send(result);
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

    //---------------------------Announcements Related APIs-------------------------------
    app.get("/announcements", async (req, res) => {
      const result = await announcements_collection.find().toArray();
      res.send(result);
    });

    app.post("/announcements", async (req, res) => {
      const announcements = req.body;
      const result = await announcements_collection.insertOne(announcements);
      res.send(result);
    });

    app.delete("/announcements/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await announcements_collection.deleteOne(query);
      res.send(result);
    });

    //---------------------------Coupons Related APIs -------------------------------
    app.get("/coupons", async (req, res) => {
      const result = await coupons_collection.find().toArray();
      res.send(result);
    });

    app.post("/coupons", async (req, res) => {
      const coupons = req.body;
      const result = await coupons_collection.insertOne(coupons);
      res.send(result);
    });

    app.delete("/coupons/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coupons_collection.deleteOne(query);
      res.send(result);
    });

    app.put("/coupons/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const coupon = req.body;

      const updatedservices = {
        $set: {
          offerDigit: coupon.offerDigit,
          offerType: coupon.offerType,
          code: coupon.code,
          description: coupon.description,
        },
      };

      const result = await coupons_collection.updateOne(query, updatedservices);
      res.send(result);
    });

    ///-------------------User Related APIs -----------------------------------------------
    app.get("/users", verifyToken, verifyAdmin,  async (req, res) => {
      const result = await users_collection.find().toArray();
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updateData = { $set: { position: req.body.position } };
      const result = await users_collection.updateOne(query, updateData);
      res.send(result);
    });

    app.patch("/usermanage/:email", async (req, res) => {
      const query = { email: req.params.email };
      const position = req.body;
      const updateData = {
        $set: {
          position: position.position,
        },
      };
      const result = await users_collection.updateOne(query, updateData);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await users_collection.insertOne(user);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await users_collection.deleteOne(query);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } finally {
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