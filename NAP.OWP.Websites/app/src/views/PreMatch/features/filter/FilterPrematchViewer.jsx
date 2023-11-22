import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../../components/Loading';
import { isEqual } from 'lodash';
import {
  ExpandBtn,
  DateTimeFilterCommon,
  CollapseBtn,
  ShowUnreadMessageCheckBox
} from '../../ImportPrematchHelperNative';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import { AccountCheckIcon } from 'mdi-react';
import MatchOfferSelect from './MatchOfferSelect';
import EarlyOfferedLeague from './EarlyOfferedLeague';

const propTypes = {
  model: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickMyAssignee: PropTypes.func.isRequired,
  isDisableEmp: PropTypes.bool.isRequired
};

const FilterPrematchViewer = React.forwardRef((props, ref) => {
  const { model, onSubmit, isDisableEmp, onClickMyAssignee } = props;
  const { filterDate, loading } = model;
  useEffect(() => {
    const handleSubmitWithCondition = () => {
      if (filterDate) {
        onSubmit(new Date(filterDate));
      }
    };
    const interval = setInterval(handleSubmitWithCondition, 300000);
    return () => clearInterval(interval);
  }, [filterDate, onSubmit]);

  if (!filterDate || isEqual(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  return (
    <div className='left-filter-dayshift'>
      <div className='inner'>
        <DateTimeFilterCommon
          defaultDate={new Date(filterDate)}
          onSubmit={onSubmit}
          isShowSubmitBtn>
          <div className='filter-control assignment'>
            <div className='text-box'>
              <div className='label'>Employee</div>
              <input
                ref={ref.employeeRef}
                type='text'
                name='username'
                className='input-field'
                maxLength='100'
                disabled={isDisableEmp}
              />
            </div>

            <AccountCheckIcon
              className={`emp-icon${isDisableEmp ? '-activated' : ''}`}
              onClick={onClickMyAssignee}
            />
          </div>

          <div className='filter-control'>
            <div className='label'>League</div>
            <input
              ref={ref.leagueRef}
              type='text'
              name='league'
              className='input-field'
              maxLength='150'
            />
          </div>
          <MatchOfferSelect />
          <EarlyOfferedLeague />
        </DateTimeFilterCommon>
        <CollapseBtn />
        <ExpandBtn />
      </div>

      <ShowUnreadMessageCheckBox />
    </div>
  );
});

FilterPrematchViewer.propTypes = propTypes;
FilterPrematchViewer.displayName = 'FilterPrematch';
export default FilterPrematchViewer;
