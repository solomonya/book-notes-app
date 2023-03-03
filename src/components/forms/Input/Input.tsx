import { ShowIf } from "@/components/other/ShowIf/ShowIf";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  rules?: Record<string, number | string | boolean>;
  control: Control<T>;
  defaultValue?: string;
}

const Input = <T extends FieldValues>(props: Props<T>): React.ReactElement => {
  const { field, formState } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    shouldUnregister: false,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <ShowIf condition={Boolean(props.label)}>
        <label>{props.label}</label>
      </ShowIf>
      <input {...field} className="rounded-md border border-slate-400 p-3" />
    </div>
  );
};

export { Input };
