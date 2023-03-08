import { FC, ReactElement } from "react";

interface Props {
  conditions: boolean[]
  children: ReactElement[]
}

const ShowSwitch: FC<Props> = ({conditions = [], children = []}): ReactElement => {
  const idx = conditions.findIndex((cond) => cond)
  const fromChild = idx > -1 && children[idx]
  const lastChild = conditions.length === children?.length ? children[conditions.length - 1] : children[children.length - 1]

  return (fromChild || lastChild) ?? null
}

export { ShowSwitch };
