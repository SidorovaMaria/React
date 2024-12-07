import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "";

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    // Establish a connection
    await client.connect();

    // Ping the server to verify the connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Return the db objects for use
    const dbProducts = client.db("Products");
    const dbUsers = client.db("Users");

    return { dbProducts, dbUsers };
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw new Error("MongoDB connection failed");
  }
}
export { connectToMongoDB };
