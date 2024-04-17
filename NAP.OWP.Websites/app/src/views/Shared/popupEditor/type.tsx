type TPopupEditor = {
  value: string | undefined,
  className?: string | undefined,
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

export default TPopupEditor;