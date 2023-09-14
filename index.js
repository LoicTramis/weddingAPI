import express from "express";
import { readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
    const data = readFileSync("./data/guests.json");
    const guests = JSON.parse(data);
    res.send(guests);
});

app.post("/", (req, res) => {
    const key = req.headers.key;
    console.log(req.headers.key);
    console.log(process.env.KEY);
    const data = req.body;
    const guests = JSON.stringify(data);
    if (key === process.env.KEY) {
        writeFileSync("./data/guests.json", guests);
        res.send("Sucess");
    } else {
        res.status(405).send("Unauthorized request");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
