import * as yup from 'yup';

export const EGenre = {
  FICTION: 'FICTION',
  NON_FICTION: 'NON_FICTION',
  PROGRAMMING: 'PROGRAMMING',
  LEARNING: 'LEARNING'
} as const;

type TGenre = keyof typeof EGenre;

const generTitleMapper: Record<TGenre, string> = {
  FICTION: 'Художественная литература',
  NON_FICTION: 'Деловая литература',
  PROGRAMMING: 'Программирование',
  LEARNING: 'Самообразование'
} as const;

const genres = ['FICTION', 'NON_FICTION', 'PROGRAMMING', 'LEARNING'] as const;

export const genresTitles = genres
.map(value => ({title: generTitleMapper[value as TGenre], value}));


export const addBookFormSchema = yup.object({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  genre: yup.mixed().oneOf(genres).required("Required")
});

export type TAddBookFormType = yup.InferType<typeof addBookFormSchema>;