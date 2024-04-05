import { TCommonCell } from "../../../type/table";

const TextboxCommonCell = ({ className, value }: TCommonCell) => {
  return (
    <span className={className}>
      {value}
    </span>
  );
};

export default TextboxCommonCell;