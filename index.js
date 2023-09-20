import express from "express";
import fs, { readFileSync, writeFileSync } from "fs";
import { run, get, add } from "./controller/databaseController.js";
import guests from "./data/guests.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    // TODO: Get all data from MONGO DB
    const data = await get();
    // const guests = JSON.parse(data);
    console.log(data);
    res.send(data);
});

app.post("/", (req, res) => {
    // TODO: Set all data in MONGO DB
    const key = req.headers.key;
    const guests = req.body;
    if (key === process.env.KEY) {
        add(guests);
        res.send("Sucess");
    } else {
        res.status(405).send("Unauthorized request");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    run().catch(console.dir);
    console.log(`Example app listening on port 5000`);
});
