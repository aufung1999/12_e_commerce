import { getSession } from "next-auth/react";
import Order from "@/models/Order";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  console.log(req.body);
  console.log("here");
  const session = await getToken({ req });

  if (!session) {
    console.log("here:" + session);

    return res.status(401).send("signin required");
  }
  console.log(session);
  // const { user } = session;
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: session._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;
