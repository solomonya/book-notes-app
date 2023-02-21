import { Typography } from "@/components";
import { prisma } from "@/server/prismaClient";
import { Editor } from "@/views/Editor";
import { Book } from "@prisma/client";
import { GetServerSideProps } from "next";

interface Props {
  book: Book
}

const NotePage = ({ book }: Props) => {
  return (
    <main className="p-5 flex flex-col gap-y-5">
      <Typography as="h4">{book.title}</Typography>
      <Typography as="h4">Note page</Typography>

      <Editor />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookId, noteId } = context.params as { bookId: string, noteId: string };

  console.log(noteId);

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  return {
    props: {
      book,
    },
  };
};

export default NotePage;