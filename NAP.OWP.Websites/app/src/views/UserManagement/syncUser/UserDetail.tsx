import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { TUserDetail, confirmSyncUserEnum } from '../type';

const UserDetail = (props: TUserDetail) => {
  const { onToggle, dataSource, hasWrite } = props;

  const renderBody = () => {
    return dataSource.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.OldUserName}</td>
          <td>{user.NewUserName}</td>
        </tr>
      );
    });
  };
  return (
    <Modal isOpen scrollable className='user-detail-modal' size='sm' centered>
      <ModalBody className='modal-user-detail-table'>
        <table className='user-detail-table'>
          <thead>
            <tr>
              <th>OWP</th>
              <th>Admin Site</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <p>Are you sure you want to sync users from AdminSite to OWP?</p>
        <Button className='btn-cancel btn' onClick={() => onToggle(confirmSyncUserEnum.cancel)}>
          Cancel
        </Button>
        {hasWrite && (
          <Button className='btn-add btn' onClick={() => onToggle(confirmSyncUserEnum.save)}>
            OK
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default UserDetail;
