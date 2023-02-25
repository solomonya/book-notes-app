import { Button, Typography } from "@/components";
import { prisma } from "@/server/prismaClient";
import { Editor } from "@/views/Editor";
import { Book } from "@prisma/client";
import { GetServerSideProps } from "next";

interface Props {
  book: Book;
}

const NotePage = ({ book }: Props) => {
  return (
    <article className="p-7">
      <section className="mx-auto flex flex-col items-center gap-y-5 lg:w-[70%]">
        <header className="flex w-full items-center justify-between">
          <Typography as="h4">{book.title}</Typography>
          <Button label="Сохранить" />
        </header>
        <div className="w-full grow border border-slate-200 py-3 lg:rounded-md lg:py-5">
          <Editor />
        </div>
      </section>
    </article>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookId, noteId } = context.params as { bookId: string; noteId: string };

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
