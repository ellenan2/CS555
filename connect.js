const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
"mongodb+srv://kshagalov:mYlAHItPAcIwFZHe@cluster0.cthnyf4.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // database and collection code goes here
    const db = client.db("userData");
    const coll = db.collection("credentials");

    // insert code goes here
    const docs = [
      {username: "username", password: "password"},
      {username: "username2", password: "password2"},
      {username: "username3", password: "password3"}
    ];

    const result = await coll.insertMany(docs);

    // display the results of your operation
    console.log(result.insertedIds);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




