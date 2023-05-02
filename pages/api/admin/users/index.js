import { getSession } from "next-auth/react";
import User from "@/models/User";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const session = await getToken({ req });
  if (!session || !session.isAdmin) {
    return res.status(401).send("admin signin required");
  }
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
};

export default handler;
