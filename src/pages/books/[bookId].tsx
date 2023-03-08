import { Typography } from "@/components";
import { NavLink } from "@/components/ui";
import { prisma } from "@/prisma";
import { BooksNotesLinks } from "@/views/Books";
import { generTitleMapper } from "@/views/Books/model";
import { GenreBadge } from "@/views/GenreBadge";
import { StatusBadge } from "@/views/StatusBadge";
import { createId } from "@paralleldrive/cuid2";
import { Book, Note } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";

import ArrowLeft from '@/assets/icons/left-arrow.svg';
import Image from "next/image";
import { ShowSwitch } from "@/components/other";

interface Props {
  book: Book;
  newNoteId: string;
  notes: Note[]
}

const BookPage = ({ book, newNoteId, notes }: Props) => {
  return (
    <main className="flex flex-col gap-y-5 p-5">
      <div className="flex flex-col gap-5 lg:flex-row justify-between">
        <Link href={'/'} className="flex items-center gap-x-3">
          <Image src={ArrowLeft} alt={"Arrow icon"} width={25} height={20} />
          <Typography as="h4">{book.title}</Typography>
        </Link>
        <div className="flex gap-x-3">
          <GenreBadge title={generTitleMapper[book.genre]} />
          <StatusBadge status={book.status} />
        </div>
      </div>
      <Typography as="body">{book.description}</Typography>
      <section className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between">
          <Typography as="h4">Заметки</Typography>
          <NavLink 
            to={`/books/notes/${encodeURIComponent(book.id)}/${newNoteId}`} 
            title="Новая заметка"
          />
        </div>
        <ShowSwitch conditions={[notes.length > 0]}>
          <BooksNotesLinks bookId={book.id} notes={notes} />
          <Typography as="h4">Список заметок пуст</Typography>
        </ShowSwitch>
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
    },
    orderBy: {
      createdAt: 'desc'
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
