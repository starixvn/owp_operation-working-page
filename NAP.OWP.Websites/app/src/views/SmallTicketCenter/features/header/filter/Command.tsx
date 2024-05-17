
const Command = () => {
  const handleSubmit=(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    event.preventDefault();
  };

  return (
    <button className='button-submit' onClick={handleSubmit}>
    Search
  </button>
  );
};

export default Command;