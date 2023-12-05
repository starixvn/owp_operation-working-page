import React from 'react';
import { Option } from '../../../../Shared/MultipleSelection/type';

const SingleSelection = (props: {
  defaultValue: string | number | undefined,
  onChange: React.ChangeEventHandler<HTMLSelectElement>,
  options: Option[]
}) =>
  <div className='select-wrapper-default'>
    <select
      disabled={false}
      className='browser-default'
      defaultValue={props.defaultValue}
      onChange={props.onChange}>
      {props.options.map(opt => opt.value
        ? <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
        : undefined
      )}
    </select>
  </div>;

export default SingleSelection;