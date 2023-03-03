import * as yup from 'yup';

export const noteCreateModel = yup.object().shape({
  noteId: yup.string().required(),
  content: yup.string().required(),
  title: yup.string().required(),
  bookId: yup.string().required(),
  userEmail: yup.string().email().required()
});
