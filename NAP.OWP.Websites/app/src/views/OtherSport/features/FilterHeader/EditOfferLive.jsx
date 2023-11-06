import React from 'react';
import { setIsEdit } from '../OSTable/OSTableSlice/reducer';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const propTypes = {
  handleOnSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOnOpenEditOfferLive: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};
const EditOfferLive = props => {
  const { handleOnSave, handleCancel, handleOnOpenEditOfferLive, isEdit } =
    props;

  return (
    <div className='filter-control edit-offer-live-wrapper'>
      {isEdit ? (
        <div>
          <button className='button-cancel' onClick={() => handleCancel()}>
            Cancel
          </button>
          <button className='button-submit' onClick={() => handleOnSave()}>
            Save
          </button>
        </div>
      ) : (
        <button
          className='button-submit'
          onClick={() => handleOnOpenEditOfferLive()}>
          Edit
        </button>
      )}
    </div>
  );
};
EditOfferLive.propTypes = propTypes;
export default EditOfferLive;
