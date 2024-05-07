import { Input } from 'reactstrap';

const NoOfHdpEditableCell = ({ value }: { value: string | undefined }) => {
  return (
    <div className="input-value">
      <Input
        type='text'
        name='noOfHdp'
        className='no__hdp input-field'
        value={value}
        maxLength={2000}
      />
      {!value && <a className='mb__check' href='http://google.com'>
        Check
      </a>}
    </div>
  );
};


export default NoOfHdpEditableCell;