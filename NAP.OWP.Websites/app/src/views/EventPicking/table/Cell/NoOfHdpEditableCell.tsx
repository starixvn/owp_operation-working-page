import { Input } from 'reactstrap';

const NoOfHdpEditableCell = ({ value }: { value: string | undefined }) => {
  return (
    <Input
      type='text'
      name='noOfHdp'
      className='no__hdp'
      value={value}
      maxLength={2000}
    />
  );
};


export default NoOfHdpEditableCell;