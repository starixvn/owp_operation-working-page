import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { REQUEST_STATUS } from '../../Shared/Constants';
import Loading from '../../components/Loading';
import isEqual from 'lodash.isequal';
import { get } from '../../Shared/Service/Service';
import { netCoreURL, netFwURL, getLogsHistory } from '../const/const.json';
import dayjs from 'dayjs';

const resolveUrl = () =>
  process.env.NODE_ENV === 'development'
    ? `${netCoreURL}/${getLogsHistory}`
    : `${window.netCoreRootUrl}/${netFwURL}/${getLogsHistory}`;

const HistoryModal = props => {
  const { infoSiteMatchId, onToggle } = props;
  const [loading, setLoading] = useState(REQUEST_STATUS.loading);
  const [logHistory, setLogHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const url = resolveUrl();
      const response = await get({
        url,
        infoSiteMatchId
      });
      setLogHistory(response.data);
      setLoading(REQUEST_STATUS.idle);
    })();
  }, [infoSiteMatchId]);

  if (isEqual(loading, REQUEST_STATUS.loading)) {
    return <Loading />;
  }
  const renderBody = () => {
    return logHistory.map((log, index) => {
      const { date, modifiedBy, action, oldValue, newValue } = log;
      return (
        <tr key={index}>
          <td className='date'>
            {dayjs(date, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY hh:mm A')}
          </td>
          <td className='modified-by'>{modifiedBy}</td>
          <td className='action'>
            <span dangerouslySetInnerHTML={{ __html: action }} />
          </td>
          <td className='old-value'>{oldValue}</td>
          <td className='new-value'>{newValue}</td>
        </tr>
      );
    });
  };
  return (
    <Modal isOpen scrollable className='log-history-modal' size='xl' centered>
      <ModalHeader toggle={onToggle}>
        <strong>Log History - Event Picking</strong>
      </ModalHeader>
      <ModalBody>
        <Table>
          <thead>
            <tr>
              <th className='date'>Date (GMT+8)</th>
              <th className='modified-by'>Modified by</th>
              <th className='action'>Action</th>
              <th className='old-value'>Old Value</th>
              <th className='new-value'>New Value</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

HistoryModal.propTypes = {
  infoSiteMatchId: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default HistoryModal;
