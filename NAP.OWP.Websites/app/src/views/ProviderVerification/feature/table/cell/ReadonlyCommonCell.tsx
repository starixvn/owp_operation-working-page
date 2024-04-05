import { TCommonCell } from "../../../type/table";

const ReadonlyCommonCell = ({ className, value }: TCommonCell) => {
  return (
    <span className={className}>
      {value}
    </span>
  );
};

export default ReadonlyCommonCell;