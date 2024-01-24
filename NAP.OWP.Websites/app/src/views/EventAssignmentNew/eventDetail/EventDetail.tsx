import React, { useRef } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import queryDataTableThunk from '../table/queryDataTableThunk';
import Utils from '../../Shared/Utils';
import { nanoid } from '@reduxjs/toolkit';
import ToastrWrapper from '../../components/ToastrWrapper';

const EventDetail = () => {
  const dispatch = useAppDispatch();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { OwpMatchId } = useAppSelector(x => x.eventDetail);

  const onHideDetailInformation = async () => {
    if (iframeRef.current) {
      const editGeneralInfo = iframeRef.current.getAttribute(
        'edit-general-info'
      );
      const editMatchInfo = iframeRef.current.getAttribute('edit-match-info');
      const editTradingInfo = iframeRef.current.getAttribute(
        'edit-trading-info'
      );
      const editProviderInfo = iframeRef.current.getAttribute(
        'edit-provider-info'
      );

      const isEditGeneralAndMatchInfo =
        editGeneralInfo === '1' || editMatchInfo === '1';
      const isEditTradingAndProviderInfo =
        editTradingInfo === '1' || editProviderInfo === '1';
      if (isEditGeneralAndMatchInfo || isEditTradingAndProviderInfo) {
        const confirmResult = await ToastrWrapper.confirm('Your unsaved changes will be lost. Are you sure?');
        confirmResult.value && onCloseModal();
      } else {
        onCloseModal();
      }
    }
  };

  const onCloseModal = () => {
    const attributeUpdateValue = iframeRef?.current?.getAttribute('updated');
    const updateResult = attributeUpdateValue && parseInt(attributeUpdateValue, 10);
    updateResult && updateResult > 0 && dispatch(queryDataTableThunk());
  };

  return OwpMatchId
    ? <Modal
      tag='div'
      size='lg'
      isOpen
      className='modal-dark-title modal-edit-event'>
      <ModalHeader toggle={onHideDetailInformation}>
        Detail Information
      </ModalHeader>
      <ModalBody tag='div'>
        <div className='masonry'>
          <iframe
            title={nanoid()}
            ref={iframeRef}
            style={{
              overflow: 'hidden',
              height: '100%',
              width: '100%',
              minHeight: '700px',
              border: '0'
            }}
            src={
              Utils.resolveUrl('/EventManagement/LiveDetail/Index/') +
              `${OwpMatchId}`
            }
          />
        </div>
      </ModalBody>
    </Modal>
    : null;
};


export default EventDetail;