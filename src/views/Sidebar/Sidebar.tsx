import { Button } from "@/components";
import { Typography } from "../../components/ui/Typography/Typography";

interface IAsideProps {
  title: string;
  children: React.ReactElement;
}

export const Sidebar = ({ title, children }: IAsideProps) => {
  return (
    <aside className="p-5 min-w-[275px] shadow-sm hidden lg:block">
      <div className=" py-5 flex justify-between items-center gap-x-5">
        <Typography as="h4">{title}</Typography>
        <Button onClick={console.log} label="Добавить книгу" />
      </div>
      {children}
    </aside>
  );
};
