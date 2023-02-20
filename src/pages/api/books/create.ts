import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prismaClient";



export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const incomeBook = JSON.parse(req.body);
    const createdBook = await prisma.book.create({
      data: incomeBook,
    });
    res.status(200).json(createdBook);
  } catch (e) {
    res.status(400).json({message: 'validation error'});
  }
}
