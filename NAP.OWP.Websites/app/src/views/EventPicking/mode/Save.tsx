const Save = ({ onSetMode }: { onSetMode: () => void }) => {
  const handleSave = () => {
    onSetMode();
  };

  return (
    <button className='button-submit' onClick={handleSave}>
      Save
    </button>
  );
};

export default Save;