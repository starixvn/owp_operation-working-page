import React from 'react';
import LeagueContent from '../settingDetail/LeagueContent';
import SettingContent from '../settingDetail/SettingContent';
import SettingPopup from '../settingDetail/SettingPopup';
import useStore from '../../app/store';
import Status from '../settingDetail/Status';
import shallow from 'zustand/shallow';
import { isEqual } from 'lodash';
import { REQUEST_STATUS } from '../../../Shared/Constants';
import Loading from '../../../components/Loading';
import { ILeagueContent, IStatus } from '../../typing/type';
import { editSetting } from '../../osLeague.json';
import ToastrWrapper from '../../../components/ToastrWrapper';

const EditSetting = () => {
  const {
    loading,
    settingInfoOrigin,
    setSettingInfo,
    saveSetting,
    queryDataSource,
    setPopupType,
    validateBeforeSubmit,
    resetSetting,
    getPolicy,
    resetErrorMessage
  } = useStore(
    state => ({
      loading: state.loading,
      settingInfoOrigin: state.settingInfoOrigin,
      setSettingInfo: state.setSettingInfo,
      saveSetting: state.saveSetting,
      queryDataSource: state.queryDataSource,
      setPopupType: state.setPopupType,
      validateBeforeSubmit: state.validateBeforeSubmit,
      resetSetting: state.resetSetting,
      getPolicy: state.getPolicy,
      resetErrorMessage: state.resetErrorMessage
    }),
    shallow
  );

  if (isEqual(loading, REQUEST_STATUS.pending)) {
    return <Loading />;
  }

  const policy = getPolicy();

  const { category, region, leagueName, isActive, ...rest } = settingInfoOrigin;

  const leagueProps: ILeagueContent = {
    category: {
      disabled: !policy.HasWrite,
      value: category,
      onChange: value => setSettingInfo('category', value)
    },
    region: {
      disabled: !policy.HasWrite,
      value: region,
      onChange: value => setSettingInfo('region', value)
    }
  };

  const active: IStatus = {
    isActive,
    onChange: value => setSettingInfo('isActive', value)
  };

  const showSuccessMessage = async () => {
    const toast = await ToastrWrapper.showInfo(
      'The setting has been edited successfully!'
    );
    if (toast.value) {
      resetSetting();
      setPopupType(null);
      queryDataSource();
      resetErrorMessage();
    }
  };

  const handleSave = async () => {
    if (validateBeforeSubmit()) {
      const status = await saveSetting(editSetting);
      status && showSuccessMessage();
    }
  };

  return (
    <SettingPopup title={leagueName} isAdd={false} onSave={handleSave}>
      <>
        <LeagueContent {...leagueProps}>
          <Status {...active} />
        </LeagueContent>
        <SettingContent {...rest} />
      </>
    </SettingPopup>
  );
};

export default EditSetting;
