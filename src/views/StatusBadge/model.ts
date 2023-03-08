const BookStatus = {
  NEW: "NEW",
  IN_PLAN: "IN_PLAN",
  READING: "READING",
  FINISHED: "FINISHED"
} as const;


type BookStatusKey = keyof typeof BookStatus;

interface StatusBadgeProps {
  status: BookStatusKey
}


const StylesByStatus: Record<BookStatusKey, string> = {
  [BookStatus.NEW]: "inline-block px-2.5 py-1 rounded text-md bg-purple-100 text-purple-800",
  [BookStatus.IN_PLAN]: "inline-block px-2.5 py-1 rounded text-md bg-pink-100 text-pink-800",
  [BookStatus.READING]: "inline-block px-2.5 py-1 rounded text-md bg-blue-100 text-blue-800",
  [BookStatus.FINISHED]: "inline-block px-2.5 py-1 rounded text-md bg-green-100 text-green-800"
} as const;

const TitleByStatus: Record<BookStatusKey, string> = {
  [BookStatus.NEW]: "Новая",
  [BookStatus.FINISHED]: "Прочтена",
  [BookStatus.READING]: "Читаю",
  [BookStatus.IN_PLAN]: "В планах"
} as const;

export { BookStatus, StylesByStatus, TitleByStatus };
export type { BookStatusKey, StatusBadgeProps }