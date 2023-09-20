import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const run = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

const get = async () => {
    await client.connect();
    const weddingDB = client.db("WeddingDB");
    const weddingColl = weddingDB.collection("WeddingGuests");
    const guestColl = await weddingColl.find();
    const guests = [];
    for await (const doc of guestColl) {
        guests.push(doc);
    }
    return guests;
};

const add = async (guests) => {
    try {
        await client.connect();
        const weddingDB = client.db("WeddingDB");
        const weddingColl = weddingDB.collection("WeddingGuests");
        const deleteResult = await weddingColl.deleteMany();
        console.log(`Documents deleted: ${deleteResult.deletedCount}`);
        const insertResult = await weddingColl.insertMany(guests);
        console.log(`Documents inserted: ${insertResult.insertedCount}`);
    } catch (e) {
        console.log(e);
    }
};

export { run, get, add };
