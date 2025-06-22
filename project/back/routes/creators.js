import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { Int32, ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("creators");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:name", async (req, res) => {
  let collection = await db.collection("creators");
  let query = { creator: req.params.name };
  let result = await collection.findOne(query);
  if (!result) res.json({isThere: false});
  else res.json({isThere: true});
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let collection = await db.collection("creators");
    let count = await collection.findOne({ creator: req.body.creator });
    let newDocument = {
      creator: req.body.creator,
      pin: req.body.pin,
      totalLikes: 0,
    };

    if (!count) {
      let result = await collection.insertOne(newDocument);
      res.json({ exist: false });
    } else {
      res.json({ exist: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
/* router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
      },
    };

    let collection = await db.collection("creators");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
}); */

// This section will help you delete a record
router.delete("/:name", async (req, res) => {
  try {
    const collection = db.collection("creators");
    let query = await collection.findOne({ creator: req.params.name });

    if (query !== null) {
      let result = await collection.deleteOne(query);
      res.json({ deleted: 1 }).status(200);
    } else {
      res.json({ deleted: 0 }).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
