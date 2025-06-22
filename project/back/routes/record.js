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
  const st = parseInt(req.query.start);
  const lim = parseInt(req.query.limit);

  let collection = await db.collection("blogs");
  const count = await collection.countDocuments();
  const results = await collection
    .find(
      st && lim ? { id: { $gte: count - lim - st, $lte: count - st - 1 } } : {}
    )
    .sort({id: -1})
    .toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("blogs");
  let query = { id: new Int32(req.params.id) };
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.get("/like/:id", async (req, res) => {
  let collection = await db.collection("blogs");
  let query = { id: new Int32(req.params.id) };
  let required = await collection.findOne(query);

  let newLikes = required.likes + 1;

  const updates = {
    $set: {
      likes: newLikes,
    },
  };

  let result = await collection.updateOne(query, updates);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


router.get("/dislike/:id", async (req, res) => {
  let collection = await db.collection("blogs");
  let query = { id: new Int32(req.params.id) };
  let required = await collection.findOne(query);

  let newLikes = required.likes - 1;

  const updates = {
    $set: {
      likes: (newLikes > 0) ? newLikes : 0,
    },
  };

  let result = await collection.updateOne(query, updates);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let collection = await db.collection("blogs");
    let count = parseInt((await collection.find({}).sort({id:-1}).limit(1).toArray())[0].id);
    let newDocument = {
      title: req.body.title,
      about: req.body.about,
      likes: 0,
      id: count +1,
      image: req.body.image,
      creator: req.body.creator,
    };

    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
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

    let collection = await db.collection("blogs");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
}); */

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    let query = { id: new Int32(req.params.id) };

    const collection = db.collection("blogs");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
