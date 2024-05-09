import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { crud } from '../../../../actions/action';
import { handleUpdateRounds } from '../slice/editSettingSlice';

const propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  hasWrite: PropTypes.bool,
  inputKey: PropTypes.string
};
const Value = props => {
  const { item, index, hasWrite, inputKey } = props;
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(item.value);

  const handleOnBlur = event => {
    event.preventDefault();
    dispatch(
      handleUpdateRounds({
        property: inputKey,
        key: 'value',
        value: event.target.value,
        index
      })
    );
  };

  const handleOnChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <Input
      disabled={!hasWrite}
      type='text'
      className='input-field'
      defaultValue={inputValue}
      maxLength='100'
      onBlur={handleOnBlur}
      onChange={handleOnChange}
    />
  );
};

Value.propTypes = propTypes;

export default Value;
