const NoOfHdpEditableCell = ({ value }: { value: string | undefined }) => {
  return (
    <div className="noOf__hdp-cell">
      {value ? (
        <p className='noOf__hdp__value'>
          {value}
        </p>
      ) : (
        <a className='noOf__hdp__check' href='http://google.com'>
          Check
        </a>
      )}
    </div>
  );
};


export default NoOfHdpEditableCell;