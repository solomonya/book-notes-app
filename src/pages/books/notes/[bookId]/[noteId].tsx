import { Button, EditableText, EditableTextMethods, Typography } from "@/components";
import { prisma } from "@/prisma";
import { Editor, EditorMethods } from "@/views/Editor";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Book, Note } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRef } from "react";

type QueryParams = {
  bookId: string;
  noteId: string;
};
interface Props {
  book: Book;
  note: Note | null;
  ids: QueryParams;
}

const NotePage = ({ book, note, ids }: Props) => {
  const editorRef = useRef<EditorMethods>();
  const titleRef = useRef<EditableTextMethods>();
  const { user } = useUser();

  const onSave = async () => {
    console.log({
      id: ids.noteId,
      noteContent: editorRef.current?.getContent(),
      title: titleRef.current?.getContent(),
      bookId: ids.bookId,
      userId: user?.sid ?? "",
    });
  };

  return (
    <article className="p-3 lg:p-7">
      <section className="mx-auto flex flex-col items-center gap-y-5 lg:w-[70%]">
        <header className="flex w-full flex-col gap-y-5">
          <div className="flex w-full items-center justify-between">
            <Typography as="h4">{book.title}</Typography>
            <Button label="Сохранить" onClick={onSave} />
          </div>
          <EditableText ref={titleRef} defaultText={note?.title} />
        </header>
        <div className="h-screen w-full border border-slate-200 px-3 py-3 lg:rounded-md lg:py-5">
          <Editor initialContent={note?.content} ref={editorRef} />
        </div>
      </section>
    </article>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ids = context.params as QueryParams;

  const book = await prisma.book.findUnique({
    where: {
      id: ids.bookId,
    },
  });

  const note = await prisma?.note.findUnique({
    where: {
      id: ids.noteId,
    },
  });

  return {
    props: {
      book,
      note,
      ids,
    },
  };
};

export default NotePage;
