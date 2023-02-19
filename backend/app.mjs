import db from "./db/conn.mjs";

import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";

const app = express()
const port = 3001

app.use(express.json());
app.use(cors());

function isAuth(request, response, next) {
  const auth = request.headers.authorization;
  if (auth == 'pwbirthdayapi') {
    next();
  } else {
    return responseMsg(response, true, "Not authorized.", 401);
  }
}

function responseMsg(res, error = false, msg = "", code = 200) {
  let resMsg = { error: error, msg: msg };
  return res.status(code).send(resMsg);
}

app.get('/countries', async (req, res) => {
  let collection = await db.collection("countries");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

app.post('/countries', isAuth, async (req, res) => {
  let collection = await db.collection("countries");

  let body = req.body;

  if (body.name == "" || body.name == undefined) {
    return responseMsg(res, true, "The field name is required.", 400);
  } else {
    let newCountry = body;

    let result = await collection.insertOne(newCountry);

    if (result.acknowledged == true) {
      return responseMsg(res, false, "Country successfully created.");
    } else {
      return responseMsg(res, true, result, 500);
    }
  }
});

app.put('/countries/:id', isAuth, async (req, res) => {
  let collection = await db.collection("countries");

  if (req.params.id == "" || req.params.id == undefined) {
    return responseMsg(res, true, "Record not found.", 404);
  }
  let query = "";
  
  try{
    query = { _id: new ObjectId(req.params.id.toString()) };
  }catch(ex){
    return responseMsg(res, true, "ObjecId not valid.", 400);
  }

  let country = await collection.findOne(query);

  if (country == undefined || country == null) {
    return responseMsg(res, true, "Record not found.", 404);
  }

  let body = req.body;

  if (body.name == "" || body.name == undefined) {
    return responseMsg(res, true, "The field name is required.", 400);
  }
  const updates = {
    $set: { name: body.name }
  };

  let result = await collection.updateOne(query, updates);

  if (result.acknowledged == true) {
    return responseMsg(res, false, "Country successfully updated.");
  } else {
    return responseMsg(res, true, result, 500);
  }
});

app.delete('/countries/:id', isAuth, async (req, res) => {
  let collection = await db.collection("countries");

  if (req.params.id == "" || req.params.id == undefined) {
    return responseMsg(res, true, "Record not found.", 404);
  }

  let query = "";
  try{
    query = { _id: new ObjectId(req.params.id.toString()) };
  }catch(ex){
    return responseMsg(res, true, "ObjecId not valid.", 400);
  }

  let country = await collection.findOne(query);

  if (country == undefined || country == null) {
    return responseMsg(res, true, "Record not found.", 404);
  }

  let result = await collection.deleteOne(query);

  if (result.acknowledged == true) {
    return responseMsg(res, false, "Country successfully deleted.");
  } else {
    return responseMsg(res, true, result,500);
  }
});

app.listen(port, () => {
  console.log(`Birthday backend API app listening on port ${port}`)
});