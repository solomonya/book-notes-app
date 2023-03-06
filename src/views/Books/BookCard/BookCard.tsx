import { Typography } from "@/components";
import { Book } from "@prisma/client";
import { generTitleMapper } from "../model";
import Link from "next/link";
import { NavLink } from "@/components/ui";

interface Props extends Book {}


const BookCard = (props: Props) => {
  return (
    <article className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <NavLink to={`books/${props.id}`} title={props.title} /> 
      <Typography as="body">{generTitleMapper[props.genre]}</Typography>
      <Typography as="body">{props.status}</Typography>
    </article>
  );
};


export { BookCard };
