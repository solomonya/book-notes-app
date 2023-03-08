import { StylesByStatus, StatusBadgeProps, TitleByStatus } from "./model";

const StatusBadge = ({ status }: StatusBadgeProps): React.ReactElement => {
  return (
    <div className={StylesByStatus[status]}>{TitleByStatus[status]}</div>
  );
};

export { StatusBadge };