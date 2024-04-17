import TPopupEditor from "./type";

const PopupEditor = ({ value, className }: TPopupEditor) => {
  return (
    <div className={className ?? 'popup__editor'}>
      <textarea
        name="popup__editor"
        defaultValue={value}
        rows={8}
        cols={50}></textarea>
    </div>
  );
};

export default PopupEditor;