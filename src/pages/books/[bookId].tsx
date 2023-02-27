import { Button, Typography } from "@/components";
import { prisma } from "@/prisma";
import { generTitleMapper } from "@/views/Books/model";
import { createId } from "@paralleldrive/cuid2";
import { Book } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  book: Book;
  newNoteId: string;
}

const BookPage = ({ book, newNoteId }: Props) => {
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
          <Link href={`/books/notes/${encodeURIComponent(book.id)}/${newNoteId}`}>
            <Button label="Добавить заметку" variant="link" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookId } = context.params as { bookId: string };
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  return {
    props: {
      book,
      newNoteId: createId(),
    },
  };
};

export default BookPage;
