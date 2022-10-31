const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
const app = express();
const port = process.env.PORT || 15000;

// ** Use middleware

app.use(cors());
app.use(express.json());

// ** basic route
app.get("/", (req, res) => res.send("Node mongo server is running"));

// ** mongo db connect

// ** username : dbuser
// ** password : nGSB35pVosjHP6hQ

const uri =
  "mongodb+srv://dbuser:nGSB35pVosjHP6hQ@cluster0.7ikallh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// ** connection

const run = async () => {
  try {
    const usersCollection = client.db("nodeMongoCurd").collection("users");

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const users = req.body;
      const result = await usersCollection.insertOne(users);
      console.log(result);
      res.send(result);
    });

    // ** je data delete korbo oita k id diye dhorte hobe

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };

      const result = await usersCollection.deleteOne(query);

      console.log(result);
      res.send(result);
    });

    // ** je data update korbo oi single data k usersCollection.findOne() diye niye eshe send kore dite hobe

    app.get("/update/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.findOne(query);

      res.send(result);
    });

    // ** app.put

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;

      const user = req.body;

      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
          address: user.address,
        },
      };

      const result = await usersCollection.updateOne(
        filter,
        updatedUser,
        option
      );
      console.log(result);
      res.send(result);
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

// ** app listen

app.listen(port, () =>
  console.log(`Node mongo curd server is running at port:${port}`)
);
