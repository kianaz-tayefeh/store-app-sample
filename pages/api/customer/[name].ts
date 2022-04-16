import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import ICustomer from "../../../interfaces/iCustomer";

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const {
      query: { name },
    } = req;

    const query = { name: name };
    const connection = await MongoClient.connect(
      "mongodb+srv://Kianaz:SONyumoOkiykTfXn@cluster0.tvwt2.mongodb.net/Customer?retryWrites=true&w=majority"
    );
    const db = connection.db();
    const collection = db.collection("Customer");
    const result = await collection.find(query).toArray();
    // res.status(200).json({ message: "Customer inserted!" });
    res.end(JSON.stringify(result));

    connection.close();
  } catch (error) {
    throw new Error("Connection Fail");
  }
}

export default handler;
