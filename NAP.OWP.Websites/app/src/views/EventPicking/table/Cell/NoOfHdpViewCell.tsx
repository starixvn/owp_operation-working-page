const NoOfHdpEditableCell = ({ value }: { value: string | undefined }) => {
  return (
    <>
      {value ? (
        <div className='noOf__hdp'>
          {value}
        </div>
      ) : (
        <a className='spread__check' href='http://google.com'>
          Check
        </a>
      )}
    </>
  );
};


export default NoOfHdpEditableCell;