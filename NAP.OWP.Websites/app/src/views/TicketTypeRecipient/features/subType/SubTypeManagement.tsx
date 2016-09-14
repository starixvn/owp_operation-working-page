import React, { useState } from 'react';
import { SubType } from '../TypeNative';
import SubTypeInput from './SubTypeInput';
import SubTypeTable from './SubTypeTable';
import update from 'immutability-helper';
import { uniqueId } from 'lodash';
import useStore from '../../app/zustand/ticketTypeStore';

type Prop = {
  subTypesDefault: Array<SubType>,
  ticketTypeId: number
};

const SubTypeManagement = (props: Prop) => {
  const [subTypes, setSubtypes] = useState(props.subTypesDefault || []);
  const storeSubtypeExternal = useStore(state => state.setSubtypes);

  const handleAddNew = (subType: SubType) => {
    const newSubTypes = update(subTypes, {
      $push: [{
        ...subType,
        typeId: props.ticketTypeId
      }]
    });
    setSubtypes(newSubTypes);
    storeSubtypeExternal(newSubTypes);
  };

  const handleUpdateSubType = (value: string, index: number) => {
    const newSubTypes = update(subTypes, {
      [index]: {
        subtypeName: {
          $set: value
        }
      }
    });
    setSubtypes(newSubTypes);
    storeSubtypeExternal(newSubTypes);
  };

  return (
    <>
      <SubTypeInput
        onAddNew={handleAddNew} />
      <SubTypeTable
        key={uniqueId()}
        subTypes={subTypes}
        onUpdateSubType={handleUpdateSubType} />
    </>
  );
};


export default SubTypeManagement;