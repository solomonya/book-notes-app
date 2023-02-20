import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prismaClient";

type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const books = await prisma.book.findMany();
    console.log(req.body);
    res.status(200).json({ message: "Books" });
  } catch (e) {
    console.log(e);
  }
}
