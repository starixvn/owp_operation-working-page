import React from 'react';
import { setIsEdit } from '../OSTable/OSTableSlice/reducer';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
const propTypes = {
  editOfferLiveMatches: PropTypes.array,
  handleOnSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleOnOpenEditOfferLive: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};
const EditOfferLive = props => {
  const {
    editOfferLiveMatches,
    handleOnSave,
    handleCancel,
    handleOnOpenEditOfferLive,
    isEdit
  } = props;
  return (
    <div className='filter-control edit-offer-live-wrapper'>
      {isEdit ? (
        <div>
          <button className='button-cancel' onClick={() => handleCancel()}>
            Cancel
          </button>
          <button
            disabled={editOfferLiveMatches.length === 0}
            className={`button-submit ${
              editOfferLiveMatches.length === 0 ? 'button-disable' : ''
            }`}
            onClick={() => handleOnSave()}>
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
