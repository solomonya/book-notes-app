import { Typography } from "@/components";

interface Props {
  title: string;
};

const GenreBadge = ({ title }: Props): React.ReactElement => {
  return (
      <span className="bg-gray-100 text-gray-800 px-2 py-1 font-md rounded">{title}</span>
  );
};

export { GenreBadge };