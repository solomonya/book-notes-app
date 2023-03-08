import { useMutation } from "@/api";
import { Button, EditableText, EditableTextMethods, Typography } from "@/components";
import { noteCreateModel } from "@/models/note";
import { prisma } from "@/prisma";
import { Editor, EditorMethods } from "@/views/Editor";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Book, Note } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import ArrowLeft from '@/assets/icons/left-arrow.svg';


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
  const [createNote, { isLoading }] = useMutation();
  
  const onSave = async () => {
    const noteData = {
      noteId: ids.noteId,
      content: editorRef.current?.getContent(),
      title: titleRef.current?.getContent(),
      bookId: ids.bookId,
      userEmail: user?.email,
    };

    try {
      const note = await noteCreateModel.validate(noteData);
      await createNote({ method: 'POST', endpoint: '/notes/create', body: note });
    } 
    catch(e) {
      console.error(e);
    }
  };

  return (
    <article className="p-3 lg:p-7">
      <section className="mx-auto flex flex-col items-center gap-y-5 lg:w-[70%]">
        <header className="flex w-full flex-col gap-y-5">
          <div className="flex flex-col lg:flex-row gap-5 w-full lg:items-center justify-between items-stretch">
          <Link href={`/books/${book.id}`} className="flex items-center gap-x-3">
            <Image src={ArrowLeft} alt={"Arrow icon"} width={25} height={20} />
            <Typography as="h4">{book.title}</Typography>
          </Link>  
            <Button label="Сохранить" onClick={onSave} loading={isLoading} />
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
