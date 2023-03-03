import { Button, ShowList, Typography } from "@/components";
import { prisma } from "@/prisma";
import { generTitleMapper } from "@/views/Books/model";
import { createId } from "@paralleldrive/cuid2";
import { Book, Note } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  book: Book;
  newNoteId: string;
  notes: Note[]
}

const BookPage = ({ book, newNoteId, notes }: Props) => {
  console.log(notes);
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
        <ul className="flex flex-col gap-y-3 py-5">
          <ShowList list={notes}>
            {
              note => {
                return (
                  <li key={note.id}>
                    <Link key={note.id} href={`/books/notes/${encodeURIComponent(book.id)}/${note.id}`}>
                     {note.title}
                    </Link>
                  </li>
                );
              }
            }
          </ShowList>
        </ul>
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
  const notes = await prisma.note.findMany({
    where: {
      bookId
    }
  });

  return {
    props: {
      book,
      newNoteId: createId(),
      notes
    },
  };
};

export default BookPage;
