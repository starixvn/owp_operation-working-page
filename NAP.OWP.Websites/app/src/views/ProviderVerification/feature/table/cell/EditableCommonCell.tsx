import { useEffect, useRef, useState } from "react";
import { TEditableCell } from "../../../type/table";

const EditableCommonCell = ({ className, value, onBlur }: TEditableCell) => {
  const [canEdit, setCanEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleBlur = () => {
    setTimeout(() => {
      setCanEdit(false);
    }, 90);

    onBlur(inputRef.current?.value);
  };

  return (
    <>
      {!canEdit && <span className={className}
        onClick={() => {
          console.log('Click');
          setCanEdit(true);
        }}>
        {value}
      </span>}
      {canEdit && <input
        type="text"
        className="input-field"
        defaultValue={value}
        ref={inputRef}
        autoFocus
        onBlur={handleBlur}>
      </input>}
    </>
  );
};

export default EditableCommonCell;