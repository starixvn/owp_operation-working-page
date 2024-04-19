import { useState } from "react";
import TPopupEditor from "./type";

const PopupEditor = ({ defaultValue, className, onBlur }: TPopupEditor) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={className ?? 'popup__editor'}>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={8}
        cols={50}
        autoFocus></textarea>
    </div>
  );
};

export default PopupEditor;