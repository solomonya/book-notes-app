import { noteCreateModel } from "@/models/note";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const incomeData = JSON.parse(req.body);
    const note = await noteCreateModel.validate(incomeData);
    
    const user = await prisma.user.findUnique({
      where: {
        email: note.userEmail
      }
    });

    const existingNote = await prisma.note.findFirst({
      where: {
        id: note.noteId
      }
    });

    const inputNote = {
          id: note.noteId,
          content: note.content,
          title: note.title,
          book: { connect: { id: note.bookId } },
          user: { connect: { id: user?.id } }
    };

    if (existingNote) {
      const updatedNote = await prisma.note.update({
        where: {
          id: note.noteId
        },
        data: inputNote
      });
      res.status(200).json(updatedNote);
    }
 
    const createdNote = await prisma.note.create({ data: inputNote });
    res.status(200).json(createdNote);
  } catch (e) {
    res.status(400).json({ message: "validation error" });
  }
}
