import { addBookFormSchema } from '@/views/Books/model';
import * as yup from 'yup';

export const addBookSchema = yup.object({
  book: addBookFormSchema.required("Required"),
  user: yup.object({
    id: yup.string().required("Required")
  }),
});
