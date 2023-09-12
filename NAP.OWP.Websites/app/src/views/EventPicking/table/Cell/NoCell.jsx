import React from 'react';
import PropTypes from 'prop-types';
import store from '../../app/store';
import { Input } from 'reactstrap';
import useStableDispatch from '../../../Shared/customHook/useStableDispatch';
import updateNoOfferMatchThunk from '../updateConfirmedThunkNative';
import {
  buildNoOfferChildMatchInfo,
  buildNoOfferMainMatchInfo
} from '../../helper/noOfferSingleMatchPipeline';

const propTypes = {
  rowIndex: PropTypes.number.isRequired,
  dataSource: PropTypes.array.isRequired
};

const NoCell = props => {
  const { permission } = store.getState().pagePolicy;
  const { rowIndex, dataSource } = props;
  const { isNoOffer, infoSiteMatchId, isChildMatch, childMatchId } =
    dataSource[rowIndex];

  const dispatch = useStableDispatch();

  const handleSelectedChanged = async event => {
    const value = event.target.checked;
    const matchNoOffer = [];

    const source = {
      infoSiteMatchId,
      isNoOffer: value,
      childMatchId
    };

    isChildMatch &&
      buildNoOfferChildMatchInfo({
        matchNoOffer,
        source
      });

    !isChildMatch &&
      buildNoOfferMainMatchInfo({
        dataSource,
        source,
        matchNoOffer
      });

    await dispatch(updateNoOfferMatchThunk(matchNoOffer));
  };

  return (
    <div className='no-cell'>
      <span>{rowIndex + 1}</span>
      <Input
        type='checkbox'
        checked={isNoOffer}
        disabled={!permission.HasWrite}
        onChange={handleSelectedChanged}
      />
    </div>
  );
};
NoCell.propTypes = propTypes;
export default NoCell;
