import db from "./db/conn.mjs";

import express from "express";

const app = express()
const port = 3000

app.use(express.json());


app.get('/countries', async (req, res) => {
  let collection = await db.collection("countries");
  let results = await collection.find({})
    .limit(50)
    .toArray();

  res.send(results).status(200);
});

app.post('/countries', async (req, res) => {
  let collection = await db.collection("countries");  
  
  let body = req.body;

  if(body.name == "" || body.name==undefined){
    let errorMsg ={ error: true, msg: "The field name is required."};
    res.send(errorMsg).status(400);
  }else{
    let newCountry = body;

    let result = await collection.insertOne(newCountry);
    
    if(result.acknowledged == true){
      let successMsg = { error: false, msg:"Country successfully created."} 
      res.send(successMsg).status(200);
    }else{
      let errorMsg = { error: true, msg: result}
      res.send(errorMsg).status(500);
    }
  }
});


app.listen(port, () => {
  console.log(`Birthday backend API app listening on port ${port}`)
});