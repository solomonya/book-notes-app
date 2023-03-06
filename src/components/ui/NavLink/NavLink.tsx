import Link from "next/link";

interface Props {
  to: string;
  title: string;
}

const NavLink = ({ to, title }: Props) => {
  return (
    <Link href={to}>
      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{title}</span>
    </Link>
  );
};

export { NavLink };
