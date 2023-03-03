import React from "react";
import { IButtonProps } from "./buttonTypes";
import { ShowIf } from "@/components/other/ShowIf/ShowIf";
import { buttonStyles } from "./styles";
import { Loader } from "../Loader/Loader";

export const Button = ({
  loading = false,
  label,
  disabled,
  onClick,
  variant = "primary",
}: IButtonProps): React.ReactElement => {
  return (
    <button className={buttonStyles[variant]} onClick={onClick} disabled={disabled}>
      {label}
      <ShowIf condition={loading}>
        <Loader />
      </ShowIf>
    </button>
  );
};
