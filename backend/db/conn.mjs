import {MongoClient} from 'mongodb';

const connectionString = "mongodb+srv://birthdaybackend:KZ1j0mFju3G5AqXI@cluster0.rcihdre.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("birthday_api");

export default db;