import { Typography } from "@/components";
import { Book } from "@prisma/client";
import { generTitleMapper } from "../model";
import Link from "next/link";
import { NavLink } from "@/components/ui";
import { StatusBadge } from "@/views/StatusBadge";
import { GenreBadge } from "@/views/GenreBadge";

interface Props extends Book {}


const BookCard = (props: Props) => {
  return (
    <article className="grid gap-y-3 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <NavLink to={`books/${props.id}`} title={props.title} /> 
      <div className="flex gap-x-3 items-center">
        <StatusBadge status={props.status} />
        <GenreBadge title={generTitleMapper[props.genre]} />  
      </div>
    </article>
  );
};


export { BookCard };
