import React, { Dispatch, SetStateAction } from 'react';
import useStore from '../../app/store';
import { DataSource, Target, TargetOption } from '../type/TableType.native';
import Select, { SingleValue } from 'react-select-ts';

interface Props {
  data: DataSource[],
  updatedData: DataSource[],
  setUpdatedData: Dispatch<SetStateAction<DataSource[]>>
}

const EditTargetTable = (props: Props) => {
  const { data, setUpdatedData, updatedData } = props;
  const { levelOption } = useStore(state => state);

  const renderData = () => (
    data.map((user, index) => {
      const option = { value: user.targetId, label: user.target } as TargetOption;
      const handleChange = (newValue: SingleValue<TargetOption>) => {
        const newUser: DataSource = {
          ...user,
          targetId: newValue?.value ?? null,
          target: newValue?.label ?? ''
        };
        updatedData[index] = newUser;
        setUpdatedData(updatedData);
      };
      const className = user.progress === 'Fail' ? 'fail-progress' : '';

      return (
        <tr key={user.userName}>
          <td>{index + 1}</td>
          <td>{user.userName}</td>
          <td className={className}>{user.progress}</td>
          <td>
            <Select
              defaultValue={option}
              className='basic-multi-select'
              classNamePrefix='select'
              options={levelOption}
              autoFocus={false}
              onChange={handleChange} />
          </td>
        </tr>
      );
    })
  );

  return (
    <div className='tableFixHead'>
      <table className='edit-target-table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Progress</th>
            <th>Target</th>
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
    </div>
  );
};

export default EditTargetTable;