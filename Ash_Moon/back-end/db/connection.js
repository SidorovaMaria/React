import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbProducts;
let dbUsers;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    dbProducts = client.db("Products");
    dbUsers = client.db("Users");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw new Error("MongoDB connection failed");
  }
}
connectToMongoDB();
export { dbProducts, dbUsers };
