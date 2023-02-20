import { Button, Typography } from "@/components";
import { prisma } from "@/server/prismaClient";
import { generTitleMapper } from "@/views/Books/model";
import { Book } from "@prisma/client";
import { GetServerSideProps } from "next";

interface Props {
  book: Book;
}


const BookPage = ({ book }: Props) => {
  return (
    <main className="flex flex-col gap-y-5 p-5">
      <div className="flex justify-between">
        <Typography as="h4">{book.title}</Typography>
        <div>
          <Typography as="body">{generTitleMapper[book.genre]}</Typography>
          <Typography as="body">{book.status}</Typography>
        </div>
      </div>
      <Typography as="body">{book.description}</Typography>
      <section>
        <div className="flex items-center justify-between">
          <Typography as="h4">Заметки</Typography>
          <Button label="Добавить заметку" />
        </div>
      </section>
    </main>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });


  return {
    props: {
      book
    },
  };
};

export default BookPage;