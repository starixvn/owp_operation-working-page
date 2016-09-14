import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckboxMarkedCircleOutlineIcon from 'mdi-react/CheckboxMarkedCircleOutlineIcon';
import { useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import ToastrWrapper from '../../components/ToastrWrapper';
import useStableDispatch from '../../Shared/customHook/useStableDispatch';
import { resetResponse } from './submitSlice';
import { setWarningMessage } from './fileLoaderSlice';
const propTypes = {
  totalRow: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
};

const ValidationSuccess = ({ totalRow, onClose }) => {
  const dispatch = useStableDispatch();
  const { warning } = useSelector(state => state.fileLoader);
  const { submitResult, loading } = useSelector(state => state.submit);
  const { message } = submitResult;

  useEffect(() => {
    (async () => {
      if (message) {
        await ToastrWrapper.showInfo(message);
        dispatch(resetResponse());
        onClose();
      }
      const { hasWarning, messageWarning } = warning;
      if (hasWarning) {
        await ToastrWrapper.showWarning(messageWarning);
        await dispatch(
          setWarningMessage({
            hasWarning: false,
            message: ''
          })
        );
      }
    })();
  });

  return (
    <>
      {loading && <Loading />}
      <div className='success-info'>
        <CheckboxMarkedCircleOutlineIcon size={20} />
        <span>
          There is no failed record in the total of {totalRow} record(s)
        </span>
      </div>
    </>
  );
};

ValidationSuccess.propTypes = propTypes;
export default ValidationSuccess;
