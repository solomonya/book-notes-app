import { Typography } from "@/components";
import { Book } from "@prisma/client";
import { generTitleMapper } from "../model";
import Link from "next/link";

interface Props extends Book {}


const BookCard = (props: Props) => {
  return (
    <article>
      <Link href={`books/${props.id}`}>
        <Typography as="h4">{props.title}</Typography>
      </Link>
      <Typography as="body">{generTitleMapper[props.genre]}</Typography>
      <Typography as="body">{props.status}</Typography>
    </article>
  );
};


export { BookCard };