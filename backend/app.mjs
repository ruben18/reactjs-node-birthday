import express from "express";
import cors from "cors";
import "./loadEnv.mjs";


import mongoose from 'mongoose';
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  mongoose.set('strictQuery', true);
  
  await mongoose.connect(process.env.DB_URL || "");
}

const countrySchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const Country = mongoose.model('Countries', countrySchema);

mongoose.set('strictQuery', false);

const app = express()

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
  Country.find({}, null, null, function (a, countries) {
    var transformedCountries = countries.map(function (country) {
      return country.toJSON();
    });
    return res.send(transformedCountries).status(200);
  });
});

app.post('/countries', isAuth, async (req, res) => {
  try {
    const { name } = req.body;

    const country = new Country({
      name
    });

    await country.save();
    return responseMsg(res, false, "Country successfully created.");
  } catch (error) {
    return responseMsg(res, true, error, 500);
  }
});

app.put('/countries/:id', isAuth, async (req, res) => {
  const filter = { _id: req.params.id };
  const update = { name: req.body.name };

  try {
    const count = await Country.countDocuments({ _id: req.params.id });
    if (count == 0)
      return responseMsg(res, true, "Record not found.", 404);

    await Country.findOneAndUpdate(filter, update);

    return responseMsg(res, false, "Country successfully updated.");
  } catch (error) {
    return responseMsg(res, true, error, 500);
  }
});

app.delete('/countries/:id', isAuth, async (req, res) => {
  try {
    const count = await Country.countDocuments({ _id: req.params.id });
    if (count == 0)
      return responseMsg(res, true, "Record not found.", 404);

    await Country.deleteOne({ _id: req.params.id });

    return responseMsg(res, false, "Country successfully deleted.");
  } catch (error) {
    return responseMsg(res, true, error, 500);
  }
});

export default  app;






