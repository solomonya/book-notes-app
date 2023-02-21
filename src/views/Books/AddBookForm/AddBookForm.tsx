import { Button } from "@/components";
import { Input, Select } from "@/components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EGenre, addBookFormSchema, genresTitles } from "../model";
import { useMutation } from "@/api";
import { useUser } from "@auth0/nextjs-auth0/client";

export const AddBookForm = () => {
  const { user } = useUser();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(addBookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      genre: EGenre.FICTION,
    },
  });
  const [addBook, mutationState] = useMutation();

  const onSubmit = async (data: unknown) => {
    try {
      const parsedBookData = await addBookFormSchema.validate(data);
      await addBook({ method: "POST", body: { book: parsedBookData, user: { id: user!.sid } }, endpoint: "/books/create" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 pt-3">
      <Input control={control} name="title" label="Название книги" />
      <Select label="Жанр" control={control} name="genre" options={genresTitles} />
      <Input control={control} name="description" label="Описание" />
      <div className="mx-auto">
        <Button label="Добавить книгу" loading={mutationState.isLoading} />
      </div>
    </form>
  );
};
