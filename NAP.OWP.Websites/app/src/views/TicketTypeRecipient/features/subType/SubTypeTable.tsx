import React from 'react';
import { SubType } from '../TypeNative';
import SubTypeRow from './SubTypeRow';

type Props = {
  subTypes: Array<SubType>,
  onUpdateSubType: (value: string, index: number) => void
};

const SubTypeTable = (props: Props) => {
  const { subTypes, onUpdateSubType } = props;

  const renderRows = (subtypes: Array<SubType>) => {
    return subtypes.map((subtype, index) => {
      const key = index;
      return <tr key={key}>
        <td>
          <SubTypeRow
            {...subtype}
            onUpdateSubType={onUpdateSubType}
            index={index} />
        </td>
      </tr>;
    });
  };

  const renderBody = () => {
    if (!subTypes.length) {
      return (
        <tr>
          <td>There is no data</td>
        </tr>
      );
    } else {
      return renderRows(subTypes);
    }
  };

  return (
    <div className='tableFixHead'>
      <table className='recipient-table'>
        <thead>
          <tr>
            <th className='col-subType'>Subtype</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};


export default SubTypeTable;