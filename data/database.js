const { MongoClient } = require("mongodb");

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

console.log("Trying to connect to db");

async function run() {
  try {
    await client.db();
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connect to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
