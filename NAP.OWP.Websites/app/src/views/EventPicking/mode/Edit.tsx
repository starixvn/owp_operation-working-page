const Edit = ({ onSetMode }: { onSetMode: () => void }) => {
  const handleEdit = () => {
    onSetMode();
  };

  return (
    <button className='button-submit' onClick={handleEdit}>
      Edit
    </button>
  );
};

export default Edit;