import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { noteSchema } from "./model";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const incomeData = JSON.parse(req.body);
    const parsedIncomeData = noteSchema.validate(incomeData);
    const note = await parsedIncomeData;

    const createdNote = await prisma.note.create({
      data: note,
    });

    res.status(200).json(createdNote);
  } catch (e) {
    res.status(400).json({ message: "validation error" });
  }
}
