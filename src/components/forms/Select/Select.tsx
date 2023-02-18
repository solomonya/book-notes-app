import { ShowList } from "@/components/other/ShowList/ShowList";
import { title } from "process";
import React from "react";
import { FieldValues, Path, Control, useController } from "react-hook-form";

interface Props<T extends FieldValues, OptionType> {
  label: string;
  name: Path<T>;
  rules?: Record<string, number | string | boolean>;
  control: Control<T>;
  options: { title: string; value: OptionType }[];
}

const Select = <T extends FieldValues, OptionType>(props: Props<T, OptionType>) => {
  const { field, formState } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    shouldUnregister: false,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <label>{props.label}</label>
      <select {...field} className="rounded-md bg-none p-3">
        <ShowList list={props.options}>
          {(option) => {
            return (
              <option key={option.title} value={option.value as string}>
                {option.title}
              </option>
            );
          }}
        </ShowList>
      </select>
    </div>
  );
};

export { Select };
