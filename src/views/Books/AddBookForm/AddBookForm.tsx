import { Button } from "@/components";
import { Input, Select } from "@/components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EGenre, addBookFormSchema, genresTitles } from "./model";

export const AddBookForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(addBookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: EGenre.FICTION,
    },
  });

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 pt-3">
      <Input control={control} name="title" label="Название книги" />
      <Select label="Жанр" control={control} name="genre" options={genresTitles} />
      <Input control={control} name="description" label="Описание" />
      <div className="mx-auto">
        <Button label="Добавить книгу" />
      </div>
    </form>
  );
};
