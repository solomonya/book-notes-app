import { ShowList } from "@/components";
import { NavLink } from "@/components/ui";
import { Note } from "@prisma/client";

interface Props {
  notes: Note[];
  bookId: string;
}

const BooksNotesLinks = ({ notes, bookId }: Props): React.ReactElement => {
  return (
    <ul>
      <ShowList list={notes}>
        {
          (note) => {
            return (
              <li key={note.id} className="py-2">
                <NavLink title={note.title} to={`/books/notes/${encodeURIComponent(bookId)}/${note.id}`}/>
              </li>
            );
          }
        }
      </ShowList>
    </ul>
  );
};

export { BooksNotesLinks };