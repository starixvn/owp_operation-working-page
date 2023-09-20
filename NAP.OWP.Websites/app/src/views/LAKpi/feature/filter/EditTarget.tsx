import React, { useState } from 'react';
import useStore from '../../app/store';
import EditTargetPopup from '../editPopup/EditTargetPopup';

const EditTarget = () => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { isGap } = useStore(state => state.dataTable);

  return (
    <>
      {isGap && <span className='edit-target' onClick={() => setIsOpenPopup(true)}>
        Edit Target
      </span>}
      {isGap && isOpenPopup && (
        <EditTargetPopup
          setIsOpenPopup={setIsOpenPopup}
        />
      )}
    </>
  );
};

export default EditTarget;