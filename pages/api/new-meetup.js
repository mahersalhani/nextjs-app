// /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { image, title, address, description } = data;

    const client = await MongoClient.connect("mongodb+srv://maher:DFwgblIB41puhFz5@cluster0.y0spnm6.mongodb.net/meetup?retryWrites=true&w=majority");

    const db = client.db();

    const meetupsCollection = db.collection("meetup");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}

export default handler;
