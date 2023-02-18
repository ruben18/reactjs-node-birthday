import db from "./db/conn.mjs";

import express from "express";
const app = express()
const port = 3000

app.get('/countries', async (req, res) => {
  let collection = await db.collection("countries");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
})

app.listen(port, () => {
  console.log(`Birthday backend API app listening on port ${port}`)
})