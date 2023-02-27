import * as yup from "yup";

/*
model Note {
  id        String   @id @default(cuid())
  title     String   @db.VarChar(255)
  createdAt DateTime @default(now())
  content   String
  userId    String
  bookId    String?
  book      Book?    @relation(fields: [bookId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
}
*/

const noteSchema = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required(),
  content: yup.string().required(),
  userId: yup.string().required(),
  bookId: yup.string(),
});

export { noteSchema };
