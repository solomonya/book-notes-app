import { addBookSchema } from './model';
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/prismaClient";



export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const incomeData = JSON.parse(req.body);
    const parsedIncomeData = addBookSchema.validate(incomeData);

    const createdBook = await prisma.book.create({
      data: (await parsedIncomeData).book as any,
    });

    await prisma.booksOnUser.create({
      data: {
        bookId: createdBook.id,
        userId: (await parsedIncomeData).user.id
      }
    })

    res.status(200).json(createdBook);
  } catch (e) {
    res.status(400).json({message: 'validation error'});
  }
}
