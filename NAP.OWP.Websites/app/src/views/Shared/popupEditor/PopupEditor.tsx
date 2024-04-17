import TPopupEditor from "./type";

const PopupEditor = ({ value, className }: TPopupEditor) => {
  return (
    <div className='popup__editor--wrapper'>
      <div className={className ?? 'popup__editor'}>
        <textarea
          name="popup__editor"
          defaultValue={value}
          rows={4}
          cols={50}></textarea>
      </div>
    </div>
  );
};


export default PopupEditor;