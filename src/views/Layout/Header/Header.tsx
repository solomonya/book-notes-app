import { Typography } from "@/components";

export const Header = (): React.ReactElement => {
  return (
    <header className="p-5 shadow-sm">
      <Typography as="h4">Приложение для заметок</Typography>
    </header>
  );
};
